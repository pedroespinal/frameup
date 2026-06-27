import { Stack } from 'expo-router';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function ToolsLayout() {
  const { theme } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
        headerBackTitle: 'Herramientas',
      }}
    />
  );
}
