import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import {
  scenes, Scene, SceneCategory,
  getCategoryLabel, getDifficultyColor, getDifficultyLabel,
} from '@/data/scenes';

const CATEGORIES: Array<{ id: SceneCategory | 'all'; label: string; emoji: string }> = [
  { id: 'all',           label: 'Todas',   emoji: '📷' },
  { id: 'noche',         label: 'Noche',   emoji: '🌙' },
  { id: 'paisaje',       label: 'Paisaje', emoji: '🏔️' },
  { id: 'retrato',       label: 'Retrato', emoji: '🧑' },
  { id: 'accion',        label: 'Acción',  emoji: '⚡' },
  { id: 'evento',        label: 'Eventos', emoji: '💍' },
  { id: 'macro',         label: 'Macro',   emoji: '🌿' },
  { id: 'calle',         label: 'Calle',   emoji: '🏙️' },
  { id: 'arquitectura',  label: 'Arq.',    emoji: '🏛️' },
];

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:        { flex: 1, backgroundColor: t.colors.background },
    categoryRow:      { paddingHorizontal: t.spacing.md, paddingVertical: t.spacing.sm, gap: t.spacing.xs },
    categoryChip: {
      flexDirection: 'row', alignItems: 'center', gap: 4,
      paddingHorizontal: 12, paddingVertical: 7,
      borderRadius: t.radius.round,
      backgroundColor: t.colors.card,
      borderWidth: 1, borderColor: t.colors.border,
    },
    categoryChipActive: { backgroundColor: t.colors.primary, borderColor: t.colors.primary },
    categoryEmoji:      { fontSize: 14 },
    categoryLabel:      { fontSize: 12, fontWeight: '600', color: t.colors.textSecondary },
    categoryLabelActive:{ color: '#000' },
    grid:   { paddingHorizontal: t.spacing.md, paddingTop: t.spacing.sm },
    row:    { gap: t.spacing.sm, marginBottom: t.spacing.sm },
    card:   { flex: 1, borderRadius: t.radius.lg, padding: t.spacing.md, minHeight: 160, justifyContent: 'flex-end' },
    cardEmoji:   { fontSize: 32, marginBottom: t.spacing.xs },
    cardTitle:   { fontSize: 15, fontWeight: '700', color: '#FFF', marginBottom: 2 },
    cardSub:     { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 8 },
    cardFooter:  { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    diffBadge:   { borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2 },
    diffText:    { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    tripodBadge: { borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.15)' },
    tripodText:  { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.3 },
  });
}

export default function ScenesScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [activeCategory, setActiveCategory] = useState<SceneCategory | 'all'>('all');

  const filtered = activeCategory === 'all' ? scenes : scenes.filter((s) => s.category === activeCategory);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, active && styles.categoryChipActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={[styles.categoryLabel, active && styles.categoryLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color, borderLeftColor: item.accent, borderLeftWidth: 3 }]}
            onPress={() => router.push(`/settings/${item.id}` as any)}
            activeOpacity={0.82}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>{item.subtitle}</Text>
            <View style={styles.cardFooter}>
              <View style={[styles.diffBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '33' }]}>
                <Text style={[styles.diffText, { color: getDifficultyColor(item.difficulty) }]}>
                  {getDifficultyLabel(item.difficulty)}
                </Text>
              </View>
              {item.tripodRequired && (
                <View style={styles.tripodBadge}>
                  <Text style={styles.tripodText}>Trípode</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />
    </View>
  );
}
