import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useState, useEffect, useCallback, useMemo } from 'react';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import SunCalc from 'suncalc';

type SunEvent = { key: string; label: string; icon: string; color: string; time: Date | null; desc: string };
type DayEntry  = { date: Date; label: string; goldenMorning: Date | null; goldenEvening: Date | null; sunset: Date | null; sunrise: Date | null };

function formatTime(d: Date | null): string {
  if (!d) return '--:--';
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getDayLabel(date: Date): string {
  const today = new Date();
  const diff = Math.round((date.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getCountdown(target: Date | null): string {
  if (!target) return '';
  const diff = target.getTime() - Date.now();
  if (diff < 0) return 'Pasado';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 0) return `en ${h}h ${m}m`;
  if (m > 0) return `en ${m} min`;
  return 'ahora';
}

function getSunEvents(lat: number, lng: number, date: Date): SunEvent[] {
  const times = SunCalc.getTimes(date, lat, lng);
  return [
    { key: 'nauticalDawn', label: 'Hora Azul (mañana)',    icon: 'moon',                color: '#5C6BC0', time: times.nauticalDawn,    desc: 'Luz azul suave antes del amanecer. Perfecta para arquitectura y paisaje urbano.' },
    { key: 'goldenHourEnd', label: 'Hora Dorada (mañana)', icon: 'sunny',               color: '#FFA726', time: times.goldenHourEnd,    desc: 'Últimos minutos de luz dorada matutina. Ideal para retratos y paisajes.' },
    { key: 'solarNoon',    label: 'Mediodía solar',         icon: 'sunny-outline',       color: '#FFEE58', time: times.solarNoon,        desc: 'El sol está en su punto más alto. Luz dura, evitar retratos en exterior.' },
    { key: 'goldenHour',   label: 'Hora Dorada (tarde)',    icon: 'sunny',               color: '#F5A623', time: times.goldenHour,       desc: 'La luz más cálida y hermosa del día. Retratos, paisaje, arquitectura.' },
    { key: 'sunset',       label: 'Puesta de sol',          icon: 'partly-sunny',        color: '#FF7043', time: times.sunset,           desc: 'El momento del sol en el horizonte. Siluetas y colores dramáticos.' },
    { key: 'dusk',         label: 'Hora Azul (tarde)',      icon: 'partly-sunny-outline', color: '#7986CB', time: times.dusk,            desc: 'Cielo azul profundo justo después del atardecer. Perfecta para cityscape.' },
    { key: 'night',        label: 'Noche astronómica',      icon: 'star',                color: '#42A5F5', time: times.night,            desc: 'Oscuridad total. Astrofotografía y vía láctea si el cielo está despejado.' },
  ];
}

function get7DaySummary(lat: number, lng: number): DayEntry[] {
  const result: DayEntry[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const t = SunCalc.getTimes(date, lat, lng);
    result.push({ date, label: getDayLabel(date), goldenMorning: t.goldenHourEnd, goldenEvening: t.goldenHour, sunset: t.sunset, sunrise: t.sunrise });
  }
  return result;
}

function nextUpcomingEvent(events: SunEvent[]): SunEvent | null {
  const now = Date.now();
  const future = events.filter((e) => e.time && e.time.getTime() > now);
  if (!future.length) return null;
  return future.reduce((a, b) => a.time!.getTime() < b.time!.getTime() ? a : b);
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:    { flex: 1, backgroundColor: t.colors.background },
    content:      { padding: t.spacing.md },
    locationRow: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: t.colors.card, borderRadius: t.radius.md,
      padding: t.spacing.sm + 4, marginBottom: t.spacing.md,
      borderWidth: 1, borderColor: t.colors.border,
    },
    locationText: { flex: 1, fontSize: 13, color: t.colors.textSecondary, fontWeight: '500' },
    refreshBtn:   { padding: 4 },
    loadingBox:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, paddingVertical: t.spacing.xl },
    loadingText:  { fontSize: 14, color: t.colors.textSecondary },
    errorBox: {
      backgroundColor: t.colors.accent + '15', borderRadius: t.radius.lg,
      padding: t.spacing.md, borderWidth: 1, borderColor: t.colors.accent + '40',
      alignItems: 'center', gap: 8,
    },
    errorText:    { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center' },
    retryBtn:     { paddingHorizontal: 20, paddingVertical: 8, backgroundColor: t.colors.accent, borderRadius: t.radius.round },
    retryText:    { color: '#fff', fontWeight: '700', fontSize: 13 },
    nextCard: {
      flexDirection: 'row', gap: t.spacing.md,
      backgroundColor: t.colors.card, borderRadius: t.radius.xl,
      padding: t.spacing.lg, marginBottom: t.spacing.lg,
      borderWidth: 1, alignItems: 'flex-start',
    },
    nextIcon:     { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
    nextInfo:     { flex: 1 },
    nextLabel:    { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: t.colors.textMuted, textTransform: 'uppercase', marginBottom: 2 },
    nextName:     { fontSize: 18, fontWeight: '800', color: t.colors.text, marginBottom: 4 },
    nextTime:     { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    nextDesc:     { fontSize: 12, color: t.colors.textSecondary, lineHeight: 18 },
    sectionTitle: { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: t.spacing.sm },
    eventRow: {
      flexDirection: 'row', alignItems: 'center', gap: 12,
      backgroundColor: t.colors.card, borderRadius: t.radius.md,
      padding: t.spacing.sm + 4, marginBottom: 6,
      borderWidth: 1, borderColor: t.colors.border,
    },
    eventPast:    { opacity: 0.4 },
    eventIconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    eventInfo:    { flex: 1 },
    eventLabel:   { fontSize: 13, fontWeight: '700', color: t.colors.text, marginBottom: 1 },
    eventDesc:    { fontSize: 11, color: t.colors.textSecondary },
    textPast:     { color: t.colors.textMuted },
    eventTimeBox: { alignItems: 'flex-end' },
    eventTime:    { fontSize: 15, fontWeight: '800' },
    eventCountdown: { fontSize: 11, color: t.colors.textMuted, marginTop: 1 },
    dayRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: t.colors.card, borderRadius: t.radius.md,
      padding: t.spacing.sm + 4, marginBottom: 4,
      borderWidth: 1, borderColor: t.colors.border,
    },
    dayLabel:     { flex: 1, fontSize: 13, fontWeight: '600', color: t.colors.text },
    dayTimes:     { flexDirection: 'row', gap: 12 },
    dayTime:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
    dayTimeText:  { fontSize: 12, color: t.colors.textSecondary, fontWeight: '500' },
    legend:       { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: t.spacing.sm, padding: t.spacing.sm },
    legendItem:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
    legendText:   { fontSize: 11, color: t.colors.textMuted },
  });
}

export default function GoldenHourScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [coords, setCoords]           = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const loadLocation = useCallback(async () => {
    setLoading(true);
    setError('');
    const timeout = setTimeout(() => {
      setLoading(false);
      setError('Tiempo de espera agotado. Activa el permiso de ubicación en Ajustes y toca Reintentar.');
    }, 15000);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        clearTimeout(timeout);
        setError('Permiso de ubicación denegado. Actívalo en Ajustes y toca Reintentar.');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      clearTimeout(timeout);
      setCoords({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      try {
        const [geo] = await Location.reverseGeocodeAsync({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        setLocationName(geo ? `${geo.city ?? geo.region}, ${geo.country}` : '');
      } catch {
        setLocationName(`${loc.coords.latitude.toFixed(2)}°, ${loc.coords.longitude.toFixed(2)}°`);
      }
    } catch {
      clearTimeout(timeout);
      setError('No se pudo obtener la ubicación. Intenta de nuevo.');
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadLocation(); }, [loadLocation]);

  const today  = new Date();
  const events = coords ? getSunEvents(coords.lat, coords.lng, today) : [];
  const next   = coords ? nextUpcomingEvent(events) : null;
  const week   = coords ? get7DaySummary(coords.lat, coords.lng) : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.locationRow}>
        <Ionicons name="location" size={14} color={theme.colors.primary} />
        <Text style={styles.locationText} numberOfLines={1}>
          {loading ? 'Obteniendo ubicación...' : locationName || 'Toca para actualizar'}
        </Text>
        <TouchableOpacity onPress={loadLocation} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator color={theme.colors.primary} />
          <Text style={styles.loadingText}>Calculando horas de luz...</Text>
        </View>
      )}

      {error !== '' && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={20} color={theme.colors.accent} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadLocation} style={styles.retryBtn}>
            <Text style={styles.retryText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}

      {coords && !loading && (
        <>
          {next && (
            <View style={[styles.nextCard, { borderColor: next.color + '60' }]}>
              <View style={[styles.nextIcon, { backgroundColor: next.color + '22' }]}>
                <Ionicons name={next.icon as any} size={28} color={next.color} />
              </View>
              <View style={styles.nextInfo}>
                <Text style={styles.nextLabel}>Próximo evento</Text>
                <Text style={styles.nextName}>{next.label}</Text>
                <Text style={[styles.nextTime, { color: next.color }]}>
                  {formatTime(next.time)} — {getCountdown(next.time)}
                </Text>
                <Text style={styles.nextDesc}>{next.desc}</Text>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>
            Hoy — {today.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
          {events.map((ev) => (
            <View key={ev.key} style={[styles.eventRow, ev.time && ev.time.getTime() < Date.now() && styles.eventPast]}>
              <View style={[styles.eventIconBox, { backgroundColor: ev.color + '22' }]}>
                <Ionicons name={ev.icon as any} size={20} color={ev.color} />
              </View>
              <View style={styles.eventInfo}>
                <Text style={[styles.eventLabel, ev.time && ev.time.getTime() < Date.now() && styles.textPast]}>{ev.label}</Text>
                <Text style={styles.eventDesc}>{ev.desc}</Text>
              </View>
              <View style={styles.eventTimeBox}>
                <Text style={[styles.eventTime, { color: ev.color }]}>{formatTime(ev.time)}</Text>
                {ev.time && ev.time.getTime() > Date.now() && (
                  <Text style={styles.eventCountdown}>{getCountdown(ev.time)}</Text>
                )}
              </View>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: theme.spacing.lg }]}>Próximos 7 días</Text>
          {week.map((day) => (
            <View key={day.date.toISOString()} style={styles.dayRow}>
              <Text style={styles.dayLabel}>{day.label}</Text>
              <View style={styles.dayTimes}>
                <View style={styles.dayTime}>
                  <Ionicons name="sunny" size={12} color="#FFA726" />
                  <Text style={styles.dayTimeText}>{formatTime(day.goldenMorning)}</Text>
                </View>
                <View style={styles.dayTime}>
                  <Ionicons name="sunny" size={12} color={theme.colors.primary} />
                  <Text style={styles.dayTimeText}>{formatTime(day.goldenEvening)}</Text>
                </View>
                <View style={styles.dayTime}>
                  <Ionicons name="partly-sunny" size={12} color="#FF7043" />
                  <Text style={styles.dayTimeText}>{formatTime(day.sunset)}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.legend}>
            {[
              { icon: 'sunny', color: '#FFA726', text: 'Hora dorada mañana' },
              { icon: 'sunny', color: theme.colors.primary, text: 'Hora dorada tarde' },
              { icon: 'partly-sunny', color: '#FF7043', text: 'Puesta de sol' },
            ].map(({ icon, color, text }) => (
              <View key={text} style={styles.legendItem}>
                <Ionicons name={icon as any} size={12} color={color} />
                <Text style={styles.legendText}>{text}</Text>
              </View>
            ))}
          </View>
        </>
      )}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}
