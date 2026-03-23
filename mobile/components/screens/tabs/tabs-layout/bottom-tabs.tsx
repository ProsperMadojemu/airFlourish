import { Tabs } from 'expo-router';

import { useThemeTokens } from '@/components/ui/theme';

import { TAB_SCREENS } from './config';
import { CustomTabBar } from './custom-tab-bar';

export function BottomTabs() {
  const { colors } = useThemeTokens();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      {TAB_SCREENS.map((screen) => (
        <Tabs.Screen key={screen.name} name={screen.name} options={{ title: screen.title }} />
      ))}
    </Tabs>
  );
}
