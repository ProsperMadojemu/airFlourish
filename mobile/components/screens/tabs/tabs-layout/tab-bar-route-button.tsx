import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { FloatingTabButton } from './floating-tab-button';

type TabBarRouteButtonProps = {
  route: BottomTabBarProps['state']['routes'][number];
  state: BottomTabBarProps['state'];
  navigation: BottomTabBarProps['navigation'];
  primaryColor: string;
  inactiveIconColor: string;
  inactiveLabelColor: string;
  isDark: boolean;
};

export function TabBarRouteButton({
  route,
  state,
  navigation,
  primaryColor,
  inactiveIconColor,
  inactiveLabelColor,
  isDark,
}: TabBarRouteButtonProps) {
  const actualIndex = state.routes.findIndex((item) => item.key === route.key);
  const isFocused = state.index === actualIndex;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <FloatingTabButton
      route={route}
      isFocused={isFocused}
      onPress={onPress}
      onLongPress={onLongPress}
      primaryColor={primaryColor}
      inactiveIconColor={inactiveIconColor}
      inactiveLabelColor={inactiveLabelColor}
      isDark={isDark}
    />
  );
}
