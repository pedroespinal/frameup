import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { lenses } from '@/data/lenses';
import { scenes } from '@/data/scenes';
import { getSettingsForScene } from '@/data/cameraSettings';
import type { SensorType } from '@/data/cameras';

const CROPFACTOR_TO_SENSOR: Record<number, SensorType> = {
  1.0:  'full-frame',
  1.5:  'aps-c',
  2.0:  'micro-four-thirds',
  0.79: 'medium-format',
};

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:          { flex: 1, backgroundColor: t.colors.background },
    content:            { padding: t.spacing.md },
    backBtn:            { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: t.spacing.lg },
    backText:           { fontSize: 14, fontWeight: '600', color: t.colors.primary },
    error:              { fontSize: 16, color: t.colors.text, textAlign: 'center', paddingVertical: t.spacing.xl },
    backLink:           { fontSize: 14, color: t.colors.primary, fontWeight: '600', padding: t.spacing.md },
    headerCard:         { borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.lg },
    headerSubtitle:     { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    headerTitle:        { fontSize: 24, fontWeight: '800', color: '#FFF', marginBottom: 4 },
    headerLens:         { fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginBottom: t.spacing.sm },
    headerSpecs:        { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
    headerSpec:         { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
    sectionTitle:       { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.md, marginTop: t.spacing.lg },
    settingBlock:       { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.sm, borderWidth: 1, borderColor: t.colors.border },
    settingHeader:      { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    settingLabel:       { fontSize: 13, fontWeight: '700', color: t.colors.text },
    settingValue:       { fontSize: 18, fontWeight: '700', color: t.colors.primary, marginBottom: 4 },
    settingExplanation: { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
    warningBlock:       { backgroundColor: '#FF9800' + '15', borderLeftColor: '#FF9800', borderLeftWidth: 3, borderRadius: t.radius.lg, padding: t.spacing.md, marginTop: t.spacing.lg, marginBottom: t.spacing.md, flexDirection: 'row', gap: 12 },
    warningTitle:       { fontSize: 14, fontWeight: '700', color: '#FF9800', marginBottom: 2 },
    warningText:        { fontSize: 12, color: t.colors.textSecondary },
    warningsList:       { backgroundColor: '#FF9800' + '15', borderLeftColor: '#FF9800', borderLeftWidth: 3, borderRadius: t.radius.lg, padding: t.spacing.md, marginTop: t.spacing.lg, marginBottom: t.spacing.md },
    warningsTitle:      { fontSize: 14, fontWeight: '700', color: '#FF9800', marginBottom: 8 },
    warningItem:        { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18, marginBottom: 6 },
    tipsBlock:          { backgroundColor: t.colors.primary + '15', borderLeftColor: t.colors.primary, borderLeftWidth: 3, borderRadius: t.radius.lg, padding: t.spacing.md, marginTop: t.spacing.lg, marginBottom: t.spacing.md },
    tipsTitle:          { fontSize: 14, fontWeight: '700', color: t.colors.text, marginBottom: 8 },
    tipItem:            { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18, marginBottom: 6 },
    noteBlock:          { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border },
    noteLabel:          { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
    noteValue:          { fontSize: 16, fontWeight: '700', color: t.colors.text, marginBottom: 6, textTransform: 'capitalize' },
    noteText:           { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
  });
}

export default function MyLensSettingsScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { lensId, sceneId } = useLocalSearchParams<{ lensId: string; sceneId: string }>();

  const { lens, scene, sensorType, settings } = useMemo(() => {
    const l = lenses.find((x) => x.id === lensId);
    const s = scenes.find((x) => x.id === sceneId);
    if (!l || !s) return { lens: null, scene: null, sensorType: null, settings: null };
    const sensor = CROPFACTOR_TO_SENSOR[l.cropFactor] || 'full-frame';
    return { lens: l, scene: s, sensorType: sensor, settings: getSettingsForScene(sceneId, sensor) };
  }, [lensId, sceneId]);

  if (!lens || !scene || !settings) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Lente o escena no encontrados</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Atrás</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const equivalentFocal = (lens.focal * lens.cropFactor).toFixed(0);

  const SETTING_BLOCKS = [
    { icon: 'contrast',        label: 'Apertura',                value: settings.apertura.value,       explanation: settings.apertura.explanation },
    { icon: 'timer',           label: 'Velocidad de obturación', value: settings.velocidad.value,      explanation: settings.velocidad.explanation },
    { icon: 'sunny',           label: 'ISO',                     value: settings.iso.value,            explanation: settings.iso.explanation },
    { icon: 'color-filter',    label: 'Balance de blancos',      value: settings.balanceBlancos.value, explanation: settings.balanceBlancos.explanation },
    { icon: 'eye',             label: 'Modo de enfoque',         value: settings.modoEnfoque.value,    explanation: settings.modoEnfoque.explanation },
    { icon: 'aperture',        label: 'Medición de luz',         value: settings.medicion.value,       explanation: settings.medicion.explanation },
    { icon: 'camera',          label: 'Modo de disparo',         value: settings.disparo.value,        explanation: settings.disparo.explanation },
    { icon: 'swap-horizontal', label: 'Estabilización',          value: settings.estabilizacion.value, explanation: settings.estabilizacion.explanation },
    { icon: 'document',        label: 'Formato de archivo',      value: settings.formato.value,        explanation: settings.formato.explanation },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={20} color={theme.colors.primary} />
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <View style={[styles.headerCard, { backgroundColor: scene.color, borderLeftColor: scene.accent, borderLeftWidth: 3 }]}>
        <Text style={styles.headerSubtitle}>LENTE + ESCENA</Text>
        <Text style={styles.headerTitle}>{scene.emoji} {scene.title}</Text>
        <Text style={styles.headerLens}>{lens.brand} {lens.model}</Text>
        <View style={styles.headerSpecs}>
          <Text style={styles.headerSpec}>{lens.focal}{lens.focalMax ? `-${lens.focalMax}` : ''}mm f/{lens.aperture}</Text>
          <Text style={styles.headerSpec}>Equiv. {equivalentFocal}mm</Text>
          <Text style={styles.headerSpec}>{lens.mount.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Configuración óptima</Text>
      {SETTING_BLOCKS.map(({ icon, label, value, explanation }) => (
        <View key={label} style={styles.settingBlock}>
          <View style={styles.settingHeader}>
            <Ionicons name={icon as any} size={18} color={theme.colors.primary} />
            <Text style={styles.settingLabel}>{label}</Text>
          </View>
          <Text style={styles.settingValue}>{value}</Text>
          <Text style={styles.settingExplanation}>{explanation}</Text>
        </View>
      ))}

      {scene.tripodRequired && (
        <View style={styles.warningBlock}>
          <Ionicons name="warning" size={18} color="#FF9800" />
          <View style={{ flex: 1 }}>
            <Text style={styles.warningTitle}>Trípode recomendado</Text>
            <Text style={styles.warningText}>Esta escena requiere un trípode para obtener resultados óptimos.</Text>
          </View>
        </View>
      )}

      {settings.advertencias && settings.advertencias.length > 0 && (
        <View style={styles.warningsList}>
          <Text style={styles.warningsTitle}>⚠️ Advertencias</Text>
          {settings.advertencias.map((adv: string, idx: number) => (
            <Text key={idx} style={styles.warningItem}>• {adv}</Text>
          ))}
        </View>
      )}

      <View style={styles.tipsBlock}>
        <Text style={styles.tipsTitle}>💡 Tips para este lente en {scene.title}</Text>
        {settings.tips && settings.tips.length > 0 ? (
          settings.tips.map((tip: string, idx: number) => (
            <Text key={idx} style={styles.tipItem}>• {tip}</Text>
          ))
        ) : (
          <Text style={styles.tipItem}>• Este lente es versátil para esta escena. Ajusta los parámetros según tu creatividad.</Text>
        )}
      </View>

      <View style={styles.noteBlock}>
        <Text style={styles.noteLabel}>Sensor type</Text>
        <Text style={styles.noteValue}>{sensorType}</Text>
        <Text style={styles.noteText}>Estos settings están optimizados para {sensorType}. Si cambias de cámara con otro sensor, ajusta ISO y enfoque.</Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
