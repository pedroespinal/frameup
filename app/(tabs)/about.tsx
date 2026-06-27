import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Linking,
} from 'react-native';
import { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useLanguage, Lang } from '@/contexts/LanguageContext';
import { APP } from '@/constants/app';
import { Theme } from '@/constants/theme';

const CREATION_DATE = new Date(APP.createdAt).toLocaleDateString('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric',
});
const CREATION_DATE_EN = new Date(APP.createdAt).toLocaleDateString('en-US', {
  day: 'numeric', month: 'long', year: 'numeric',
});

function createStyles(t: Theme) {
  const c = t.colors;
  const sp = t.spacing;
  const r = t.radius;
  return StyleSheet.create({
    container:     { flex: 1, backgroundColor: c.background },
    content:       { padding: sp.md, paddingBottom: 60 },

    // Hero
    hero:          { alignItems: 'center', paddingVertical: sp.xl, paddingHorizontal: sp.lg },
    logoBox: {
      width: 80, height: 80, borderRadius: r.xl,
      backgroundColor: c.primary + '20',
      alignItems: 'center', justifyContent: 'center',
      marginBottom: sp.md,
      borderWidth: 2, borderColor: c.primary + '40',
    },
    logoEmoji:     { fontSize: 36 },
    heroName:      { fontSize: 28, fontWeight: '800', color: c.primary, letterSpacing: -0.5 },
    heroTagline:   { fontSize: 14, color: c.textSecondary, marginTop: 4, textAlign: 'center' },
    versionRow:    { flexDirection: 'row', gap: 8, marginTop: sp.sm, alignItems: 'center' },
    versionChip: {
      backgroundColor: c.card, borderRadius: r.round,
      paddingHorizontal: 10, paddingVertical: 4,
      borderWidth: 1, borderColor: c.border,
    },
    versionText:   { fontSize: 11, fontWeight: '700', color: c.textMuted },

    // Sections
    sectionLabel: {
      fontSize: 11, fontWeight: '700', color: c.textMuted,
      textTransform: 'uppercase', letterSpacing: 1.2,
      marginBottom: sp.sm, marginTop: sp.lg,
    },

    // Setting row (toggle)
    settingRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: c.card, borderRadius: r.lg,
      padding: sp.md, marginBottom: 6,
      borderWidth: 1, borderColor: c.border,
    },
    settingIcon:   { marginRight: sp.sm + 2 },
    settingLabel:  { flex: 1, fontSize: 15, fontWeight: '600', color: c.text },
    settingValue:  { fontSize: 13, color: c.textMuted, marginRight: sp.sm },

    // Language buttons
    langRow:       { flexDirection: 'row', gap: sp.sm, marginBottom: sp.md },
    langBtn: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      backgroundColor: c.card, borderRadius: r.lg,
      paddingVertical: 12, borderWidth: 1, borderColor: c.border,
    },
    langBtnActive: { backgroundColor: c.primary + '22', borderColor: c.primary },
    langBtnText:   { fontSize: 14, fontWeight: '600', color: c.textSecondary },
    langBtnTextActive: { color: c.primary, fontWeight: '700' },
    langFlag:      { fontSize: 22, marginBottom: 2 },

    // Guide items
    guideCard: {
      backgroundColor: c.card, borderRadius: r.lg,
      padding: sp.md, marginBottom: 6,
      borderWidth: 1, borderColor: c.border,
      flexDirection: 'row', gap: 12, alignItems: 'flex-start',
    },
    guideIconBox: {
      width: 40, height: 40, borderRadius: r.md,
      backgroundColor: c.primary + '18',
      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    },
    guideEmoji:    { fontSize: 20 },
    guideInfo:     { flex: 1 },
    guideTitle:    { fontSize: 14, fontWeight: '700', color: c.text, marginBottom: 3 },
    guideDesc:     { fontSize: 12, color: c.textSecondary, lineHeight: 18 },

    // Info rows
    infoCard: {
      backgroundColor: c.card, borderRadius: r.lg,
      padding: sp.md, marginBottom: 6,
      borderWidth: 1, borderColor: c.border,
      flexDirection: 'row', alignItems: 'center', gap: 10,
    },
    infoLabel:     { fontSize: 12, color: c.textMuted, fontWeight: '600', marginBottom: 1 },
    infoValue:     { fontSize: 14, fontWeight: '700', color: c.text },

    // Footer
    footer: {
      marginTop: sp.xl, alignItems: 'center',
      paddingHorizontal: sp.lg, paddingVertical: sp.lg,
      backgroundColor: c.card, borderRadius: r.xl,
      borderWidth: 1, borderColor: c.border,
    },
    footerLogo:    { fontSize: 24, marginBottom: sp.sm },
    footerName:    { fontSize: 16, fontWeight: '800', color: c.primary, marginBottom: 2 },
    footerCreator: { fontSize: 14, color: c.text, fontWeight: '600', marginBottom: 2 },
    footerRights:  { fontSize: 12, color: c.textMuted, textAlign: 'center', lineHeight: 18 },
    footerSig: {
      marginTop: sp.md, paddingTop: sp.md,
      borderTopWidth: 1, borderTopColor: c.border,
      width: '100%', alignItems: 'center',
    },
    footerSigText: { fontSize: 10, color: c.textMuted, fontFamily: 'monospace', letterSpacing: 0.5 },

    divider:       { height: 1, backgroundColor: c.divider, marginVertical: sp.md },
  });
}

