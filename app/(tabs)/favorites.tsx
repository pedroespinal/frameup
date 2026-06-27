import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal,
} from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { getFavorites, removeFavorite, updateFavoriteNotes, FavoriteConfig } from '@/utils/storage';
import { getSensorColor } from '@/data/cameras';

function createStyles(t: Theme) {
  return StyleSheet.create({
    list:       { padding: t.spacing.md },
    count:      { fontSize: 12, color: t.colors.textMuted, marginBottom: t.spacing.sm, fontWeight: '600' },
    card: {
      backgroundColor: t.colors.card, borderRadius: t.radius.lg,
      padding: t.spacing.md, marginBottom: t.spacing.sm,
      borderWidth: 1, borderColor: t.colors.border,
    },
    cardTop:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
    sceneEmoji: { fontSize: 30 },
    cardInfo:   { flex: 1 },
    sceneTitle: { fontSize: 15, fontWeight: '700', color: t.colors.text, marginBottom: 2 },
    cameraName: { fontSize: 12, color: t.colors.textSecondary, marginBottom: 6 },
    badges:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sensorBadge:{ borderRadius: t.radius.round, paddingHorizontal: 7, paddingVertical: 2 },
    sensorTxt:  { fontSize: 10, fontWeight: '700' },
    savedDate:  { fontSize: 10, color: t.colors.textMuted },
    deleteBtn:  { padding: t.spacing.xs },
    notesRow: {
      flexDirection: 'row', alignItems: 'flex-start', gap: 6,
      marginTop: 10, paddingTop: 10,
      borderTopWidth: 1, borderTopColor: t.colors.divider,
    },
    notesText:   { flex: 1, fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
    addNoteRow: {
      flexDirection: 'row', alignItems: 'center', gap: 5,
      marginTop: 10, paddingTop: 10,
      borderTopWidth: 1, borderTopColor: t.colors.divider,
    },
    addNoteText: { fontSize: 12, color: t.colors.textMuted },
    empty: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      padding: t.spacing.xl, backgroundColor: t.colors.background,
    },
    emptyEmoji:  { fontSize: 52, marginBottom: t.spacing.md },
    emptyTitle:  { fontSize: 20, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    emptyTxt: {
      fontSize: 14, color: t.colors.textSecondary, textAlign: 'center',
      lineHeight: 22, marginBottom: t.spacing.xl,
    },
    cta:         { backgroundColor: t.colors.primary, paddingHorizontal: 28, paddingVertical: 13, borderRadius: t.radius.round },
    ctaTxt:      { fontSize: 15, fontWeight: '700', color: '#000' },
    // Notes modal
    overlay:     { flex: 1, backgroundColor: '#00000080', justifyContent: 'flex-end' },
    sheet: {
      backgroundColor: t.colors.surface,
      borderTopLeftRadius: t.radius.xl, borderTopRightRadius: t.radius.xl,
      padding: t.spacing.lg, paddingBottom: 40,
    },
    nmHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.md },
    nmTitle:     { fontSize: 16, fontWeight: '700', color: t.colors.text, flex: 1 },
    nmInput: {
      backgroundColor: t.colors.card, borderRadius: t.radius.lg,
      padding: t.spacing.md, color: t.colors.text,
      fontSize: 14, lineHeight: 22,
      borderWidth: 1, borderColor: t.colors.border,
      minHeight: 120, textAlignVertical: 'top',
    },
    nmCounter:   { fontSize: 11, color: t.colors.textMuted, textAlign: 'right', marginTop: 4, marginBottom: t.spacing.md },
    nmActions:   { flexDirection: 'row', gap: t.spacing.sm },
    nmCancel:    { flex: 1, padding: t.spacing.md, borderRadius: t.radius.round, backgroundColor: t.colors.card, alignItems: 'center' },
    nmCancelTxt: { fontSize: 14, fontWeight: '600', color: t.colors.textSecondary },
    nmSave:      { flex: 2, padding: t.spacing.md, borderRadius: t.radius.round, backgroundColor: t.colors.primary, alignItems: 'center' },
    nmSaveTxt:   { fontSize: 14, fontWeight: '700', color: '#000' },
    flatBg:      { flex: 1, backgroundColor: t.colors.background },
  });
}

