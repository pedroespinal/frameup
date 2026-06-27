import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, FlatList, SectionList, Share, Alert,
} from 'react-native';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import ViewShot, { ViewShotRef } from 'react-native-view-shot';
import { saveFavorite, removeFavorite, isFavorite } from '@/utils/storage';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { getSceneById, getDifficultyColor } from '@/data/scenes';
import { cameras, Camera, getCamerasByBrand, getSensorLabel, getSensorColor, SensorType } from '@/data/cameras';
import { getSettingsForScene, SceneSensorSettings, SettingValue } from '@/data/cameraSettings';

type SettingKey = keyof Omit<SceneSensorSettings, 'tips' | 'advertencias'>;

const SETTING_META: Array<{ key: SettingKey; label: string; icon: string }> = [
  { key: 'apertura',       label: 'Apertura',           icon: 'aperture' },
  { key: 'velocidad',      label: 'Velocidad',          icon: 'timer-outline' },
  { key: 'iso',            label: 'ISO',                icon: 'layers-outline' },
  { key: 'balanceBlancos', label: 'Balance de Blancos', icon: 'color-palette-outline' },
  { key: 'modoEnfoque',    label: 'Modo de Enfoque',    icon: 'scan-outline' },
  { key: 'medicion',       label: 'Medición',           icon: 'stats-chart-outline' },
  { key: 'disparo',        label: 'Modo de Disparo',    icon: 'camera-outline' },
  { key: 'estabilizacion', label: 'Estabilización',     icon: 'hand-left-outline' },
  { key: 'formato',        label: 'Formato de Archivo', icon: 'document-outline' },
];