const GUIDE_ITEMS_ES = [
  { emoji: '🔍', title: 'Buscar',          desc: 'Describe cualquier situación fotográfica. FrameUp entiende lenguaje natural y encuentra la escena perfecta.' },
  { emoji: '📚', title: 'Escenas',         desc: 'Accede a 19 escenas curadas por expertos, organizadas por categoría: noche, retrato, paisaje, acción y más.' },
  { emoji: '📷', title: 'Configuración',   desc: 'Selecciona tu cámara y recibe ajustes profesionales (f/, velocidad, ISO) optimizados para tu sensor específico.' },
  { emoji: '⚡', title: 'Herramientas',    desc: 'Acceso rápido a 7 calculadoras: Triángulo de Exposición, Profundidad de Campo, ND, Lentes, EXIF, Equipo y Temporizador.' },
  { emoji: '❤️', title: 'Favoritos',       desc: 'Guarda configuraciones favoritas con notas personales de hasta 500 caracteres. Acceso instantáneo desde cualquier pantalla.' },
  { emoji: '🌅', title: 'Hora Dorada',     desc: 'Calcula en tiempo real la Hora Dorada, Azul y 5 eventos solares más para tu ubicación exacta, 7 días adelante.' },
  { emoji: '💾', title: 'Compartir',       desc: 'Exporta cualquier configuración como imagen profesional o texto plano. Comparte con otros fotógrafos fácilmente.' },
  { emoji: '🌍', title: 'Comunidad',       desc: 'Sube fotos con marca de agua FrameUp. Solicita la versión original al fotógrafo. Conecta con otros creadores.' },
];

const GUIDE_ITEMS_EN = [
  { emoji: '🔍', title: 'Search',          desc: 'Describe any photographic situation naturally. FrameUp understands context and finds the perfect scene.' },
  { emoji: '📚', title: 'Scenes',          desc: 'Access 19 expert-curated scenes organized by category: night, portrait, landscape, action, and more.' },
  { emoji: '📷', title: 'Settings',        desc: 'Select your camera and receive pro settings (f/, shutter, ISO) optimized precisely for your sensor.' },
  { emoji: '⚡', title: 'Tools',           desc: 'Quick access to 7 powerful calculators: Exposure Triangle, Depth of Field, ND, Lenses, EXIF, Gear, and Timer.' },
  { emoji: '❤️', title: 'Favorites',       desc: 'Save configurations with personal notes up to 500 characters. Instant access from anywhere in the app.' },
  { emoji: '🌅', title: 'Golden Hour',     desc: 'Real-time calculation of Golden Hour, Blue Hour, and 5 solar events for your exact location, 7 days ahead.' },
  { emoji: '💾', title: 'Share',           desc: 'Export any configuration as a professional image or plain text. Easily share with other photographers.' },
  { emoji: '🌍', title: 'Community',       desc: 'Post watermarked photos. Request original files from photographers. Connect with fellow creators worldwide.' },
];

