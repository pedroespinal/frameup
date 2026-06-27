import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useAppTheme } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { isOnboardingDone } from '@/utils/profile';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

function RootNavigator({ showOnboarding }: { showOnboarding: boolean }) {
  const { theme, isDark } = useAppTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          contentStyle: { backgroundColor: theme.colors.background },
          headerShadowVisible: false,
        }}
        initialRouteName={showOnboarding ? 'onboarding' : '(tabs)'}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings/[sceneId]"
          options={{ title: 'Configuración', headerBackTitle: 'Atrás' }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    (async () => {
      const done = await isOnboardingDone();
      setShowOnboarding(!done);
      setReady(true);
      SplashScreen.hideAsync();
    })();
  }, []);

  if (!ready) return null;

  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootNavigator showOnboarding={showOnboarding} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
