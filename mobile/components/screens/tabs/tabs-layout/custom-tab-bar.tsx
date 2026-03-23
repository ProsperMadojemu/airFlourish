import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { useThemeTokens } from '@/components/ui/theme';

import { styles } from './styles';
import { TabBarRouteList } from './tab-bar-route-list';
import { TabBarShell } from './tab-bar-shell';
import { getInactiveTabColors } from './tab-bar-theme';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useThemeTokens();
  const { inactiveIconColor, inactiveLabelColor } = getInactiveTabColors(isDark);

  return (
    <View style={[styles.tabBarOuter, {backgroundColor: colors.background}]} pointerEvents="box-none">
      <TabBarShell
        backgroundColor={colors.background}
        borderColor={colors.border}
        shadowColor={colors.shadow}
      >
        <TabBarRouteList
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          primaryColor={colors.primary}
          inactiveIconColor={inactiveIconColor}
          inactiveLabelColor={inactiveLabelColor}
          isDark={isDark}
        />
      </TabBarShell>
    </View>
  );
}