export default function AboutScreen() {
  const { theme, isDark, toggleTheme } = useAppTheme();
  const { lang, setLang, t } = useLanguage();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const guideItems = lang === 'es' ? GUIDE_ITEMS_ES : GUIDE_ITEMS_EN;
  const creationLabel = lang === 'es' ? CREATION_DATE : CREATION_DATE_EN;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>📷</Text>
        </View>
        <Text style={styles.heroName}>FrameUp</Text>
        <Text style={styles.heroTagline}>
          {lang === 'es' ? APP.tagline : "The photographer's technical guide"}
        </Text>
        <View style={styles.versionRow}>
          <View style={styles.versionChip}>
            <Text style={styles.versionText}>v{APP.version}</Text>
          </View>
          <View style={styles.versionChip}>
            <Text style={styles.versionText}>Build {APP.build}</Text>
          </View>
        </View>
      </View>

      {/* ── APPEARANCE ── */}
      <Text style={styles.sectionLabel}>{t.appearance}</Text>
      <TouchableOpacity style={styles.settingRow} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? 'moon-outline' : 'sunny-outline'}
          size={20}
          color={theme.colors.primary}
          style={styles.settingIcon}
        />
        <Text style={styles.settingLabel}>
          {isDark ? t.darkMode : t.lightMode}
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary + '80' }}
          thumbColor={isDark ? theme.colors.primary : theme.colors.textMuted}
        />
      </TouchableOpacity>

      {/* ── LANGUAGE ── */}
      <Text style={styles.sectionLabel}>{t.language}</Text>
      <View style={styles.langRow}>
        {(['es', 'en'] as Lang[]).map((l) => (
          <TouchableOpacity
            key={l}
            style={[styles.langBtn, lang === l && styles.langBtnActive]}
            onPress={() => setLang(l)}
          >
            <Text style={styles.langFlag}>{l === 'es' ? '🇪🇸' : '🇺🇸'}</Text>
            <Text style={[styles.langBtnText, lang === l && styles.langBtnTextActive]}>
              {l === 'es' ? 'Español' : 'English'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── USER GUIDE ── */}
      <Text style={styles.sectionLabel}>{t.guideTitle}</Text>
      {guideItems.map((item) => (
        <View key={item.title} style={styles.guideCard}>
          <View style={styles.guideIconBox}>
            <Text style={styles.guideEmoji}>{item.emoji}</Text>
          </View>
          <View style={styles.guideInfo}>
            <Text style={styles.guideTitle}>{item.title}</Text>
            <Text style={styles.guideDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}

      {/* ── APP INFO ── */}
      <Text style={styles.sectionLabel}>{t.version}</Text>
      {[
        { label: t.version,   value: `FrameUp ${APP.version}` },
        { label: t.build,     value: `#${APP.build}` },
        { label: t.createdAt, value: creationLabel },
      ].map((row) => (
        <View key={row.label} style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={18} color={theme.colors.primary} />
          <View>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={styles.infoValue}>{row.value}</Text>
          </View>
        </View>
      ))}

      {/* ── FOOTER ── */}
      <View style={styles.footer}>
        <Text style={styles.footerLogo}>📷</Text>
        <Text style={styles.footerName}>FrameUp</Text>
        <Text style={styles.footerCreator}>
          {t.createdBy}: {APP.author}
        </Text>
        <Text style={styles.footerRights}>
          {lang === 'es' ? APP.copyright : APP.copyrightEn}
        </Text>
        <Text style={styles.footerRights}>
          {lang === 'es'
            ? `FrameUp® — ${APP.tagline}`
            : `FrameUp® — The photographer's technical guide`}
        </Text>
        <View style={styles.footerSig}>
          <Text style={styles.footerSigText}>
            {`BUILD:${APP.build} · CREATED:${APP.createdAt.split('T')[0]} · V${APP.version}`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
