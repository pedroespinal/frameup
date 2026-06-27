import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal as RNModal, FlatList, SectionList, Alert,
} from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { cameras, Camera, getCamerasByBrand, getSensorColor, getSensorLabel } from '@/data/cameras';
import { lenses } from '@/data/lenses';
import { getGearProfile, saveGearProfile, clearGearProfile, GearProfile } from '@/utils/profile';

type ModalType = 'none' | 'camera' | 'lens';

function createStyles(t: Theme) {
  return StyleSheet.create({
    // Screen
    container:     { flex: 1, backgroundColor: t.colors.background },
    content:       { padding: t.spacing.md },
    subtitle:      { fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: t.spacing.lg },
    sectionLabel:  { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.sm, marginTop: t.spacing.md },
    selectedCard:  { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, borderLeftWidth: 3, marginBottom: t.spacing.sm },
    sensorDot:     { width: 10, height: 10, borderRadius: 5 },
    selectedInfo:  { flex: 1 },
    selectedName:  { fontSize: 15, fontWeight: '700', color: t.colors.text },
    selectedSub:   { fontSize: 12, color: t.colors.textSecondary, marginTop: 2 },
    changeBtn:     { backgroundColor: t.colors.primary + '22', borderRadius: t.radius.round, paddingHorizontal: 12, paddingVertical: 5 },
    changeBtnText: { fontSize: 12, fontWeight: '700', color: t.colors.primary },
    addBtn:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.primary + '40', marginBottom: t.spacing.sm },
    addBtnText:    { fontSize: 15, fontWeight: '600', color: t.colors.primary },
    lensRow:       { flexDirection: 'row', alignItems: 'center', backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, marginBottom: t.spacing.sm },
    lensInfo:      { flex: 1 },
    lensName:      { fontSize: 14, fontWeight: '600', color: t.colors.text },
    lensSub:       { fontSize: 12, color: t.colors.textSecondary, marginTop: 2 },
    saveBtn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: t.colors.primary, borderRadius: t.radius.round, padding: t.spacing.md, marginTop: t.spacing.lg },
    saveBtnText:   { fontSize: 15, fontWeight: '700', color: '#000' },
    clearBtn:      { alignItems: 'center', marginTop: t.spacing.md, padding: t.spacing.sm },
    clearBtnText:  { fontSize: 13, color: t.colors.accent },
    updatedAt:     { fontSize: 11, color: t.colors.textMuted, textAlign: 'center', marginTop: t.spacing.sm },
    // Modal
    mContainer:    { flex: 1, backgroundColor: t.colors.background },
    mHeader:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: t.spacing.md, borderBottomWidth: 1, borderBottomColor: t.colors.border },
    mTitle:        { fontSize: 17, fontWeight: '700', color: t.colors.text },
    mSectionHeader:{ backgroundColor: t.colors.surface, paddingHorizontal: t.spacing.md, paddingVertical: 6 },
    mSectionTitle: { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
    mFooter:       { padding: t.spacing.md, borderTopWidth: 1, borderTopColor: t.colors.border },
    mFooterBtn:    { backgroundColor: t.colors.primary, borderRadius: t.radius.round, padding: t.spacing.md, alignItems: 'center' },
    mFooterBtnText:{ fontSize: 15, fontWeight: '700', color: '#000' },
    // Camera/lens item rows
    itemRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: t.spacing.md, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: t.colors.divider },
    itemRowActive: { backgroundColor: t.colors.primary + '10' },
    itemIndicator: { width: 3, height: 36, borderRadius: 2 },
    itemInfo:      { flex: 1 },
    itemName:      { fontSize: 14, fontWeight: '600', color: t.colors.text },
    itemSub:       { fontSize: 12, color: t.colors.textSecondary, marginTop: 1 },
    emptyText:     { color: t.colors.textMuted, padding: t.spacing.lg, textAlign: 'center' },
  });
}

function CameraItem({ cam, selected, onPress }: { cam: Camera; selected: boolean; onPress: () => void }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const color = getSensorColor(cam.sensor);
  return (
    <TouchableOpacity style={[styles.itemRow, selected && styles.itemRowActive]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.itemIndicator, { backgroundColor: color }]} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{cam.brand} {cam.model}</Text>
        <Text style={styles.itemSub}>{getSensorLabel(cam.sensor)} · {cam.year}</Text>
      </View>
      {selected && <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />}
    </TouchableOpacity>
  );
}

