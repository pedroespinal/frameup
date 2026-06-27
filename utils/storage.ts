import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteConfig {
  id: string;               // sceneId + '_' + cameraId
  sceneId: string;
  sceneTitle: string;
  sceneEmoji: string;
  cameraId: string;
  cameraBrand: string;
  cameraModel: string;
  sensorType: string;
  savedAt: number;          // timestamp
  notes?: string;           // notas personales opcionales
}

const FAV_KEY     = 'frameup_favorites';
const HISTORY_KEY = 'frameup_search_history';
const MAX_HISTORY = 10;

// ─── FAVORITES ────────────────────────────────────────────────

export const getFavorites = async (): Promise<FavoriteConfig[]> => {
  try {
    const raw = await AsyncStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveFavorite = async (fav: Omit<FavoriteConfig, 'id' | 'savedAt'>): Promise<void> => {
  const existing = await getFavorites();
  const id = `${fav.sceneId}_${fav.cameraId}`;
  const prev = existing.find((f) => f.id === id);
  const filtered = existing.filter((f) => f.id !== id);
  const updated = [{ ...prev, ...fav, id, savedAt: Date.now() }, ...filtered];
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated));
};

export const updateFavoriteNotes = async (id: string, notes: string): Promise<void> => {
  const existing = await getFavorites();
  const updated = existing.map((f) => f.id === id ? { ...f, notes } : f);
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(updated));
};

export const removeFavorite = async (id: string): Promise<void> => {
  const existing = await getFavorites();
  await AsyncStorage.setItem(FAV_KEY, JSON.stringify(existing.filter((f) => f.id !== id)));
};

export const isFavorite = async (sceneId: string, cameraId: string): Promise<boolean> => {
  const existing = await getFavorites();
  return existing.some((f) => f.id === `${sceneId}_${cameraId}`);
};

// ─── SEARCH HISTORY ──────────────────────────────────────────

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addSearchHistory = async (query: string): Promise<void> => {
  const q = query.trim();
  if (!q || q.length < 2) return;
  const existing = await getSearchHistory();
  const filtered = existing.filter((h) => h.toLowerCase() !== q.toLowerCase());
  const updated = [q, ...filtered].slice(0, MAX_HISTORY);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const removeSearchHistoryItem = async (query: string): Promise<void> => {
  const existing = await getSearchHistory();
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(existing.filter((h) => h !== query)));
};

export const clearSearchHistory = async (): Promise<void> => {
  await AsyncStorage.removeItem(HISTORY_KEY);
};
