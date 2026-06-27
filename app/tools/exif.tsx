import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useState, useMemo } from 'react';
import { Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';

interface ExifData {
  ExposureTime?: number;
  FNumber?: number;
  ISOSpeedRatings?: number;
  FocalLength?: number;
  FocalLengthIn35mmFilm?: number;
  Flash?: number;
  WhiteBalance?: number;
  ExposureMode?: number;
  MeteringMode?: number;
  ExposureBiasValue?: number;
  LensModel?: string;
  Make?: string;
  Model?: string;
  DateTimeOriginal?: string;
  PixelXDimension?: number;
  PixelYDimension?: number;
  [key: string]: unknown;
}

function formatShutter(t?: number): string {
  if (!t) return 'N/A';
  return t >= 1 ? `${t}s` : `1/${Math.round(1 / t)}s`;
}

function exifExplanation(
  exif: ExifData,
  colors: Theme['colors'],
): Array<{ icon: string; title: string; value: string; analysis: string; color: string }> {
  const items: Array<{ icon: string; title: string; value: string; analysis: string; color: string }> = [];

  if (exif.FNumber) {
    const f = exif.FNumber;
    const analysis =
      f <= 1.8 ? 'Apertura muy abierta — Bokeh extremo, poca profundidad de campo. Perfecto para retratos o poca luz.' :
      f <= 2.8 ? 'Apertura amplia — Buen bokeh y luminosidad. Estándar para retratos y baja luz.' :
      f <= 5.6 ? 'Apertura media — Equilibrio entre nitidez y luminosidad.' :
                 'Apertura cerrada — Máxima profundidad de campo. Ideal para paisaje y arquitectura.';
    items.push({ icon: 'aperture', title: 'Apertura', value: `f/${f}`, analysis, color: colors.primary });
  }

  if (exif.ExposureTime) {
    const t = exif.ExposureTime;
    const analysis =
      t >= 1      ? 'Exposición larga — Cualquier movimiento queda registrado. Necesitas trípode.' :
      t >= 1/30   ? 'Velocidad lenta — Riesgo de movimiento de cámara o sujeto. IBIS o trípode recomendado.' :
      t >= 1/125  ? 'Velocidad media — Adecuada para sujetos tranquilos en buena luz.' :
      t >= 1/500  ? 'Velocidad alta — Congela movimientos rápidos. Deportes y niños.' :
                    'Velocidad extrema — Congela cualquier acción. Gotas de agua, alas de pájaro.';
    items.push({ icon: 'timer-outline', title: 'Velocidad', value: formatShutter(t), analysis, color: colors.secondary });
  }

  if (exif.ISOSpeedRatings) {
    const iso = exif.ISOSpeedRatings;
    const analysis =
      iso <= 100  ? 'ISO mínimo — Máxima calidad, sin ruido. Condición de luz excelente.' :
      iso <= 400  ? 'ISO bajo — Calidad muy alta. Buenas condiciones de luz.' :
      iso <= 1600 ? 'ISO medio — Buen resultado en sensores modernos. Baja luz controlada.' :
      iso <= 6400 ? 'ISO alto — Visible en full frame moderno. Baja luz exigente.' :
                    'ISO muy alto — Ruido significativo. Condiciones extremas de oscuridad.';
    items.push({ icon: 'layers-outline', title: 'ISO', value: `ISO ${iso}`, analysis, color: '#CE93D8' });
  }

  if (exif.FocalLength) {
    const f   = exif.FocalLength;
    const f35 = exif.FocalLengthIn35mmFilm;
    const ref = f35 || f;
    const analysis =
      ref <= 24  ? 'Gran angular — Campo de visión muy amplio. Paisaje, arquitectura interior, astro.' :
      ref <= 35  ? 'Angular — El favorito para street photography y reportaje. Muy natural.' :
      ref <= 50  ? 'Normal — Lo más parecido a la visión humana. Versátil para todo.' :
      ref <= 85  ? 'Teleobjetivo suave — El estándar para retrato con compresión favorecedora.' :
      ref <= 200 ? 'Teleobjetivo — Compresión de perspectiva. Retrato, fauna cercana, deportes.' :
                   'Super teleobjetivo — Sujetos muy lejanos. Fauna, aviación, eventos deportivos.';
    const value = f35 && f35 !== f ? `${f}mm (${f35}mm equiv.)` : `${f}mm`;
    items.push({ icon: 'eye-outline', title: 'Focal', value, analysis, color: '#FF8A65' });
  }

  if (exif.WhiteBalance !== undefined) {
    const wb = exif.WhiteBalance;
    items.push({
      icon: 'color-palette-outline', title: 'Balance de Blancos',
      value: wb === 0 ? 'Auto (AWB)' : 'Manual',
      analysis: wb === 0 ? 'AWB activo — La cámara eligió la temperatura de color automáticamente.' : 'WB manual — El fotógrafo fijó la temperatura de color para consistencia.',
      color: '#4CAF50',
    });
  }

  if (exif.Flash !== undefined) {
    const fired = (exif.Flash & 1) === 1;
    items.push({
      icon: 'flash-outline', title: 'Flash',
      value: fired ? 'Disparado' : 'No usado',
      analysis: fired ? 'Flash disparado — Luz artificial añadida. Puede ser fill-flash o principal.' : 'Sin flash — Luz ambiental exclusivamente.',
      color: fired ? '#FFC107' : colors.textMuted,
    });
  }

  if (exif.ExposureBiasValue !== undefined && exif.ExposureBiasValue !== 0) {
    const ev = exif.ExposureBiasValue;
    items.push({
      icon: 'sunny-outline', title: 'Comp. de Exposición',
      value: `${ev > 0 ? '+' : ''}${ev} EV`,
      analysis: ev > 0 ? 'Sobreexpuesto intencionalmente — El fotógrafo quería más luz (sujetos claros, fondos brillantes).' : 'Subexpuesto intencionalmente — El fotógrafo oscureció deliberadamente (preservar altas luces, look oscuro).',
      color: colors.warning,
    });
  }

  return items;
}

function createStyles(t: Theme) {
  return StyleSheet.create({
    pickBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md + 4, borderWidth: 1, borderColor: t.colors.primary + '50', marginBottom: t.spacing.md },
    pickTxt:     { fontSize: 15, fontWeight: '700', color: t.colors.primary },
    preview:     { width: '100%', height: 200, borderRadius: t.radius.lg, marginBottom: t.spacing.md },
    cameraBox:   { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.colors.card, borderRadius: t.radius.md, padding: t.spacing.sm + 4, marginBottom: t.spacing.md, borderWidth: 1, borderColor: t.colors.border },
    cameraTxt:   { fontSize: 14, fontWeight: '700', color: t.colors.text },
    lensTxt:     { fontSize: 12, color: t.colors.textSecondary, marginTop: 1 },
    card:        { backgroundColor: t.colors.card, borderRadius: t.radius.lg, padding: t.spacing.md, marginBottom: t.spacing.sm, borderWidth: 1, borderColor: t.colors.border, borderLeftWidth: 3 },
    cardTop:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
    iconBox:     { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    cardInfo:    { flex: 1 },
    cardLabel:   { fontSize: 10, color: t.colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
    cardValue:   { fontSize: 20, fontWeight: '800', marginTop: 1 },
    cardAnalysis:{ fontSize: 13, color: t.colors.textSecondary, lineHeight: 20 },
    noExif:      { alignItems: 'center', padding: t.spacing.xl, gap: 8 },
    noExifTitle: { fontSize: 16, fontWeight: '700', color: t.colors.text },
    noExifTxt:   { fontSize: 13, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 20 },
    empty:       { alignItems: 'center', paddingTop: t.spacing.xxl },
    emptyEmoji:  { fontSize: 52, marginBottom: t.spacing.md },
    emptyTitle:  { fontSize: 20, fontWeight: '700', color: t.colors.text, marginBottom: t.spacing.sm },
    emptyTxt:    { fontSize: 14, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  });
}

export default function ExifScreen() {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [exif,     setExif]     = useState<ExifData | null>(null);
  const [camera,   setCamera]   = useState<{ make?: string; model?: string; lens?: string } | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], exif: true, quality: 0.5 });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      if (asset.exif) {
        setExif(asset.exif as ExifData);
        setCamera({ make: asset.exif.Make as string | undefined, model: asset.exif.Model as string | undefined, lens: asset.exif.LensModel as string | undefined });
      } else {
        setExif(null); setCamera(null);
      }
    }
  };

  const explanations = exif ? exifExplanation(exif, theme.colors) : [];

  return (
    <>
      <Stack.Screen options={{ title: 'Lector EXIF' }} />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.pickBtn} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color={theme.colors.primary} />
          <Text style={styles.pickTxt}>{imageUri ? 'Cambiar foto' : 'Seleccionar foto de la galería'}</Text>
        </TouchableOpacity>

        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />}

        {camera && (camera.make || camera.model) && (
          <View style={styles.cameraBox}>
            <Ionicons name="camera" size={16} color={theme.colors.primary} />
            <View>
              <Text style={styles.cameraTxt}>{[camera.make, camera.model].filter(Boolean).join(' ')}</Text>
              {camera.lens && <Text style={styles.lensTxt}>{camera.lens}</Text>}
            </View>
          </View>
        )}

        {imageUri && !exif && (
          <View style={styles.noExif}>
            <Ionicons name="warning-outline" size={28} color={theme.colors.warning} />
            <Text style={styles.noExifTitle}>Sin datos EXIF</Text>
            <Text style={styles.noExifTxt}>Esta imagen no tiene metadatos EXIF. Puede que haya sido editada, capturada con screenshot o que el dispositivo los haya eliminado.</Text>
          </View>
        )}

        {explanations.map((item) => (
          <View key={item.title} style={[styles.card, { borderLeftColor: item.color }]}>
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: item.color + '1A' }]}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>{item.title}</Text>
                <Text style={[styles.cardValue, { color: item.color }]}>{item.value}</Text>
              </View>
            </View>
            <Text style={styles.cardAnalysis}>{item.analysis}</Text>
          </View>
        ))}

        {!imageUri && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Analiza cualquier foto</Text>
            <Text style={styles.emptyTxt}>
              Selecciona una foto de tu galería y FrameUp te explicará exactamente qué configuración usó la cámara y por qué esas decisiones afectan el resultado.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </>
  );
}
