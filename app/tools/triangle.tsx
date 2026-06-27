import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useState, useMemo } from 'react';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';

const APERTURES = [
  { label: 'f/1.0', value: 1.0 }, { label: 'f/1.2', value: 1.2 },
  { label: 'f/1.4', value: 1.4 }, { label: 'f/1.8', value: 1.8 },
  { label: 'f/2.0', value: 2.0 }, { label: 'f/2.8', value: 2.8 },
  { label: 'f/4.0', value: 4.0 }, { label: 'f/5.6', value: 5.6 },
  { label: 'f/8',   value: 8.0 }, { label: 'f/11',  value: 11 },
  { label: 'f/16',  value: 16  }, { label: 'f/22',  value: 22  },
];
const SHUTTERS = [
  { label: '30s', value: 30 }, { label: '15s', value: 15 }, { label: '8s', value: 8 },
  { label: '4s', value: 4 }, { label: '2s', value: 2 }, { label: '1s', value: 1 },
  { label: '1/2s', value: 0.5 }, { label: '1/4s', value: 0.25 },
  { label: '1/8s', value: 0.125 }, { label: '1/15s', value: 1/15 },
  { label: '1/30s', value: 1/30 }, { label: '1/60s', value: 1/60 },
  { label: '1/125s', value: 1/125 }, { label: '1/250s', value: 1/250 },
  { label: '1/500s', value: 1/500 }, { label: '1/1000s', value: 1/1000 },
  { label: '1/2000s', value: 1/2000 }, { label: '1/4000s', value: 1/4000 },
  { label: '1/8000s', value: 1/8000 },
];
const ISOS = [
  { label: 'ISO 50',    value: 50 },     { label: 'ISO 100',   value: 100 },
  { label: 'ISO 200',   value: 200 },    { label: 'ISO 400',   value: 400 },
  { label: 'ISO 800',   value: 800 },    { label: 'ISO 1600',  value: 1600 },
  { label: 'ISO 3200',  value: 3200 },   { label: 'ISO 6400',  value: 6400 },
  { label: 'ISO 12800', value: 12800 },  { label: 'ISO 25600', value: 25600 },
  { label: 'ISO 51200', value: 51200 },  { label: 'ISO 102400', value: 102400 },
];

function calcEV(a: number, t: number, s: number) {
  return Math.log2((a * a) / t) - Math.log2(s / 100);
}

function evInfo(ev: number) {
  if (ev < 0)  return { label: 'Muy oscuro',    color: '#546E7A', desc: 'Noche sin luna, interior muy tenue' };
  if (ev < 5)  return { label: 'Oscuro',        color: '#E57373', desc: 'Amanecer/ocaso, zona crepuscular' };
  if (ev < 10) return { label: 'Luz suave',     color: '#FFA726', desc: 'Días nublados, sombra brillante' };
  if (ev < 14) return { label: 'Luz de día',    color: '#E8A838', desc: 'Día parcialmente nublado' };
  if (ev < 16) return { label: 'Sol directo',   color: '#66BB6A', desc: 'Plena luz solar directa' };
  return         { label: 'Muy brillante',      color: '#4FC3F7', desc: 'Nieve/playa con sol intenso' };
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    evCard:     { backgroundColor: t.colors.card, borderRadius: t.radius.xl, padding: t.spacing.xl, alignItems: 'center', marginBottom: t.spacing.lg, borderWidth: 1 },
    evLabel:    { fontSize: 10, fontWeight: '700', letterSpacing: 2, color: t.colors.textMuted, textTransform: 'uppercase', marginBottom: 8 },
    evNum:      { fontSize: 56, fontWeight: '800', letterSpacing: -2, marginBottom: 12 },
    evBadge:    { borderRadius: t.radius.round, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 10 },
    evBadgeTxt: { fontSize: 13, fontWeight: '700' },
    evDesc:     { fontSize: 13, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 20 },
    info:       { flexDirection: 'row', gap: 8, backgroundColor: t.colors.surface, borderRadius: t.radius.md, padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.border },
    infoTxt:    { flex: 1, fontSize: 12, color: t.colors.textMuted, lineHeight: 18 },
    pickerWrap: { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.md, borderWidth: 1, borderColor: t.colors.border },
    pickerHead: { flexDirection: 'row', alignItems: 'center', marginBottom: t.spacing.sm, gap: 8 },
    pickerDot:  { width: 10, height: 10, borderRadius: 5 },
    pickerTitle:{ flex: 1, fontSize: 13, fontWeight: '700', color: t.colors.text, textTransform: 'uppercase', letterSpacing: 0.8 },
    pickerVal:  { fontSize: 18, fontWeight: '800' },
    pickerBtn:  { paddingHorizontal: 12, paddingVertical: 7, borderRadius: t.radius.sm, backgroundColor: t.colors.background, borderWidth: 1, borderColor: t.colors.border },
    pickerBtnTxt: { fontSize: 13, color: t.colors.textSecondary },
  });
}

function Picker({ title, color, items, idx, onChange }: {
  title: string; color: string;
  items: { label: string; value: number }[];
  idx: number; onChange: (i: number) => void;
}) {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.pickerWrap}>
      <View style={styles.pickerHead}>
        <View style={[styles.pickerDot, { backgroundColor: color }]} />
        <Text style={styles.pickerTitle}>{title}</Text>
        <Text style={[styles.pickerVal, { color }]}>{items[idx].label}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
        {items.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.pickerBtn, i === idx && { backgroundColor: color + '22', borderColor: color }]}
            onPress={() => onChange(i)}
          >
            <Text style={[styles.pickerBtnTxt, i === idx && { color, fontWeight: '700' }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function TriangleScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [ai, setAi] = useState(5);
  const [si, setSi] = useState(10);
  const [ii, setIi] = useState(3);

  const ev   = useMemo(() => calcEV(APERTURES[ai].value, SHUTTERS[si].value, ISOS[ii].value), [ai, si, ii]);
  const info = useMemo(() => evInfo(ev), [ev]);

  return (
    <>
      <Stack.Screen options={{ title: 'Triángulo de Exposición' }} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.evCard, { borderColor: info.color + '60' }]}>
          <Text style={styles.evLabel}>VALOR DE EXPOSICIÓN</Text>
          <Text style={[styles.evNum, { color: info.color }]}>EV {ev >= 0 ? '+' : ''}{ev.toFixed(1)}</Text>
          <View style={[styles.evBadge, { backgroundColor: info.color + '22' }]}>
            <Text style={[styles.evBadgeTxt, { color: info.color }]}>{info.label}</Text>
          </View>
          <Text style={styles.evDesc}>{info.desc}</Text>
        </View>
        <Picker title="Apertura"                  color={theme.colors.primary}   items={APERTURES} idx={ai} onChange={setAi} />
        <Picker title="Velocidad de Obturación"   color={theme.colors.secondary} items={SHUTTERS}  idx={si} onChange={setSi} />
        <Picker title="ISO"                       color="#CE93D8"                items={ISOS}      idx={ii} onChange={setIi} />
        <View style={styles.info}>
          <Ionicons name="information-circle-outline" size={15} color={theme.colors.textMuted} />
          <Text style={styles.infoTxt}>Cambiar un parámetro afecta los otros dos. Un stop = doble de luz.</Text>
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
