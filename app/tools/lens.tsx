import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useState, useMemo } from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import {
  lenses, Lens, UseCase, CameraMount,
  getLensesForUseCase, priceLabel, priceColor, useCaseLabel,
} from '@/data/lenses';

const USE_CASES: Array<{ id: UseCase; emoji: string }> = [
  { id: 'retrato',       emoji: '🧑' },  { id: 'paisaje',      emoji: '🏔️' },
  { id: 'astro',         emoji: '🌌' },  { id: 'calle',        emoji: '🏙️' },
  { id: 'boda',          emoji: '💍' },  { id: 'accion',       emoji: '⚡' },
  { id: 'macro',         emoji: '🌿' },  { id: 'fauna',        emoji: '🦁' },
  { id: 'viaje',         emoji: '✈️' },  { id: 'arquitectura', emoji: '🏛️' },
];

const MOUNT_LABELS: Record<CameraMount, string> = {
  'sony-e': 'Sony E', 'canon-rf': 'Canon RF', 'nikon-z': 'Nikon Z',
  'fuji-x': 'Fujifilm X', 'mft': 'Micro 4/3', 'fuji-gfx': 'Fujifilm GFX',
  'leica-sl': 'Leica SL', 'canon-ef': 'Canon EF', 'nikon-f': 'Nikon F',
};

