import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { Stack } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { calcDOF, formatDistance, FOCAL_LENGTHS, APERTURES_DOF, DISTANCES_M } from '@/utils/dof';
import { SensorType } from '@/data/cameras';

const SENSORS: Array<{ id: SensorType; label: string; color: string }> = [
  { id: 'medium-format',     label: 'Formato Medio', color: '#CE93D8' },
  { id: 'full-frame',        label: 'Full Frame',    color: '#E8A838' },
  { id: 'aps-c',             label: 'APS-C',         color: '#4FC3F7' },
  { id: 'micro-four-thirds', label: 'Micro 4/3',     color: '#66BB6A' },
];

function createStyles(t: Theme) {
  return StyleSheet.create({
    resultCard:       { backgroundColor: t.colors.card, borderRadius: t.radius.xl, padding: t.spacing.xl, alignItems: 'center', marginBottom: t.spacing.lg, borderWidth: 1 },
    resultLabel:      { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: t.colors.textMuted, textTransform: 'uppercase', marginBottom: 8 },
    resultMain:       { fontSize: 48, fontWeight: '800', letterSpacing: -1, marginBottom: 10 },
    badge:            { borderRadius: t.radius.round, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 16 },
    badgeTxt:         { fontSize: 13, fontWeight: '700' },
    resultGrid:       { flexDirection: 'row', width: '100%' },
    resultCell:       { flex: 1, alignItems: 'center' },
    resultDivider:    { width: 1, backgroundColor: t.colors.divider },
    resultCellLabel:  { fontSize: 10, color: t.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    resultCellValue:  { fontSize: 15, fontWeight: '800', color: t.colors.text },
    sectionLabel:     { fontSize: 13, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginTop: t.spacing.md },
    sectionValue:     { color: t.colors.text, textTransform: 'none', letterSpacing: 0 },
    sensorRow:        { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
    sensorBtn:        { paddingHorizontal: 12, paddingVertical: 7, borderRadius: t.radius.sm, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
    sensorTxt:        { fontSize: 12, color: t.colors.textSecondary, fontWeight: '600' },
    chip:             { paddingHorizontal: 12, paddingVertical: 7, borderRadius: t.radius.sm, backgroundColor: t.colors.card, borderWidth: 1, borderColor: t.colors.border },
    chipActive:       { backgroundColor: t.colors.primary + '22', borderColor: t.colors.primary },
    chipTxt:          { fontSize: 13, color: t.colors.textSecondary },
    chipTxtActive:    { color: t.colors.primary, fontWeight: '700' },
    infoBox:          { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginTop: t.spacing.lg, borderWidth: 1, borderColor: t.colors.border },
    infoTitle:        { fontSize: 13, fontWeight: '700', color: t.colors.text, marginBottom: 6 },
    infoTxt:          { fontSize: 13, color: t.colors.textSecondary, lineHeight: 20 },
  });
}

function PickerRow<T>({ items, selected, onSelect, label, styles }: {
  items: T[]; selected: T; onSelect: (v: T) => void;
  label: (v: T) => string;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
      {items.map((item) => {
        const active = item === selected;
        return (
          <TouchableOpacity key={String(item)} style={[styles.chip, active && styles.chipActive]} onPress={() => onSelect(item)}>
            <Text style={[styles.chipTxt, active && styles.chipTxtActive]}>{label(item)}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default function DOFScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [focal,    setFocal]    = useState(50);
  const [aperture, setAperture] = useState(2.8);
  const [distance, setDistance] = useState(3);
  const [sensor,   setSensor]   = useState<SensorType>('full-frame');

  const result     = useMemo(() => calcDOF(focal, aperture, distance, sensor), [focal, aperture, distance, sensor]);
  const sensorInfo = SENSORS.find((s) => s.id === sensor)!;
  const focalEquiv = sensor === 'full-frame' ? focal
    : sensor === 'aps-c' ? Math.round(focal * 1.5)
    : sensor === 'micro-four-thirds' ? focal * 2
    : Math.round(focal * 0.79);

  return (
    <>
      <Stack.Screen options={{ title: 'Profundidad de Campo' }} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.resultCard, { borderColor: sensorInfo.color + '60' }]}>
          <Text style={styles.resultLabel}>PROFUNDIDAD DE CAMPO</Text>
          <Text style={[styles.resultMain, { color: sensorInfo.color }]}>
            {result.isInfinite ? '∞ Infinita' : formatDistance(result.totalDOF)}
          </Text>
          <View style={[styles.badge, { backgroundColor: sensorInfo.color + '22' }]}>
            <Text style={[styles.badgeTxt, { color: sensorInfo.color }]}>{result.depthLabel}</Text>
          </View>
          <View style={styles.resultGrid}>
            <View style={styles.resultCell}>
              <Text style={styles.resultCellLabel}>Foco cercano</Text>
              <Text style={styles.resultCellValue}>{formatDistance(result.nearLimit)}</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultCell}>
              <Text style={styles.resultCellLabel}>Foco lejano</Text>
              <Text style={styles.resultCellValue}>{formatDistance(result.farLimit)}</Text>
            </View>
            <View style={styles.resultDivider} />
            <View style={styles.resultCell}>
              <Text style={styles.resultCellLabel}>Hiperfocal</Text>
              <Text style={styles.resultCellValue}>{formatDistance(result.hyperfocal)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Sensor</Text>
        <View style={styles.sensorRow}>
          {SENSORS.map((sen) => (
            <TouchableOpacity
              key={sen.id}
              style={[styles.sensorBtn, sensor === sen.id && { backgroundColor: sen.color + '22', borderColor: sen.color }]}
              onPress={() => setSensor(sen.id)}
            >
              <Text style={[styles.sensorTxt, sensor === sen.id && { color: sen.color, fontWeight: '700' }]}>{sen.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>
          Focal: <Text style={styles.sectionValue}>{focal}mm{sensor !== 'full-frame' ? ` (${focalEquiv}mm equiv.)` : ''}</Text>
        </Text>
        <PickerRow items={FOCAL_LENGTHS} selected={focal} onSelect={setFocal} label={(v) => `${v}mm`} styles={styles} />

        <Text style={[styles.sectionLabel, { marginTop: theme.spacing.md }]}>
          Apertura: <Text style={styles.sectionValue}>f/{aperture}</Text>
        </Text>
        <PickerRow items={APERTURES_DOF} selected={aperture} onSelect={setAperture} label={(v) => `f/${v}`} styles={styles} />

        <Text style={[styles.sectionLabel, { marginTop: theme.spacing.md }]}>
          Distancia al sujeto: <Text style={styles.sectionValue}>{formatDistance(distance)}</Text>
        </Text>
        <PickerRow items={DISTANCES_M} selected={distance} onSelect={setDistance} label={formatDistance} styles={styles} />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>¿Qué es la distancia hiperfocal?</Text>
          <Text style={styles.infoTxt}>
            Si enfocas exactamente a {formatDistance(result.hyperfocal)}, todo desde{' '}
            {formatDistance(result.hyperfocal / 2)} hasta el infinito estará en foco. Clave para fotografía de paisaje y astro.
          </Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
