import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import { useThemeTokens } from '@/components/ui/theme';

import { TAB_SCREENS } from './config';
import { CustomTabBar } from './custom-tab-bar';

export function BottomTabs() {
  const { colors } = useThemeTokens();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        // headerShown: false,
        headerLeft: () => (
          <Pressable style={{ marginLeft: 15 }} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color={colors.foreground} />
          </Pressable>
        ),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerStatusBarHeight: 0,
        headerTitleStyle: {
          color: colors.foreground,
        },
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