function genericSettings(sensor: SensorType, _sceneId: string): SceneSensorSettings {
  const isFF  = sensor === 'full-frame' || sensor === 'medium-format';
  const isAPS = sensor === 'aps-c';
  const isoMax  = isFF ? '3200 – 6400' : isAPS ? '1600 – 3200' : '800 – 1600';
  const isoNote = isFF ? 'Full frame tolera ISO alto con poco ruido.' : isAPS ? 'APS-C moderno aguanta bien hasta ISO 3200.' : 'M43 prefiere ISO bajos; usa reducción de ruido en post.';
  return {
    apertura:       { value: 'f/2.8 – f/5.6',  explanation: 'Apertura estándar para equilibrar profundidad de campo y luminosidad.' },
    velocidad:      { value: '1/125s – 1/500s', explanation: 'Velocidad adecuada para condiciones de luz normales con sujeto estático o semi-dinámico.' },
    iso:            { value: isoMax,             explanation: isoNote },
    balanceBlancos: { value: 'Auto (AWB)',        explanation: 'AWB moderno es muy preciso. Fija el WB manualmente si quieres consistencia entre tomas.' },
    modoEnfoque:    { value: 'AF-S / AF-C',      explanation: 'AF-S para sujetos estáticos. AF-C para sujetos en movimiento.' },
    medicion:       { value: 'Evaluativa',        explanation: 'La medición evaluativa analiza toda la escena y da una exposición equilibrada en la mayoría de situaciones.' },
    disparo:        { value: 'Individual',        explanation: 'Disparo individual para la mayoría de géneros fotográficos.' },
    estabilizacion: { value: 'Activado',          explanation: 'Activa IBIS/OSS siempre que fotografíes a mano alzada.' },
    formato:        { value: 'RAW + JPEG',        explanation: 'RAW para máxima calidad en procesado. JPEG para entrega inmediata.' },
    tips: [
      'Estudia la escena antes de disparar. Un buen encuadre vale más que la mejor configuración.',
      'Usa el histograma para verificar la exposición, no solo el previsualizador LCD.',
      'Dispara en ráfagas cortas de 3 tomas para aumentar las probabilidades de la toma perfecta.',
      'El formato RAW siempre te da más margen de corrección en post-producción.',
    ],
    advertencias: [
      'Verifica el ISO antes de cada sesión: es fácil olvidarlo en el valor de la sesión anterior.',
      'Comprueba que la tarjeta de memoria tiene suficiente espacio antes de empezar.',
    ],
  };
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    // Main screen
    container:              { flex: 1, backgroundColor: t.colors.background },
    content:                { paddingBottom: 40 },
    notFound:               { flex: 1, alignItems: 'center', justifyContent: 'center' },
    notFoundText:           { fontSize: 16, color: t.colors.textSecondary },
    sceneHeader:            { flexDirection: 'row', gap: t.spacing.md, padding: t.spacing.lg, alignItems: 'flex-start' },
    sceneEmoji:             { fontSize: 42 },
    sceneInfo:              { flex: 1 },
    sceneTitle:             { fontSize: 22, fontWeight: '800', color: '#FFF', marginBottom: 2 },
    sceneSub:               { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 10 },
    sceneRow:               { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
    diffBadge:              { borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 3 },
    diffText:               { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    tripodBadge:            { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 3, backgroundColor: 'rgba(255,255,255,0.15)' },
    tripodText:             { fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
    sceneDesc:              { fontSize: 14, color: t.colors.textSecondary, lineHeight: 22, padding: t.spacing.md, paddingTop: t.spacing.lg },
    cameraSelectorBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: t.colors.card, marginHorizontal: t.spacing.md, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, marginBottom: t.spacing.lg, gap: 12 },
    cameraSelectorBtnActive:{ borderColor: t.colors.primary + '60' },
    cameraSelectorLeft:     { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
    cameraSelectedBrand:    { fontSize: 11, color: t.colors.textMuted, fontWeight: '600' },
    cameraSelectedModel:    { fontSize: 16, fontWeight: '700', color: t.colors.text },
    cameraSelectorPlaceholder: { fontSize: 14, color: t.colors.textSecondary },
    cameraSelectorRight:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sensorBadgeInline:      { borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 3 },
    sensorTextInline:       { fontSize: 11, fontWeight: '700' },
    sectionTitle:           { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.sm, paddingHorizontal: t.spacing.md, marginTop: t.spacing.md },
    tipRow:                 { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: t.spacing.md, marginBottom: t.spacing.sm },
    tipDot:                 { width: 24, height: 24, borderRadius: 12, backgroundColor: t.colors.primary + '22', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
    tipNumber:              { fontSize: 11, fontWeight: '800', color: t.colors.primary },
    tipText:                { flex: 1, fontSize: 14, color: t.colors.textSecondary, lineHeight: 22 },
    warnRow:                { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingHorizontal: t.spacing.md, marginBottom: t.spacing.sm, backgroundColor: t.colors.warning + '10', marginHorizontal: t.spacing.md, borderRadius: t.radius.md, padding: t.spacing.sm + 4, borderWidth: 1, borderColor: t.colors.warning + '30' },
    warnText:               { flex: 1, fontSize: 13, color: t.colors.textSecondary, lineHeight: 20 },
    sensorNote:             { flexDirection: 'row', marginHorizontal: t.spacing.md, marginTop: t.spacing.lg, backgroundColor: t.colors.card, borderRadius: t.radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: t.colors.border },
    sensorNoteBar:          { width: 4 },
    sensorNoteContent:      { flex: 1, padding: t.spacing.md },
    sensorNoteTitle:        { fontSize: 13, fontWeight: '700', color: t.colors.text, marginBottom: 4 },
    sensorNoteText:         { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
    noCamera:               { alignItems: 'center', paddingVertical: t.spacing.xxl, paddingHorizontal: t.spacing.xl },
    noCameraEmoji:          { fontSize: 52, marginBottom: t.spacing.md },
    noCameraTitle:          { fontSize: 20, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    noCameraText:           { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: t.spacing.lg },
    noCameraBtn:            { backgroundColor: t.colors.primary, paddingHorizontal: 28, paddingVertical: 13, borderRadius: t.radius.round },
    noCameraBtnText:        { fontSize: 15, fontWeight: '700', color: '#000' },
    actionRow:              { flexDirection: 'row', gap: t.spacing.sm, paddingHorizontal: t.spacing.md, marginBottom: t.spacing.md },
    actionBtn:              { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: t.colors.card, borderRadius: t.radius.round, paddingVertical: 10, borderWidth: 1, borderColor: t.colors.border },
    actionBtnActive:        { borderColor: t.colors.primary + '60' },
    actionBtnTxt:           { fontSize: 13, fontWeight: '600', color: t.colors.textSecondary },
    cmpRow:                 { paddingHorizontal: t.spacing.md, marginBottom: 6, backgroundColor: t.colors.card, marginHorizontal: t.spacing.md, borderRadius: t.radius.md, padding: t.spacing.sm + 2, borderWidth: 1, borderColor: t.colors.border },
    cmpLabel:               { fontSize: 10, color: t.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    cmpValues:              { flexDirection: 'row', alignItems: 'center', gap: 8 },
    cmpVal:                 { flex: 1, fontSize: 13, fontWeight: '700' },
    cmpDiff:                { textDecorationLine: 'underline' },
    // Camera selector modal
    modalContainer:         { flex: 1, backgroundColor: t.colors.background },
    modalHeader:            { flexDirection: 'row', alignItems: 'center', padding: t.spacing.md, borderBottomWidth: 1, borderBottomColor: t.colors.border, backgroundColor: t.colors.surface },
    modalTitle:             { flex: 1, fontSize: 17, fontWeight: '700', color: t.colors.text },
    modalCloseBtn:          { padding: 4 },
    modalSectionHeader:     { backgroundColor: t.colors.background, paddingHorizontal: t.spacing.md, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: t.colors.divider },
    modalSectionTitle:      { fontSize: 12, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
    modalCameraRow:         { flexDirection: 'row', alignItems: 'center', paddingHorizontal: t.spacing.md, paddingVertical: t.spacing.sm + 4, borderBottomWidth: 1, borderBottomColor: t.colors.divider },
    modalCameraRowSelected: { backgroundColor: t.colors.primary + '10' },
    modalCameraModel:       { fontSize: 15, fontWeight: '600', color: t.colors.text, marginBottom: 4 },
    cameraRowLeft:          { flex: 1 },
    cameraBadges:           { flexDirection: 'row', gap: 4, flexWrap: 'wrap' },
    sensorBadge:            { borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2 },
    sensorText:             { fontSize: 10, fontWeight: '700' },
    typeBadge:              { borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2, backgroundColor: t.colors.surface },
    typeText:               { fontSize: 10, color: t.colors.textMuted, fontWeight: '600' },
    ibisBadge:              { borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2, backgroundColor: t.colors.success + '22' },
    ibisText:               { fontSize: 10, color: t.colors.success, fontWeight: '700' },
    // Setting block
    sbContainer:            { backgroundColor: t.colors.card, borderRadius: t.radius.md, padding: t.spacing.md, marginBottom: 6, borderWidth: 1, borderColor: t.colors.border },
    sbRow:                  { flexDirection: 'row', alignItems: 'center', gap: 12 },
    sbIconBox:              { width: 36, height: 36, borderRadius: 18, backgroundColor: t.colors.primary + '1A', alignItems: 'center', justifyContent: 'center' },
    sbInfo:                 { flex: 1 },
    sbLabel:                { fontSize: 11, color: t.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2 },
    sbValue:                { fontSize: 16, fontWeight: '800', color: t.colors.text },
    sbExplanation:          { marginTop: t.spacing.sm, paddingTop: t.spacing.sm, borderTopWidth: 1, borderTopColor: t.colors.divider, fontSize: 13, color: t.colors.textSecondary, lineHeight: 20 },
  });
}

function SettingBlock({ icon, label, value, explanation }: { icon: string; label: string; value: string; explanation: string }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [expanded, setExpanded] = useState(false);
  return (
    <TouchableOpacity style={styles.sbContainer} onPress={() => setExpanded((v) => !v)} activeOpacity={0.8}>
      <View style={styles.sbRow}>
        <View style={styles.sbIconBox}>
          <Ionicons name={icon as any} size={18} color={theme.colors.primary} />
        </View>
        <View style={styles.sbInfo}>
          <Text style={styles.sbLabel}>{label}</Text>
          <Text style={styles.sbValue}>{value}</Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={theme.colors.textMuted} />
      </View>
      {expanded && <Text style={styles.sbExplanation}>{explanation}</Text>}
    </TouchableOpacity>
  );
}

function CameraSelector({ visible, selected, onSelect, onClose }: { visible: boolean; selected: Camera | null; onSelect: (c: Camera) => void; onClose: () => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const byBrand  = getCamerasByBrand();
  const sections = Object.keys(byBrand).sort().map((brand) => ({ title: brand, data: byBrand[brand] }));
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Selecciona tu cámara</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn}>
            <Ionicons name="close" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={styles.modalSectionHeader}>
              <Text style={styles.modalSectionTitle}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const isSelected = selected?.id === item.id;
            return (
              <TouchableOpacity
                style={[styles.modalCameraRow, isSelected && styles.modalCameraRowSelected]}
                onPress={() => { onSelect(item); onClose(); }}
              >
                <View style={styles.cameraRowLeft}>
                  <Text style={styles.modalCameraModel}>{item.model}</Text>
                  <View style={styles.cameraBadges}>
                    <View style={[styles.sensorBadge, { backgroundColor: getSensorColor(item.sensor) + '22' }]}>
                      <Text style={[styles.sensorText, { color: getSensorColor(item.sensor) }]}>{getSensorLabel(item.sensor)}</Text>
                    </View>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                    {item.hasIBIS && (
                      <View style={styles.ibisBadge}>
                        <Text style={styles.ibisText}>IBIS</Text>
                      </View>
                    )}
                  </View>
                </View>
                {isSelected && <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 40 }}
          stickySectionHeadersEnabled
        />
      </View>
    </Modal>
  );
}

export default function SettingsScreen() {
  const { sceneId } = useLocalSearchParams<{ sceneId: string }>();
  const { theme }   = useAppTheme();
  const styles      = useMemo(() => createStyles(theme), [theme]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [compareCamera, setCompareCamera] = useState<Camera | null>(null);
  const [compareSelectorVisible, setCompareSelectorVisible] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const shotRef = useRef<ViewShotRef>(null);

  const scene = useMemo(() => getSceneById(sceneId ?? ''), [sceneId]);

  const settings = useMemo<SceneSensorSettings | null>(() => {
    if (!selectedCamera) return null;
    return getSettingsForScene(sceneId ?? '', selectedCamera.sensor) ?? genericSettings(selectedCamera.sensor, sceneId ?? '');
  }, [selectedCamera, sceneId]);

  const compareSettings = useMemo<SceneSensorSettings | null>(() => {
    if (!compareCamera) return null;
    return getSettingsForScene(sceneId ?? '', compareCamera.sensor) ?? genericSettings(compareCamera.sensor, sceneId ?? '');
  }, [compareCamera, sceneId]);

  const favId = sceneId && selectedCamera ? `${sceneId}_${selectedCamera.id}` : null;
  useEffect(() => { if (favId) isFavorite(sceneId ?? '', selectedCamera!.id).then(setFavorited); }, [favId]);

  const toggleFavorite = useCallback(async () => {
    if (!scene || !selectedCamera) return;
    if (favorited) {
      await removeFavorite(`${sceneId}_${selectedCamera.id}`);
      setFavorited(false);
    } else {
      await saveFavorite({ sceneId: sceneId!, sceneTitle: scene.title, sceneEmoji: scene.emoji, cameraId: selectedCamera.id, cameraBrand: selectedCamera.brand, cameraModel: selectedCamera.model, sensorType: selectedCamera.sensor });
      setFavorited(true);
    }
  }, [favorited, scene, selectedCamera, sceneId]);

  const handleExport = useCallback(async () => {
    if (!selectedCamera || !settings) {
      Alert.alert('Selecciona una cámara primero', 'Elige tu cámara para poder exportar la configuración.');
      return;
    }
    try {
      const uri = await (shotRef.current as any)?.capture?.();
      if (uri) {
        await Share.share({ url: uri, title: `FrameUp — ${scene?.title}` });
      } else throw new Error('no uri');
    } catch {
      if (!settings) return;
      const lines = SETTING_META.map(({ key, label }) => `${label}: ${(settings[key] as SettingValue).value}`).join('\n');
      const text  = `📷 FrameUp — ${scene?.title}\nCámara: ${selectedCamera.brand} ${selectedCamera.model} (${selectedCamera.sensor})\n\n${lines}`;
      await Share.share({ message: text });
    }
  }, [selectedCamera, settings, scene]);

  if (!scene) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Escena no encontrada</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: scene.title }} />
      <ViewShot ref={shotRef} options={{ format: 'jpg', quality: 0.92 }} style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Scene header */}
          <View style={[styles.sceneHeader, { backgroundColor: scene.color, borderBottomColor: scene.accent, borderBottomWidth: 2 }]}>
            <Text style={styles.sceneEmoji}>{scene.emoji}</Text>
            <View style={styles.sceneInfo}>
              <Text style={styles.sceneTitle}>{scene.title}</Text>
              <Text style={styles.sceneSub}>{scene.subtitle}</Text>
              <View style={styles.sceneRow}>
                <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(scene.difficulty) + '33' }]}>
                  <Text style={[styles.diffText, { color: getDifficultyColor(scene.difficulty) }]}>{scene.difficulty}</Text>
                </View>
                {scene.tripodRequired && (
                  <View style={styles.tripodBadge}>
                    <Ionicons name="camera-outline" size={10} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.tripodText}>Trípode recomendado</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.sceneDesc}>{scene.description}</Text>

          {/* Camera selector */}
          <TouchableOpacity style={[styles.cameraSelectorBtn, selectedCamera && styles.cameraSelectorBtnActive]} onPress={() => setSelectorVisible(true)}>
            <View style={styles.cameraSelectorLeft}>
              <Ionicons name="camera" size={20} color={selectedCamera ? theme.colors.primary : theme.colors.textMuted} />
              <View>
                {selectedCamera ? (
                  <>
                    <Text style={styles.cameraSelectedBrand}>{selectedCamera.brand}</Text>
                    <Text style={styles.cameraSelectedModel}>{selectedCamera.model}</Text>
                  </>
                ) : (
                  <Text style={styles.cameraSelectorPlaceholder}>Selecciona tu cámara para ver la configuración</Text>
                )}
              </View>
            </View>
            <View style={styles.cameraSelectorRight}>
              {selectedCamera && (
                <View style={[styles.sensorBadgeInline, { backgroundColor: getSensorColor(selectedCamera.sensor) + '22' }]}>
                  <Text style={[styles.sensorTextInline, { color: getSensorColor(selectedCamera.sensor) }]}>{getSensorLabel(selectedCamera.sensor)}</Text>
                </View>
              )}
              <Ionicons name="chevron-down" size={18} color={theme.colors.textMuted} />
            </View>
          </TouchableOpacity>

          {/* Action row */}
          {selectedCamera && (
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.actionBtn, favorited && styles.actionBtnActive]} onPress={toggleFavorite}>
                <Ionicons name={favorited ? 'bookmark' : 'bookmark-outline'} size={16} color={favorited ? theme.colors.primary : theme.colors.textSecondary} />
                <Text style={[styles.actionBtnTxt, favorited && { color: theme.colors.primary }]}>{favorited ? 'Guardado' : 'Guardar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, !!compareCamera && styles.actionBtnActive]} onPress={() => setCompareSelectorVisible(true)}>
                <Ionicons name="git-compare-outline" size={16} color={compareCamera ? theme.colors.secondary : theme.colors.textSecondary} />
                <Text style={[styles.actionBtnTxt, compareCamera && { color: theme.colors.secondary }]}>{compareCamera ? `vs ${compareCamera.model}` : 'Comparar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={handleExport}>
                <Ionicons name="share-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.actionBtnTxt}>Exportar</Text>
              </TouchableOpacity>
            </View>
          )}

          {settings ? (
            <>
              <Text style={styles.sectionTitle}>Configuración de cámara</Text>
              {SETTING_META.map(({ key, label, icon }) => {
                const item = settings[key] as SettingValue;
                return <SettingBlock key={key} icon={icon} label={label} value={item.value} explanation={item.explanation} />;
              })}

              {settings.tips.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Consejos profesionales</Text>
                  {settings.tips.map((tip, i) => (
                    <View key={i} style={styles.tipRow}>
                      <View style={styles.tipDot}><Text style={styles.tipNumber}>{i + 1}</Text></View>
                      <Text style={styles.tipText}>{tip}</Text>
                    </View>
                  ))}
                </>
              )}

              {settings.advertencias && settings.advertencias.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Ten en cuenta</Text>
                  {settings.advertencias.map((warn, i) => (
                    <View key={i} style={styles.warnRow}>
                      <Ionicons name="warning-outline" size={16} color={theme.colors.warning} />
                      <Text style={styles.warnText}>{warn}</Text>
                    </View>
                  ))}
                </>
              )}

              {compareCamera && compareSettings && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: theme.spacing.lg }]}>
                    Comparación — {selectedCamera!.model} vs {compareCamera.model}
                  </Text>
                  {SETTING_META.map(({ key, label }) => {
                    const a    = (settings[key] as SettingValue).value;
                    const b    = (compareSettings[key] as SettingValue).value;
                    const diff = a !== b;
                    return (
                      <View key={`cmp-${key}`} style={styles.cmpRow}>
                        <Text style={styles.cmpLabel}>{label}</Text>
                        <View style={styles.cmpValues}>
                          <Text style={[styles.cmpVal, { color: theme.colors.primary }]}>{a}</Text>
                          <Ionicons name="swap-horizontal" size={14} color={theme.colors.textMuted} />
                          <Text style={[styles.cmpVal, { color: theme.colors.secondary }, diff && styles.cmpDiff]}>{b}</Text>
                        </View>
                      </View>
                    );
                  })}
                </>
              )}

              <View style={styles.sensorNote}>
                <View style={[styles.sensorNoteBar, { backgroundColor: getSensorColor(selectedCamera!.sensor) }]} />
                <View style={styles.sensorNoteContent}>
                  <Text style={styles.sensorNoteTitle}>Configuración para {getSensorLabel(selectedCamera!.sensor)}</Text>
                  <Text style={styles.sensorNoteText}>
                    {selectedCamera!.hasIBIS
                      ? 'Tu cámara tiene IBIS (estabilización en sensor). Puedes usar velocidades más lentas a mano alzada.'
                      : 'Tu cámara no tiene IBIS. Usa velocidades más altas o trípode para evitar fotos movidas.'}
                    {' '}ISO nativo: {selectedCamera!.nativeISO}. ISO máximo usable: {Math.round(selectedCamera!.maxISO / 2).toLocaleString()}.
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.noCamera}>
              <Text style={styles.noCameraEmoji}>📷</Text>
              <Text style={styles.noCameraTitle}>Elige tu cámara</Text>
              <Text style={styles.noCameraText}>Selecciona tu modelo para ver la configuración exacta optimizada para tu sensor</Text>
              <TouchableOpacity style={styles.noCameraBtn} onPress={() => setSelectorVisible(true)}>
                <Text style={styles.noCameraBtnText}>Seleccionar cámara</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </ViewShot>

      <CameraSelector visible={selectorVisible}        selected={selectedCamera} onSelect={setSelectedCamera} onClose={() => setSelectorVisible(false)} />
      <CameraSelector visible={compareSelectorVisible} selected={compareCamera}  onSelect={setCompareCamera}  onClose={() => setCompareSelectorVisible(false)} />
    </>
  );
}
