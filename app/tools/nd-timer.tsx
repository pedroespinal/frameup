import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';

interface NdFilter  { label: string; stops: number; factor: number }
interface ShutterSpeed { label: string; seconds: number }

const ND_FILTERS: NdFilter[] = [
  { label: 'Sin filtro',              stops: 0,    factor: 1 },
  { label: 'ND2 (1 stop)',            stops: 1,    factor: 2 },
  { label: 'ND4 (2 stops)',           stops: 2,    factor: 4 },
  { label: 'ND8 (3 stops)',           stops: 3,    factor: 8 },
  { label: 'ND16 (4 stops)',          stops: 4,    factor: 16 },
  { label: 'ND32 (5 stops)',          stops: 5,    factor: 32 },
  { label: 'ND64 (6 stops)',          stops: 6,    factor: 64 },
  { label: 'ND100 (6.6 stops)',       stops: 6.6,  factor: 100 },
  { label: 'ND256 (8 stops)',         stops: 8,    factor: 256 },
  { label: 'ND400 (8.6 stops)',       stops: 8.6,  factor: 400 },
  { label: 'ND1000 (10 stops)',       stops: 10,   factor: 1000 },
  { label: 'ND3200 (11.6 stops)',     stops: 11.6, factor: 3200 },
];

const SHUTTER_SPEEDS: ShutterSpeed[] = [
  { label: '1/8000s', seconds: 1/8000 },
  { label: '1/4000s', seconds: 1/4000 },
  { label: '1/2000s', seconds: 1/2000 },
  { label: '1/1000s', seconds: 1/1000 },
  { label: '1/500s',  seconds: 1/500 },
  { label: '1/250s',  seconds: 1/250 },
  { label: '1/125s',  seconds: 1/125 },
  { label: '1/60s',   seconds: 1/60 },
  { label: '1/30s',   seconds: 1/30 },
  { label: '1/15s',   seconds: 1/15 },
  { label: '1/8s',    seconds: 1/8 },
  { label: '1/4s',    seconds: 1/4 },
  { label: '1/2s',    seconds: 0.5 },
  { label: '1s',      seconds: 1 },
  { label: '2s',      seconds: 2 },
  { label: '4s',      seconds: 4 },
  { label: '8s',      seconds: 8 },
  { label: '15s',     seconds: 15 },
  { label: '30s',     seconds: 30 },
];