function focalEquiv(lens: Lens): string {
  const cf = lens.cropFactor;
  if (cf === 1.0) return lens.focalMax ? `${lens.focal}–${lens.focalMax}mm` : `${lens.focal}mm`;
  const eq  = Math.round(lens.focal * cf);
  const eq2 = lens.focalMax ? Math.round(lens.focalMax * cf) : null;
  const raw = lens.focalMax ? `${lens.focal}–${lens.focalMax}mm` : `${lens.focal}mm`;
  const equiv = eq2 ? `${eq}–${eq2}mm equiv.` : `${eq}mm equiv.`;
  return `${raw} (${equiv})`;
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    section:           { paddingHorizontal: t.spacing.md, paddingTop: t.spacing.md },
    mountBtn:          { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border },
    mountBtnTxt:       { flex: 1, fontSize: 14, color: t.colors.text, fontWeight: '600' },
    mountGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
    mountChip:         { paddingHorizontal: 12, paddingVertical: 7, borderRadius: t.radius.sm, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
    mountChipActive:   { backgroundColor: t.colors.primary + '22', borderColor: t.colors.primary },
    mountChipTxt:      { fontSize: 12, color: t.colors.textSecondary, fontWeight: '600' },
    mountChipTxtActive:{ color: t.colors.primary, fontWeight: '700' },
    label:             { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
    ucChip:            { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 11, paddingVertical: 7, borderRadius: t.radius.round, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
    ucChipActive:      { backgroundColor: t.colors.primary + '22', borderColor: t.colors.primary },
    ucEmoji:           { fontSize: 13 },
    ucChipTxt:         { fontSize: 12, color: t.colors.textSecondary, fontWeight: '600' },
    ucChipTxtActive:   { color: t.colors.primary, fontWeight: '700' },
    // LensCard styles
    lcCard:            { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.sm, borderWidth: 1, borderColor: t.colors.border },
    lcTop:             { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    lcNameBox:         { flex: 1, marginRight: 8 },
    lcBrand:           { fontSize: 11, color: t.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
    lcModel:           { fontSize: 15, fontWeight: '700', color: t.colors.text, marginTop: 1 },
    lcPriceBadge:      { borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 3 },
    lcPriceTxt:        { fontSize: 10, fontWeight: '700' },
    lcMeta:            { flexDirection: 'row', gap: 10, marginBottom: 8, flexWrap: 'wrap' },
    lcMetaItem:        { flexDirection: 'row', alignItems: 'center', gap: 4 },
    lcMetaTxt:         { fontSize: 12, color: t.colors.textSecondary, fontWeight: '500' },
    lcThirdParty:      { backgroundColor: t.colors.surface, borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2 },
    lcThirdPartyTxt:   { fontSize: 9, color: t.colors.textMuted, fontWeight: '600' },
    lcNotebox:         { flexDirection: 'row', gap: 5, backgroundColor: t.colors.primary + '10', borderRadius: t.radius.sm, padding: 7, marginBottom: 8, alignItems: 'flex-start' },
    lcNoteTxt:         { flex: 1, fontSize: 12, color: t.colors.primary, lineHeight: 17 },
    lcUseCases:        { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    lcUseTag:          { backgroundColor: t.colors.background, borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2 },
    lcUseTagTxt:       { fontSize: 10, color: t.colors.textMuted },
  });
}

function LensCard({ lens }: { lens: Lens }) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const pc = priceColor(lens.price);
  return (
    <View style={styles.lcCard}>
      <View style={styles.lcTop}>
        <View style={styles.lcNameBox}>
          <Text style={styles.lcBrand}>{lens.brand}</Text>
          <Text style={styles.lcModel}>{lens.model}</Text>
        </View>
        <View style={[styles.lcPriceBadge, { backgroundColor: pc + '22' }]}>
          <Text style={[styles.lcPriceTxt, { color: pc }]}>{priceLabel(lens.price)}</Text>
        </View>
      </View>
      <View style={styles.lcMeta}>
        <View style={styles.lcMetaItem}>
          <Ionicons name="aperture" size={12} color={theme.colors.primary} />
          <Text style={styles.lcMetaTxt}>{focalEquiv(lens)}</Text>
        </View>
        <View style={styles.lcMetaItem}>
          <Ionicons name="eye-outline" size={12} color={theme.colors.secondary} />
          <Text style={styles.lcMetaTxt}>f/{lens.aperture}</Text>
        </View>
        {!lens.firstParty && (
          <View style={styles.lcThirdParty}>
            <Text style={styles.lcThirdPartyTxt}>Terceros</Text>
          </View>
        )}
      </View>
      {lens.note && (
        <View style={styles.lcNotebox}>
          <Ionicons name="star" size={11} color={theme.colors.primary} />
          <Text style={styles.lcNoteTxt}>{lens.note}</Text>
        </View>
      )}
      <View style={styles.lcUseCases}>
        {lens.useCases.map((u) => (
          <View key={u} style={styles.lcUseTag}>
            <Text style={styles.lcUseTagTxt}>{useCaseLabel(u)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function LensScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedMount, setMount] = useState<CameraMount | null>(null);
  const [selectedUC,    setUC]    = useState<UseCase | null>(null);
  const [showMounts,    setShowMounts] = useState(false);

  const availableMounts = useMemo(() => Array.from(new Set(lenses.map((l) => l.mount))) as CameraMount[], []);

  const filtered = useMemo(() => {
    let result = lenses;
    if (selectedMount) result = result.filter((l) => l.mount === selectedMount);
    if (selectedUC)    result = result.filter((l) => l.useCases.includes(selectedUC));
    return result;
  }, [selectedMount, selectedUC]);

  return (
    <>
      <Stack.Screen options={{ title: 'Asesor de Lentes' }} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.mountBtn} onPress={() => setShowMounts(!showMounts)}>
            <Ionicons name="camera-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.mountBtnTxt}>{selectedMount ? MOUNT_LABELS[selectedMount] : 'Selecciona tu montura / sistema'}</Text>
            <Ionicons name={showMounts ? 'chevron-up' : 'chevron-down'} size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
          {showMounts && (
            <View style={styles.mountGrid}>
              {availableMounts.map((m) => (
                <TouchableOpacity key={m} style={[styles.mountChip, selectedMount === m && styles.mountChipActive]} onPress={() => { setMount(m); setShowMounts(false); }}>
                  <Text style={[styles.mountChipTxt, selectedMount === m && styles.mountChipTxtActive]}>{MOUNT_LABELS[m]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tipo de fotografía</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
            <TouchableOpacity style={[styles.ucChip, !selectedUC && styles.ucChipActive]} onPress={() => setUC(null)}>
              <Text style={[styles.ucChipTxt, !selectedUC && styles.ucChipTxtActive]}>Todos</Text>
            </TouchableOpacity>
            {USE_CASES.map(({ id, emoji }) => (
              <TouchableOpacity key={id} style={[styles.ucChip, selectedUC === id && styles.ucChipActive]} onPress={() => setUC(id)}>
                <Text style={styles.ucEmoji}>{emoji}</Text>
                <Text style={[styles.ucChipTxt, selectedUC === id && styles.ucChipTxtActive]}>{useCaseLabel(id)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            {filtered.length} lente{filtered.length !== 1 ? 's' : ''}
            {selectedMount ? ` — ${MOUNT_LABELS[selectedMount]}` : ''}
            {selectedUC ? ` — ${useCaseLabel(selectedUC)}` : ''}
          </Text>
          {filtered.map((lens) => <LensCard key={lens.id} lens={lens} />)}
        </View>
      </ScrollView>
    </>
  );
}
