import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { lenses, CameraMount } from '@/data/lenses';
import { scenes, Scene, SceneCategory } from '@/data/scenes';

const USECASE_TO_CATEGORY: Record<string, SceneCategory> = {
  retrato: 'retrato', paisaje: 'paisaje', astro: 'noche', macro: 'macro',
  accion: 'accion', calle: 'calle', boda: 'evento', arquitectura: 'arquitectura',
  fauna: 'accion', viaje: 'paisaje',
};

const MOUNTS: Array<{ id: CameraMount; label: string }> = [
  { id: 'sony-e',   label: 'Sony E' },    { id: 'canon-rf',  label: 'Canon RF' },
  { id: 'nikon-z',  label: 'Nikon Z' },   { id: 'fuji-x',    label: 'Fujifilm X' },
  { id: 'mft',      label: 'MFT' },       { id: 'fuji-gfx',  label: 'Fujifilm GFX' },
  { id: 'leica-sl', label: 'Leica SL' },  { id: 'canon-ef',  label: 'Canon EF' },
  { id: 'nikon-f',  label: 'Nikon F' },
];

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:        { flex: 1, backgroundColor: t.colors.background },
    content:          { padding: t.spacing.md },
    intro:            { fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: t.spacing.lg },
    sectionTitle:     { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.sm, marginTop: t.spacing.md },
    mountRow:         { gap: t.spacing.xs, paddingBottom: t.spacing.md },
    mountChip:        { paddingHorizontal: 12, paddingVertical: 8, borderRadius: t.radius.round, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
    mountChipActive:  { backgroundColor: t.colors.primary, borderColor: t.colors.primary },
    mountLabel:       { fontSize: 12, fontWeight: '600', color: t.colors.textSecondary },
    mountLabelActive: { color: '#000' },
    lensCard:         { flexDirection: 'row', alignItems: 'center', backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.sm, borderWidth: 1, borderColor: t.colors.border, gap: 12 },
    lensInfo:         { flex: 1 },
    lensBrand:        { fontSize: 12, fontWeight: '600', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
    lensName:         { fontSize: 14, fontWeight: '700', color: t.colors.text, marginBottom: 2 },
    lensSpecs2:       { fontSize: 11, color: t.colors.textSecondary },
    lensUseCases:     { flexDirection: 'row', gap: 4, flexWrap: 'wrap', maxWidth: 120 },
    useCaseTag:       { backgroundColor: t.colors.primary + '20', borderRadius: t.radius.round, paddingHorizontal: 6, paddingVertical: 2 },
    useCaseText:      { fontSize: 9, fontWeight: '600', color: t.colors.primary, textTransform: 'capitalize' },
    backBtn:          { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: t.spacing.lg },
    backText:         { fontSize: 14, fontWeight: '600', color: t.colors.primary },
    lensHeader:       { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.lg, borderWidth: 1, borderColor: t.colors.border },
    lensModel:        { fontSize: 16, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    lensSpecs:        { gap: 4, marginBottom: t.spacing.sm },
    spec:             { fontSize: 13, color: t.colors.textSecondary },
    note:             { fontSize: 12, color: t.colors.primary, fontStyle: 'italic' },
    scenesGrid:       { flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm },
    sceneCard:        { width: '48.5%', borderRadius: t.radius.lg, padding: t.spacing.md, minHeight: 140, justifyContent: 'flex-end' },
    sceneEmoji:       { fontSize: 32, marginBottom: t.spacing.xs },
    sceneTitle:       { fontSize: 14, fontWeight: '700', color: '#FFF', marginBottom: 2 },
    sceneSub:         { fontSize: 10, color: 'rgba(255,255,255,0.65)' },
    emptyText:        { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', paddingVertical: t.spacing.xl },
  });
}

export default function MyLensScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedMount, setSelectedMount] = useState<CameraMount>('sony-e');
  const [selectedLens,  setSelectedLens]  = useState<string | null>(null);

  const lensesByMount = useMemo(() => lenses.filter((l) => l.mount === selectedMount), [selectedMount]);

  const lensWithScenes = useMemo(() => {
    if (!selectedLens) return null;
    const lens = lenses.find((l) => l.id === selectedLens);
    if (!lens) return null;
    const categories = new Set<SceneCategory>();
    lens.useCases.forEach((u) => { const c = USECASE_TO_CATEGORY[u]; if (c) categories.add(c); });
    return { lens, recommendedScenes: scenes.filter((s) => categories.has(s.category)) };
  }, [selectedLens]);

  if (lensWithScenes) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedLens(null)}>
          <Ionicons name="chevron-back" size={20} color={theme.colors.primary} />
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>

        <View style={styles.lensHeader}>
          <Text style={styles.lensModel}>{lensWithScenes.lens.brand} {lensWithScenes.lens.model}</Text>
          <View style={styles.lensSpecs}>
            <Text style={styles.spec}>{lensWithScenes.lens.focal}{lensWithScenes.lens.focalMax ? `-${lensWithScenes.lens.focalMax}mm` : 'mm'} f/{lensWithScenes.lens.aperture}</Text>
            <Text style={styles.spec}>Equiv. {(lensWithScenes.lens.focal * lensWithScenes.lens.cropFactor).toFixed(0)}{lensWithScenes.lens.focalMax ? `-${(lensWithScenes.lens.focalMax * lensWithScenes.lens.cropFactor).toFixed(0)}` : ''}mm</Text>
          </View>
          {lensWithScenes.lens.note && <Text style={styles.note}>{lensWithScenes.lens.note}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Escenas recomendadas ({lensWithScenes.recommendedScenes.length})</Text>
        {lensWithScenes.recommendedScenes.length === 0 ? (
          <Text style={styles.emptyText}>No hay escenas recomendadas para este lente.</Text>
        ) : (
          <View style={styles.scenesGrid}>
            {lensWithScenes.recommendedScenes.map((scene) => (
              <TouchableOpacity
                key={scene.id}
                style={[styles.sceneCard, { backgroundColor: scene.color, borderLeftColor: scene.accent, borderLeftWidth: 3 }]}
                onPress={() => router.push({ pathname: '/tools/my-lens-settings', params: { lensId: lensWithScenes.lens.id, sceneId: scene.id } } as any)}
                activeOpacity={0.85}
              >
                <Text style={styles.sceneEmoji}>{scene.emoji}</Text>
                <Text style={styles.sceneTitle}>{scene.title}</Text>
                <Text style={styles.sceneSub}>{scene.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ height: 32 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.intro}>Selecciona tu lente para ver escenas recomendadas y la configuración óptima.</Text>

      <Text style={styles.sectionTitle}>Montura</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.mountRow}>
        {MOUNTS.map((mount) => (
          <TouchableOpacity
            key={mount.id}
            style={[styles.mountChip, selectedMount === mount.id && styles.mountChipActive]}
            onPress={() => setSelectedMount(mount.id)}
          >
            <Text style={[styles.mountLabel, selectedMount === mount.id && styles.mountLabelActive]}>{mount.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>{lensesByMount.length} lentes</Text>
      <FlatList
        data={lensesByMount}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.lensCard} onPress={() => setSelectedLens(item.id)} activeOpacity={0.75}>
            <View style={styles.lensInfo}>
              <Text style={styles.lensBrand}>{item.brand}</Text>
              <Text style={styles.lensName}>{item.model}</Text>
              <Text style={styles.lensSpecs2}>{item.focal}{item.focalMax ? `-${item.focalMax}` : ''}mm f/{item.aperture}</Text>
            </View>
            <View style={styles.lensUseCases}>
              {item.useCases.map((u) => (
                <View key={u} style={styles.useCaseTag}>
                  <Text style={styles.useCaseText}>{u}</Text>
                </View>
              ))}
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
        )}
      />
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