export default function MyGearScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [profile, setProfile]             = useState<GearProfile | null>(null);
  const [modal,   setModal]               = useState<ModalType>('none');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedLensIds, setSelectedLensIds] = useState<string[]>([]);

  const load = useCallback(async () => {
    const p = await getGearProfile();
    setProfile(p);
    if (p?.cameraId) setSelectedCamera(cameras.find((c) => c.id === p.cameraId) ?? null);
    if (p?.lensIds)  setSelectedLensIds(p.lensIds);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    await saveGearProfile({ cameraId: selectedCamera?.id, cameraBrand: selectedCamera?.brand, cameraModel: selectedCamera?.model, sensorType: selectedCamera?.sensor, lensIds: selectedLensIds });
    setProfile(await getGearProfile());
    Alert.alert('Equipo guardado', 'Tu configuración de equipo ha sido guardada.');
  };

  const handleClear = () => {
    Alert.alert('Limpiar equipo', '¿Eliminar toda la configuración de equipo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => { await clearGearProfile(); setSelectedCamera(null); setSelectedLensIds([]); setProfile(null); } },
    ]);
  };

  const toggleLens = (lensId: string) => setSelectedLensIds((prev) => prev.includes(lensId) ? prev.filter((id) => id !== lensId) : [...prev, lensId]);

  const brandSections = Object.entries(getCamerasByBrand()).map(([brand, cams]) => ({ title: brand, data: cams }));

  const compatibleLenses = selectedCamera
    ? lenses.filter((l) => {
        const mountMap: Record<string, string[]> = {
          'sony-a7': ['sony-e'], 'sony-a6': ['sony-e'], 'canon-r': ['canon-rf'],
          'nikon-z': ['nikon-z'], 'fuji-x': ['fuji-x'], 'fuji-gfx': ['fuji-gf'],
          'om-1': ['micro-four-thirds'], 'g9-ii': ['micro-four-thirds'], 'lumix-s': ['leica-l'],
        };
        const mounts = Object.entries(mountMap).find(([key]) => selectedCamera.id.startsWith(key))?.[1];
        return mounts ? mounts.includes(l.mount) : true;
      })
    : lenses;

  const sensorColor = selectedCamera ? getSensorColor(selectedCamera.sensor) : theme.colors.textMuted;

  return (
    <>
      <Stack.Screen options={{ title: 'Mi Equipo' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Guarda tu cámara y lentes habituales. FrameUp los usará como referencia para las recomendaciones.</Text>

        <Text style={styles.sectionLabel}>Mi Cámara</Text>
        {selectedCamera ? (
          <View style={[styles.selectedCard, { borderLeftColor: sensorColor }]}>
            <View style={[styles.sensorDot, { backgroundColor: sensorColor }]} />
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedName}>{selectedCamera.brand} {selectedCamera.model}</Text>
              <Text style={styles.selectedSub}>{getSensorLabel(selectedCamera.sensor)} · {selectedCamera.year}</Text>
            </View>
            <TouchableOpacity onPress={() => setModal('camera')} style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>Cambiar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={() => setModal('camera')}>
            <Ionicons name="camera-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.addBtnText}>Seleccionar cámara</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionLabel}>Mis Lentes</Text>
        {selectedLensIds.length > 0 ? (
          <>
            {selectedLensIds.map((id) => {
              const lens = lenses.find((l) => l.id === id);
              if (!lens) return null;
              return (
                <View key={id} style={styles.lensRow}>
                  <View style={styles.lensInfo}>
                    <Text style={styles.lensName}>{lens.brand} {lens.model}</Text>
                    <Text style={styles.lensSub}>{lens.focal}{lens.focalMax ? `-${lens.focalMax}` : ''}mm f/{lens.aperture} · {lens.mount.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleLens(id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="close-circle" size={20} color={theme.colors.textMuted} />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity style={[styles.addBtn, { marginTop: theme.spacing.sm }]} onPress={() => setModal('lens')}>
              <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.addBtnText}>Añadir otro lente</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={() => setModal('lens')}>
            <Ionicons name="aperture-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.addBtnText}>Añadir lentes</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="checkmark-circle" size={20} color="#000" />
          <Text style={styles.saveBtnText}>Guardar equipo</Text>
        </TouchableOpacity>

        {profile && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Eliminar equipo guardado</Text>
          </TouchableOpacity>
        )}
        {profile?.updatedAt && (
          <Text style={styles.updatedAt}>
            Última actualización: {new Date(profile.updatedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>

      <RNModal visible={modal === 'camera'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.mContainer}>
          <View style={styles.mHeader}>
            <Text style={styles.mTitle}>Seleccionar cámara</Text>
            <TouchableOpacity onPress={() => setModal('none')}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <SectionList
            sections={brandSections}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <View style={styles.mSectionHeader}>
                <Text style={styles.mSectionTitle}>{section.title}</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <CameraItem
                cam={item}
                selected={selectedCamera?.id === item.id}
                onPress={() => { setSelectedCamera(item); setSelectedLensIds([]); setModal('none'); }}
              />
            )}
          />
        </View>
      </RNModal>

      <RNModal visible={modal === 'lens'} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.mContainer}>
          <View style={styles.mHeader}>
            <Text style={styles.mTitle}>Añadir lente{selectedCamera ? ` (${selectedCamera.brand})` : ''}</Text>
            <TouchableOpacity onPress={() => setModal('none')}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={compatibleLenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const active = selectedLensIds.includes(item.id);
              return (
                <TouchableOpacity style={[styles.itemRow, active && styles.itemRowActive]} onPress={() => toggleLens(item.id)} activeOpacity={0.8}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.brand} {item.model}</Text>
                    <Text style={styles.itemSub}>{item.focal}{item.focalMax ? `-${item.focalMax}` : ''}mm f/{item.aperture} · {item.mount.toUpperCase()}</Text>
                  </View>
                  {active && <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay lentes para esta montura</Text>}
          />
          <View style={styles.mFooter}>
            <TouchableOpacity style={styles.mFooterBtn} onPress={() => setModal('none')}>
              <Text style={styles.mFooterBtnText}>{selectedLensIds.length > 0 ? `Confirmar (${selectedLensIds.length} lentes)` : 'Cerrar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </>
  );
}
