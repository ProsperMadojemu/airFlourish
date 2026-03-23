import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';

export type TabIconName = ComponentProps<typeof Ionicons>['name'];
export type TabRoute = BottomTabBarProps['state']['routes'][number];

type TabBarRouteOptions = BottomTabBarProps['descriptors'][string]['options'] & {
  href?: string | null;
};

export type TabScreenConfig = {
  name: string;
  title: string;
  icon: TabIconName;
  activeIcon: TabIconName;
  label: string;
};

export const TAB_SCREENS = [
  { name: 'index', title: 'Home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
  { name: 'bookings', title: 'Bookings', icon: 'receipt-outline', activeIcon: 'receipt', label: 'Bookings' },
  { name: 'flights', title: 'Flights', icon: 'airplane-outline', activeIcon: 'airplane', label: 'Flights' },
  { name: 'settings', title: 'Settings', icon: 'options-outline', activeIcon: 'options', label: 'Settings' },
] as const satisfies readonly TabScreenConfig[];

const DEFAULT_TAB_CONFIG = {
  icon: 'ellipse-outline',
  activeIcon: 'ellipse',
} satisfies Pick<TabScreenConfig, 'icon' | 'activeIcon'>;

export const DRAWER_LINKS = [
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', href: '/settings' },
] as const;

export function getTabConfig(routeName: string): TabScreenConfig {
  const screen = TAB_SCREENS.find((item) => item.name === routeName);

  if (screen) {
    return screen;
  }

  return {
    ...DEFAULT_TAB_CONFIG,
    label: routeName,
    title: routeName,
    name: routeName,
  };
}

export function isVisibleTabRoute(route: TabRoute, descriptors: BottomTabBarProps['descriptors']) {
  const options = descriptors[route.key]?.options as TabBarRouteOptions;
  const isConfiguredTab = TAB_SCREENS.some((screen) => screen.name === route.name);

  return isConfiguredTab && options?.href !== null;
}
