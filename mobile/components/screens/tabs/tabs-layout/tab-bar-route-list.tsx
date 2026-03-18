import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { View } from 'react-native';

import { isVisibleTabRoute } from './config';
import { styles } from './styles';
import { TabBarRouteButton } from './tab-bar-route-button';

type TabBarRouteListProps = {
  state: BottomTabBarProps['state'];
  descriptors: BottomTabBarProps['descriptors'];
  navigation: BottomTabBarProps['navigation'];
  primaryColor: string;
  inactiveIconColor: string;
  inactiveLabelColor: string;
  isDark: boolean;
};

export function TabBarRouteList({
  state,
  descriptors,
  navigation,
  primaryColor,
  inactiveIconColor,
  inactiveLabelColor,
  isDark,
}: TabBarRouteListProps) {
  const visibleRoutes = useMemo(
    () => state.routes.filter((route) => isVisibleTabRoute(route, descriptors)),
    [descriptors, state.routes],
  );

  return (
    <View style={styles.tabBarInner}>
      {visibleRoutes.map((route) => (
        <TabBarRouteButton
          key={route.key}
          route={route}
          state={state}
          navigation={navigation}
          primaryColor={primaryColor}
          inactiveIconColor={inactiveIconColor}
          inactiveLabelColor={inactiveLabelColor}
          isDark={isDark}
        />
      ))}
    </View>
  );
}
