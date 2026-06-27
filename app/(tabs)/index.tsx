import {
  View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity,
} from 'react-native';
import { useState, useMemo, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { scenes, searchScenes, Scene, getDifficultyColor } from '@/data/scenes';
import {
  getSearchHistory, addSearchHistory,
  removeSearchHistoryItem, clearSearchHistory,
} from '@/utils/storage';

const SUGGESTED_QUERIES = [
  'fotos de noche con luna', 'vía láctea', 'retrato atardecer',
  'deportes acción', 'cascadas agua', 'fuegos artificiales',
  'tráfico nocturno', 'ciudad de noche',
];

const FEATURED_IDS = [
  'astrofotografia', 'hora-dorada-retrato', 'luna-paisaje', 'fotografia-nocturna-urbana',
];

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:   { flex: 1, backgroundColor: t.colors.background },
    scroll:      { paddingHorizontal: t.spacing.md, paddingTop: t.spacing.lg },
    hero:        { marginBottom: t.spacing.lg },
    heroTitle:   { fontSize: 34, fontWeight: '800', letterSpacing: -1, marginBottom: 4 },
    heroAccent:  { color: t.colors.primary },
    heroWhite:   { color: t.colors.text },
    heroSub:     { fontSize: 15, color: t.colors.textSecondary, lineHeight: 22 },
    searchContainer: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: t.colors.card,
      borderRadius: t.radius.lg,
      paddingHorizontal: t.spacing.md, paddingVertical: 12,
      marginBottom: t.spacing.lg,
      borderWidth: 1, borderColor: t.colors.border,
    },
    searchIcon:  { marginRight: t.spacing.sm },
    searchInput: { flex: 1, fontSize: 16, color: t.colors.text, padding: 0 },
    rowHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.sm },
    clearLink:   { fontSize: 12, color: t.colors.primary, fontWeight: '600' },
    sectionTitle: {
      fontSize: 11, fontWeight: '700', color: t.colors.textMuted,
      textTransform: 'uppercase', letterSpacing: 1.2,
      marginBottom: t.spacing.sm,
    },
    chipRow:  { paddingBottom: t.spacing.md, gap: t.spacing.sm },
    chip: {
      backgroundColor: t.colors.card, borderRadius: t.radius.round,
      paddingHorizontal: t.spacing.md, paddingVertical: 7,
      borderWidth: 1, borderColor: t.colors.border,
    },
    chipText: { fontSize: 13, color: t.colors.textSecondary, fontWeight: '500' },
    historyChip: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: t.colors.primary + '18',
      borderRadius: t.radius.round,
      paddingHorizontal: 12, paddingVertical: 7,
      borderWidth: 1, borderColor: t.colors.primary + '40',
    },
    historyChipText: { fontSize: 13, color: t.colors.primary, fontWeight: '500' },
    featuredGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: t.spacing.sm, marginBottom: t.spacing.md },
    featuredCard: { width: '48.5%', borderRadius: t.radius.lg, padding: t.spacing.md, minHeight: 148, justifyContent: 'flex-end' },
    featuredEmoji: { fontSize: 34, marginBottom: t.spacing.xs },
    featuredTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 2 },
    featuredSub:   { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginBottom: 8 },
    difficultyBadge: { alignSelf: 'flex-start', borderRadius: t.radius.round, paddingHorizontal: 8, paddingVertical: 2 },
    difficultyText:  { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    allScenesBtn: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      gap: t.spacing.xs, paddingVertical: t.spacing.md,
      borderRadius: t.radius.lg, borderWidth: 1,
      borderColor: t.colors.primary + '40', marginBottom: t.spacing.md,
    },
    allScenesBtnText: { fontSize: 14, fontWeight: '600', color: t.colors.primary },
    resultsLabel: { fontSize: 13, color: t.colors.textMuted, marginBottom: t.spacing.sm },
    resultCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: t.colors.card, borderRadius: t.radius.lg,
      padding: t.spacing.md, marginBottom: t.spacing.sm,
      borderWidth: 1, borderColor: t.colors.border, gap: t.spacing.md,
    },
    resultEmoji:    { width: 52, height: 52, borderRadius: t.radius.md, alignItems: 'center', justifyContent: 'center' },
    resultEmojiText:{ fontSize: 26 },
    resultInfo:     { flex: 1 },
    resultTitle:    { fontSize: 15, fontWeight: '700', color: t.colors.text, marginBottom: 2 },
    resultSub:      { fontSize: 12, color: t.colors.textSecondary, marginBottom: 6 },
    resultTags:     { flexDirection: 'row', gap: 4, flexWrap: 'wrap' },
    resultTag:      { backgroundColor: t.colors.background, borderRadius: t.radius.round, paddingHorizontal: 6, paddingVertical: 2 },
    resultTagText:  { fontSize: 10, color: t.colors.textMuted },
    emptyState:     { alignItems: 'center', paddingVertical: t.spacing.xxl },
    emptyEmoji:     { fontSize: 48, marginBottom: t.spacing.md },
    emptyTitle:     { fontSize: 18, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    emptyText:      { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [query, setQuery]     = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const loadHistory = useCallback(async () => {
    setHistory(await getSearchHistory());
  }, []);

  useFocusEffect(useCallback(() => { loadHistory(); }, [loadHistory]));

  const results  = useMemo(() => searchScenes(query), [query]);
  const featured = useMemo(() => scenes.filter((s) => FEATURED_IDS.includes(s.id)), []);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.trim().length >= 2) await addSearchHistory(q.trim());
  };

  const handleRemoveHistory = async (q: string) => {
    await removeSearchHistoryItem(q);
    await loadHistory();
  };

  const handleClearHistory = async () => {
    await clearSearchHistory();
    await loadHistory();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            <Text style={styles.heroAccent}>Frame</Text>
            <Text style={styles.heroWhite}>Up</Text>
          </Text>
          <Text style={styles.heroSub}>Configura tu cámara perfectamente para cada situación</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={theme.colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="¿Qué quieres fotografiar?"
            placeholderTextColor={theme.colors.textMuted}
            value={query}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {query.length === 0 ? (
          <>
            {history.length > 0 && (
              <>
                <View style={styles.rowHeader}>
                  <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
                  <TouchableOpacity onPress={handleClearHistory}>
                    <Text style={styles.clearLink}>Borrar</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
                  {history.map((h) => (
                    <View key={h} style={styles.historyChip}>
                      <TouchableOpacity onPress={() => setQuery(h)}>
                        <Text style={styles.historyChipText}>{h}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemoveHistory(h)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                        <Ionicons name="close" size={13} color={theme.colors.textMuted} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <Text style={styles.sectionTitle}>Búsquedas sugeridas</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {SUGGESTED_QUERIES.map((q) => (
                <TouchableOpacity key={q} style={styles.chip} onPress={() => setQuery(q)}>
                  <Text style={styles.chipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Escenas destacadas</Text>
            <View style={styles.featuredGrid}>
              {featured.map((scene) => (
                <TouchableOpacity
                  key={scene.id}
                  style={[styles.featuredCard, { backgroundColor: scene.color, borderLeftColor: scene.accent, borderLeftWidth: 3 }]}
                  onPress={() => router.push(`/settings/${scene.id}` as any)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.featuredEmoji}>{scene.emoji}</Text>
                  <Text style={styles.featuredTitle}>{scene.title}</Text>
                  <Text style={styles.featuredSub}>{scene.subtitle}</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(scene.difficulty) + '33' }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(scene.difficulty) }]}>
                      {scene.difficulty}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.allScenesBtn} onPress={() => router.push('/(tabs)/scenes' as any)}>
              <Ionicons name="images-outline" size={16} color={theme.colors.primary} />
              <Text style={styles.allScenesBtnText}>Ver todas las {scenes.length} escenas</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.resultsLabel}>
              {results.length > 0
                ? `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`
                : `Sin resultados para "${query}"`}
            </Text>
            {results.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>📷</Text>
                <Text style={styles.emptyTitle}>Sin resultados</Text>
                <Text style={styles.emptyText}>Prueba con: "noche", "retrato", "acción", "macro", "bodas"...</Text>
              </View>
            )}
            {results.map((scene) => (
              <TouchableOpacity
                key={scene.id}
                style={styles.resultCard}
                onPress={() => router.push(`/settings/${scene.id}` as any)}
                activeOpacity={0.85}
              >
                <View style={[styles.resultEmoji, { backgroundColor: scene.accent + '22', borderLeftColor: scene.accent, borderLeftWidth: 2 }]}>
                  <Text style={styles.resultEmojiText}>{scene.emoji}</Text>
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{scene.title}</Text>
                  <Text style={styles.resultSub}>{scene.subtitle}</Text>
                  <View style={styles.resultTags}>
                    {scene.tags.slice(0, 3).map((tag) => (
                      <View key={tag} style={styles.resultTag}>
                        <Text style={styles.resultTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}