export default function FavoritesScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [favs, setFavs]             = useState<FavoriteConfig[]>([]);
  const [notesModal, setNotesModal] = useState<{ fav: FavoriteConfig; text: string } | null>(null);

  const load = useCallback(async () => { setFavs(await getFavorites()); }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const handleDelete = (fav: FavoriteConfig) => {
    Alert.alert('Eliminar favorito', `¿Eliminar ${fav.sceneTitle} — ${fav.cameraModel}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => { await removeFavorite(fav.id); load(); } },
    ]);
  };

  const handleSaveNotes = async () => {
    if (!notesModal) return;
    await updateFavoriteNotes(notesModal.fav.id, notesModal.text);
    await load();
    setNotesModal(null);
  };

  if (favs.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🔖</Text>
        <Text style={styles.emptyTitle}>Sin favoritos aún</Text>
        <Text style={styles.emptyTxt}>
          Cuando veas una configuración que te guste, presiona el ícono{' '}
          <Ionicons name="heart-outline" size={14} color={theme.colors.textSecondary} /> para guardarla aquí.
        </Text>
        <TouchableOpacity style={styles.cta} onPress={() => router.push('/(tabs)/index' as any)}>
          <Text style={styles.ctaTxt}>Explorar escenas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={favs}
        keyExtractor={(item) => item.id}
        style={styles.flatBg}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.count}>
            {favs.length} configuración{favs.length !== 1 ? 'es' : ''} guardada{favs.length !== 1 ? 's' : ''}
          </Text>
        }
        renderItem={({ item }) => {
          const sensorColor = getSensorColor(item.sensorType as any);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/settings/${item.sceneId}?cameraId=${item.cameraId}` as any)}
              activeOpacity={0.85}
            >
              <View style={styles.cardTop}>
                <Text style={styles.sceneEmoji}>{item.sceneEmoji}</Text>
                <View style={styles.cardInfo}>
                  <Text style={styles.sceneTitle}>{item.sceneTitle}</Text>
                  <Text style={styles.cameraName}>{item.cameraBrand} {item.cameraModel}</Text>
                  <View style={styles.badges}>
                    <View style={[styles.sensorBadge, { backgroundColor: sensorColor + '22' }]}>
                      <Text style={[styles.sensorTxt, { color: sensorColor }]}>{item.sensorType}</Text>
                    </View>
                    <Text style={styles.savedDate}>
                      {new Date(item.savedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Ionicons name="trash-outline" size={18} color={theme.colors.accent} />
                </TouchableOpacity>
              </View>
              {item.notes ? (
                <TouchableOpacity style={styles.notesRow} onPress={() => setNotesModal({ fav: item, text: item.notes ?? '' })}>
                  <Ionicons name="document-text-outline" size={14} color={theme.colors.primary} />
                  <Text style={styles.notesText} numberOfLines={2}>{item.notes}</Text>
                  <Ionicons name="pencil-outline" size={14} color={theme.colors.textMuted} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.addNoteRow} onPress={() => setNotesModal({ fav: item, text: '' })}>
                  <Ionicons name="add-circle-outline" size={14} color={theme.colors.textMuted} />
                  <Text style={styles.addNoteText}>Añadir nota</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 32 }} />}
      />

      <Modal visible={!!notesModal} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.nmHeader}>
              <Text style={styles.nmTitle}>Nota para {notesModal?.fav.sceneTitle}</Text>
              <TouchableOpacity onPress={() => setNotesModal(null)}>
                <Ionicons name="close" size={22} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.nmInput}
              value={notesModal?.text ?? ''}
              onChangeText={(t) => setNotesModal((prev) => prev ? { ...prev, text: t } : null)}
              placeholder="Ej: Usé ISO 3200 en la A7 IV, f/2 con el 35mm."
              placeholderTextColor={theme.colors.textMuted}
              multiline
              maxLength={500}
              autoFocus
            />
            <Text style={styles.nmCounter}>{(notesModal?.text ?? '').length}/500</Text>
            <View style={styles.nmActions}>
              <TouchableOpacity style={styles.nmCancel} onPress={() => setNotesModal(null)}>
                <Text style={styles.nmCancelTxt}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nmSave} onPress={handleSaveNotes}>
                <Text style={styles.nmSaveTxt}>Guardar nota</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
