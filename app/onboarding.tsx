import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SectionList,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/theme';
import { cameras, Camera, getCamerasByBrand, getSensorColor, getSensorLabel } from '@/data/cameras';
import { saveGearProfile, markOnboardingDone } from '@/utils/profile';

type Step = 'welcome' | 'camera' | 'done';

function createStyles(t: Theme) {
  return StyleSheet.create({
    container:          { flex: 1, backgroundColor: t.colors.background, padding: t.spacing.lg },
    heroSection:        { alignItems: 'center', paddingVertical: t.spacing.xl },
    heroEmoji:          { fontSize: 64, marginBottom: t.spacing.md },
    heroTitle:          { fontSize: 28, fontWeight: '800', color: t.colors.text, textAlign: 'center', marginBottom: t.spacing.sm, letterSpacing: -0.5 },
    heroAccent:         { color: t.colors.primary },
    heroSub:            { fontSize: 15, color: t.colors.textSecondary, textAlign: 'center', lineHeight: 23 },
    featureList:        { gap: t.spacing.sm, marginBottom: t.spacing.xl },
    featureRow:         { flexDirection: 'row', alignItems: 'center', gap: 12 },
    featureIcon:        { width: 36, height: 36, borderRadius: 18, backgroundColor: t.colors.primary + '18', alignItems: 'center', justifyContent: 'center' },
    featureText:        { flex: 1, fontSize: 14, color: t.colors.textSecondary, lineHeight: 20 },
    actions:            { gap: t.spacing.sm },
    primaryBtn:         { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: t.colors.primary, borderRadius: t.radius.round, padding: 16 },
    primaryBtnDisabled: { opacity: 0.5 },
    primaryBtnText:     { fontSize: 16, fontWeight: '700', color: '#000' },
    skipBtn:            { alignItems: 'center', padding: t.spacing.md },
    skipBtnText:        { fontSize: 14, color: t.colors.textMuted, fontWeight: '500' },
    stepHeader:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: t.spacing.lg },
    stepDots:           { flexDirection: 'row', gap: 6 },
    dot:                { width: 8, height: 8, borderRadius: 4, backgroundColor: t.colors.border },
    dotActive:          { backgroundColor: t.colors.primary },
    dotDone:            { backgroundColor: t.colors.primary + '60' },
    skipLink:           { fontSize: 14, color: t.colors.textMuted, fontWeight: '500' },
    stepTitle:          { fontSize: 24, fontWeight: '800', color: t.colors.text, marginBottom: t.spacing.sm, letterSpacing: -0.5 },
    stepSub:            { fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: t.spacing.md },
    primaryColor:       { color: t.colors.primary },
    selectedBanner:     { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: t.colors.primary + '15', borderLeftWidth: 3, borderRadius: t.radius.md, padding: t.spacing.sm, marginBottom: t.spacing.md },
    selectedBannerText: { fontSize: 13, fontWeight: '600', color: t.colors.primary, flex: 1 },
    sectionHeader:      { backgroundColor: t.colors.surface, paddingHorizontal: t.spacing.md, paddingVertical: 6 },
    sectionTitle:       { fontSize: 11, fontWeight: '700', color: t.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 },
    cameraRow:          { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: t.spacing.md, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: t.colors.divider },
    cameraRowActive:    { backgroundColor: t.colors.primary + '10' },
    sensorBar:          { width: 3, height: 36, borderRadius: 2 },
    cameraInfo:         { flex: 1 },
    cameraName:         { fontSize: 14, fontWeight: '600', color: t.colors.text },
    cameraSub:          { fontSize: 12, color: t.colors.textSecondary, marginTop: 1 },
    fixedBottom:        { gap: t.spacing.sm, paddingTop: t.spacing.md, borderTopWidth: 1, borderTopColor: t.colors.border },
  });
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [step, setStep] = useState<Step>('welcome');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const brandSections = Object.entries(getCamerasByBrand()).map(([brand, cams]) => ({ title: brand, data: cams }));

  const handleSkip = async () => {
    await markOnboardingDone();
    router.replace('/(tabs)' as any);
  };

  const handleFinish = async () => {
    if (selectedCamera) {
      await saveGearProfile({ cameraId: selectedCamera.id, cameraBrand: selectedCamera.brand, cameraModel: selectedCamera.model, sensorType: selectedCamera.sensor, lensIds: [] });
    }
    await markOnboardingDone();
    router.replace('/(tabs)' as any);
  };

  if (step === 'welcome') {
    return (
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>📷</Text>
          <Text style={styles.heroTitle}>
            Bienvenido a <Text style={styles.heroAccent}>FrameUp</Text>
          </Text>
          <Text style={styles.heroSub}>
            Tu asistente técnico para fotografía. Encuentra la configuración perfecta para cada escena, adaptada a tu cámara y sensor.
          </Text>
        </View>

        <View style={styles.featureList}>
          {[
            { icon: 'search-outline',   text: '19 escenas fotográficas con ajustes detallados' },
            { icon: 'camera-outline',   text: 'Soporte para 45+ cámaras de todos los sistemas' },
            { icon: 'sunny-outline',    text: 'Calculadora de Hora Dorada con GPS en tiempo real' },
            { icon: 'aperture-outline', text: 'Herramientas: ND, DOF, Triángulo de Exposición' },
            { icon: 'bookmark-outline', text: 'Guarda configuraciones favoritas con notas' },
          ].map(({ icon, text }) => (
            <View key={text} style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Ionicons name={icon as any} size={18} color={theme.colors.primary} />
              </View>
              <Text style={styles.featureText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep('camera')}>
            <Text style={styles.primaryBtnText}>Configurar mi cámara</Text>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Saltar por ahora</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (step === 'camera') {
    return (
      <View style={styles.container}>
        <View style={styles.stepHeader}>
          <TouchableOpacity onPress={() => setStep('welcome')}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <View style={styles.stepDots}>
            <View style={[styles.dot, styles.dotDone]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipLink}>Saltar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.stepTitle}>¿Qué cámara usas?</Text>
        <Text style={styles.stepSub}>
          Los ajustes se optimizan según tu sensor. Puedes cambiarlo más adelante en{' '}
          <Text style={styles.primaryColor}>Herramientas → Mi Equipo</Text>.
        </Text>

        {selectedCamera && (
          <View style={[styles.selectedBanner, { borderLeftColor: getSensorColor(selectedCamera.sensor) }]}>
            <Ionicons name="checkmark-circle" size={18} color={getSensorColor(selectedCamera.sensor)} />
            <Text style={styles.selectedBannerText}>
              {selectedCamera.brand} {selectedCamera.model} · {getSensorLabel(selectedCamera.sensor)}
            </Text>
          </View>
        )}

        <SectionList
          sections={brandSections}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => {
            const color  = getSensorColor(item.sensor);
            const active = selectedCamera?.id === item.id;
            return (
              <TouchableOpacity
                style={[styles.cameraRow, active && styles.cameraRowActive]}
                onPress={() => setSelectedCamera(item)}
                activeOpacity={0.8}
              >
                <View style={[styles.sensorBar, { backgroundColor: color }]} />
                <View style={styles.cameraInfo}>
                  <Text style={styles.cameraName}>{item.brand} {item.model}</Text>
                  <Text style={styles.cameraSub}>{getSensorLabel(item.sensor)} · {item.year}</Text>
                </View>
                {active && <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />}
              </TouchableOpacity>
            );
          }}
        />

        <View style={styles.fixedBottom}>
          <TouchableOpacity style={[styles.primaryBtn, !selectedCamera && styles.primaryBtnDisabled]} onPress={handleFinish} disabled={!selectedCamera}>
            <Text style={styles.primaryBtnText}>{selectedCamera ? 'Guardar y entrar' : 'Selecciona una cámara'}</Text>
            {selectedCamera && <Ionicons name="checkmark" size={18} color="#000" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Entrar sin seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return null;
}
