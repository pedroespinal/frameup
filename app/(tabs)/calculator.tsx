import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';

function createStyles(t: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    content:   { padding: t.spacing.md },
    intro:     { fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: t.spacing.lg },
    card: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: t.colors.card,
      borderRadius: t.radius.lg,
      padding: t.spacing.md,
      marginBottom: t.spacing.sm,
      borderWidth: 1, borderColor: t.colors.border,
      gap: 14,
    },
    iconBox: { width: 52, height: 52, borderRadius: t.radius.md, alignItems: 'center', justifyContent: 'center' },
    emoji:   { fontSize: 24, fontWeight: '800' },
    info:    { flex: 1 },
    title:   { fontSize: 15, fontWeight: '700', color: t.colors.text, marginBottom: 3 },
    desc:    { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
  });
}

export default function ToolsHubScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const TOOLS = [
    {
      route: '/tools/triangle',
      emoji: '📐',
      title: 'Triángulo de Exposición',
      desc: 'Calcula el EV y entiende la relación entre apertura, velocidad e ISO.',
      color: theme.colors.primary,
    },
    {
      route: '/tools/dof',
      emoji: '🔭',
      title: 'Profundidad de Campo',
      desc: 'Calcula DOF, límites de foco e hiperfocal según tu focal, apertura y distancia.',
      color: theme.colors.secondary,
    },
    {
      route: '/tools/nd-timer',
      emoji: '⏱️',
      title: 'Calculadora ND',
      desc: 'Calcula el tiempo de exposición correcto al añadir filtros ND de 1 a 11+ paradas.',
      color: '#4DB6AC',
    },
    {
      route: '/tools/my-lens',
      emoji: '🎯',
      title: 'Mi Lente',
      desc: 'Selecciona tu lente y descubre escenas ideales + configuración óptima.',
      color: '#66BB6A',
    },
    {
      route: '/tools/lens',
      emoji: '🔍',
      title: 'Asesor de Lentes',
      desc: 'Encuentra el lente ideal para tu sistema y tipo de fotografía con equivalencias.',
      color: '#CE93D8',
    },
    {
      route: '/tools/exif',
      emoji: '📊',
      title: 'Lector EXIF',
      desc: 'Sube una foto y FrameUp explica cada ajuste que usó la cámara y por qué.',
      color: '#FF8A65',
    },
    {
      route: '/tools/my-gear',
      emoji: '🎒',
      title: 'Mi Equipo',
      desc: 'Guarda tu cámara y lentes habituales para ajustes siempre personalizados.',
      color: '#FFB74D',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.intro}>Herramientas técnicas para dominar cada aspecto de la fotografía.</Text>
      {TOOLS.map((tool) => (
        <TouchableOpacity
          key={tool.route}
          style={styles.card}
          onPress={() => router.push(tool.route as any)}
          activeOpacity={0.82}
        >
          <View style={[styles.iconBox, { backgroundColor: tool.color + '20' }]}>
            <Text style={[styles.emoji, { color: tool.color }]}>{tool.emoji}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{tool.title}</Text>
            <Text style={styles.desc}>{tool.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
        </TouchableOpacity>
      ))}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