function formatResult(seconds: number): string {
  if (seconds < 1) return `1/${Math.round(1 / seconds)}s`;
  if (seconds < 60) return `${Math.round(seconds * 10) / 10}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs === 0 ? `${mins} min` : `${mins} min ${secs}s`;
}

function getEffectLabel(seconds: number, colors: Theme['colors']): { text: string; color: string } {
  if (seconds < 1)   return { text: 'Velocidad normal — sin efecto especial',                           color: colors.textMuted };
  if (seconds < 4)   return { text: 'Agua semi-sedosa — algo de movimiento visible',                   color: colors.secondary };
  if (seconds < 15)  return { text: 'Agua sedosa — suaviza cascadas y olas',                           color: '#66BB6A' };
  if (seconds < 60)  return { text: 'Movimiento de nubes visible — cielos dinámicos',                  color: colors.primary };
  if (seconds < 300) return { text: 'Nubes en movimiento fluido — efecto dramático',                   color: '#CE93D8' };
  return               { text: 'Exposición muy larga — nubes fantasmales, personas invisibles',         color: '#FF8A65' };
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:      { flex: 1, backgroundColor: t.colors.background },
    content:        { padding: t.spacing.md },
    subtitle:       { fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: t.spacing.lg },
    sectionLabel:   { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.sm, marginTop: t.spacing.md },
    chipRow:        { paddingBottom: t.spacing.md, gap: t.spacing.sm },
    chip:           { backgroundColor: t.colors.card, borderRadius: t.radius.round, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1, borderColor: t.colors.border },
    chipActive:     { backgroundColor: t.colors.primary + '22', borderColor: t.colors.primary },
    chipText:       { fontSize: 13, color: t.colors.textSecondary, fontWeight: '500' },
    chipTextActive: { color: t.colors.primary, fontWeight: '700' },
    ndGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm, marginBottom: t.spacing.md },
    ndChip:         { backgroundColor: t.colors.card, borderRadius: t.radius.md, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: t.colors.border, minWidth: '47%', flex: 1 },
    ndChipActive:   { backgroundColor: t.colors.secondary + '22', borderColor: t.colors.secondary },
    ndLabel:        { fontSize: 12, color: t.colors.textSecondary, fontWeight: '500', textAlign: 'center' },
    ndLabelActive:  { color: t.colors.secondary, fontWeight: '700' },
    resultCard:     { backgroundColor: t.colors.card, borderRadius: t.radius.xl, padding: t.spacing.lg, borderWidth: 1, borderColor: t.colors.border, alignItems: 'center', marginVertical: t.spacing.md },
    resultLabel:    { fontSize: 10, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
    resultValue:    { fontSize: 52, fontWeight: '800', color: t.colors.primary, marginBottom: 12, letterSpacing: -1 },
    effectBadge:    { borderRadius: t.radius.round, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 12 },
    effectText:     { fontSize: 13, fontWeight: '600', textAlign: 'center' },
    bulbWarning:    { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: t.colors.warning + '15', borderRadius: t.radius.md, padding: t.spacing.sm, marginTop: 4 },
    bulbText:       { fontSize: 12, color: t.colors.warning, flex: 1, lineHeight: 18 },
    formulaCard:    { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border, marginBottom: t.spacing.md },
    formulaTitle:   { fontSize: 13, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    formulaRow:     { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: t.colors.divider },
    formulaRowLast: { borderBottomWidth: 0, paddingTop: 10, marginTop: 4 },
    formulaKey:     { fontSize: 13, color: t.colors.textSecondary },
    formulaVal:     { fontSize: 13, color: t.colors.text, fontWeight: '600' },
    tipsCard:       { backgroundColor: t.colors.primary + '12', borderLeftColor: t.colors.primary, borderLeftWidth: 3, borderRadius: t.radius.lg, padding: t.spacing.md },
    tipsTitle:      { fontSize: 14, fontWeight: '700', color: t.colors.text, marginBottom: 8 },
    tip:            { fontSize: 12, color: t.colors.textSecondary, lineHeight: 19, marginBottom: 6 },
  });
}

export default function NdTimerScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedShutter, setSelectedShutter] = useState(7);
  const [selectedNd, setSelectedNd] = useState(0);

  const baseSpeed     = SHUTTER_SPEEDS[selectedShutter];
  const ndFilter      = ND_FILTERS[selectedNd];
  const resultSeconds = useMemo(() => baseSpeed.seconds * ndFilter.factor, [baseSpeed, ndFilter]);
  const effect        = getEffectLabel(resultSeconds, theme.colors);
  const needsBulb     = resultSeconds > 30;

  return (
    <>
      <Stack.Screen options={{ title: 'Calculadora ND' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Calcula el tiempo de exposición correcto al añadir un filtro ND.</Text>

        <Text style={styles.sectionLabel}>Velocidad base (sin filtro)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {SHUTTER_SPEEDS.map((sp, i) => (
            <TouchableOpacity key={sp.label} style={[styles.chip, selectedShutter === i && styles.chipActive]} onPress={() => setSelectedShutter(i)}>
              <Text style={[styles.chipText, selectedShutter === i && styles.chipTextActive]}>{sp.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>Filtro ND</Text>
        <View style={styles.ndGrid}>
          {ND_FILTERS.map((nd, i) => (
            <TouchableOpacity key={nd.label} style={[styles.ndChip, selectedNd === i && styles.ndChipActive]} onPress={() => setSelectedNd(i)}>
              <Text style={[styles.ndLabel, selectedNd === i && styles.ndLabelActive]}>{nd.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>TIEMPO RESULTANTE</Text>
          <Text style={styles.resultValue}>{formatResult(resultSeconds)}</Text>
          <View style={[styles.effectBadge, { backgroundColor: effect.color + '22' }]}>
            <Text style={[styles.effectText, { color: effect.color }]}>{effect.text}</Text>
          </View>
          {needsBulb && (
            <View style={styles.bulbWarning}>
              <Ionicons name="warning-outline" size={16} color={theme.colors.warning} />
              <Text style={styles.bulbText}>Usa modo Bulb (B) o Time (T) con disparador remoto — supera los 30s de limite del obturador.</Text>
            </View>
          )}
        </View>

        <View style={styles.formulaCard}>
          <Text style={styles.formulaTitle}>Resumen</Text>
          {[
            { key: 'Velocidad base',       val: baseSpeed.label },
            { key: 'Filtro ND',            val: ndFilter.label },
            { key: 'Factor de reducción',  val: `×${ndFilter.factor} (${ndFilter.stops} paradas)` },
          ].map((row) => (
            <View key={row.key} style={styles.formulaRow}>
              <Text style={styles.formulaKey}>{row.key}</Text>
              <Text style={styles.formulaVal}>{row.val}</Text>
            </View>
          ))}
          <View style={[styles.formulaRow, styles.formulaRowLast]}>
            <Text style={[styles.formulaKey, { color: theme.colors.primary, fontWeight: '700' }]}>Resultado</Text>
            <Text style={[styles.formulaVal, { color: theme.colors.primary, fontWeight: '700' }]}>{formatResult(resultSeconds)}</Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Consejos</Text>
          {[
            'Ajusta la exposición base sin el filtro (ISO, apertura, velocidad). Luego añade el ND y aplica el tiempo calculado.',
            'En modo manual, pon el obturador en Bulb (B) y usa un disparador remoto con temporizador.',
            'Los filtros ND de rosca son más económicos. Los de sistema de láminas (NiSi, Lee) permiten apilar filtros.',
            'Enfoca y encuadra ANTES de poner el filtro ND: los ND oscuros hacen difícil ver a través del visor o pantalla.',
            'Los filtros ND pueden añadir una ligera dominante de color: corrige el WB en post o haz una toma de referencia.',
          ].map((tip) => <Text key={tip} style={styles.tip}>• {tip}</Text>)}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
