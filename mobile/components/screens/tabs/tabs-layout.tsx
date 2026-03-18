import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Tabs, useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeTokens } from '@/components/ui/theme';
import { PressableOpacity } from '@/components/ui/pressable-opacity';
import { useLogoutMutation } from '@/lib/hooks/auth/use-logout-mutation';

const Drawer = createDrawerNavigator();
const AnimatedPressable = Animated.createAnimatedComponent(PressableOpacity);
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

type TabIconName = ComponentProps<typeof Ionicons>['name'];

type TabConfig = {
  icon: TabIconName;
  activeIcon: TabIconName;
  label: string;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { icon: 'home-outline', activeIcon: 'home', label: 'Home' },
  bookings: { icon: 'receipt-outline', activeIcon: 'receipt', label: 'Bookings' },
  flights: { icon: 'airplane-outline', activeIcon: 'airplane', label: 'Flights' },
  payments: { icon: 'card-outline', activeIcon: 'card', label: 'Payments' },
  profile: { icon: 'person-outline', activeIcon: 'person', label: 'Profile' },
  settings: { icon: 'options-outline', activeIcon: 'options', label: 'Settings' },
};

function rgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function CustomDrawerContent() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.replace('/login');
  };

  return (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerHeading}>Welcome</Text>
      <PressableOpacity style={styles.drawerLink} onPress={() => router.push('/profile')}>
        <Text>Profile</Text>
      </PressableOpacity>
      <PressableOpacity style={styles.drawerLink} onPress={() => router.push('/settings')}>
        <Text>Settings</Text>
      </PressableOpacity>
      <PressableOpacity style={styles.drawerLink} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </PressableOpacity>
    </View>
  );
}

function FloatingTabButton({
  route,
  isFocused,
  onPress,
  primaryColor,
  shellTint,
  textColor,
}: {
  route: BottomTabBarProps['state']['routes'][number];
  isFocused: boolean;
  onPress: () => void;
  primaryColor: string;
  shellTint: string;
  textColor: string;
}) {
  const progress = useSharedValue(isFocused ? 1 : 0);
  const config = TAB_CONFIG[route.name] ?? {
    icon: 'ellipse-outline',
    activeIcon: 'ellipse',
    label: route.name,
  };

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, progress]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    flex: interpolate(progress.value, [0, 1], [0.9, 1.65], Extrapolation.CLAMP),
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [rgba(shellTint, 0.08), rgba(primaryColor, 0.22)],
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [rgba('#ffffff', 0.08), rgba(primaryColor, 0.44)],
    ),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -4]) }],
    shadowOpacity: interpolate(progress.value, [0, 1], [0, 0.18]),
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [rgba(textColor, 0.82), '#ffffff']),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.05]) }],
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    width: interpolate(progress.value, [0, 1], [0, 72], Extrapolation.CLAMP),
    marginLeft: interpolate(progress.value, [0, 1], [0, 8]),
  }));

  return (
    <Animated.View style={[styles.tabSlot, animatedContainerStyle]}>
      <AnimatedPressable onPress={onPress} style={[styles.tabButton, animatedButtonStyle]}>
        <Animated.View style={[styles.activeBubble, animatedOverlayStyle]} />
        <View style={styles.tabContent}>
          <AnimatedIonicons
            name={isFocused ? config.activeIcon : config.icon}
            size={20}
            style={[styles.iconWrapper, animatedIconStyle]}
          />
          <Animated.Text numberOfLines={1} style={[styles.tabLabel, animatedLabelStyle]}>
            {config.label}
          </Animated.Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useThemeTokens();

  const visibleRoutes = useMemo(
    () => state.routes.filter((route) => descriptors[route.key]?.options.href !== null),
    [descriptors, state.routes],
  );

  const shellBackground = isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.78)';
  const shellBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.65)';
  const fauxBlur = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.38)';
  const iconTint = isDark ? '#e5e7eb' : '#334155';

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <View
        style={[
          styles.tabBarShell,
          {
            backgroundColor: shellBackground,
            borderColor: shellBorder,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View style={[styles.blurLayer, { backgroundColor: fauxBlur }]} pointerEvents="none" />
        <View style={[styles.highlightLayer, { backgroundColor: rgba('#ffffff', isDark ? 0.06 : 0.5) }]} pointerEvents="none" />
        <View style={styles.tabBarInner}>
          {visibleRoutes.map((route) => {
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

            return (
              <FloatingTabButton
                key={route.key}
                route={route}
                isFocused={isFocused}
                onPress={onPress}
                primaryColor={colors.primary}
                shellTint={colors.foreground}
                textColor={iconTint}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function BottomTabs() {
  const { colors } = useThemeTokens();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <PressableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color={colors.foreground} />
          </PressableOpacity>
        ),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.foreground,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
      <Tabs.Screen name="flights" options={{ title: 'Flights' }} />
      <Tabs.Screen name="payments" options={{ title: 'Payments' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

export function TabsLayoutScreen() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen name="Main" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 60,
  },
  drawerHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
  },
  drawerLink: {
    marginTop: 20,
    marginLeft: 20,
  },
  logoutText: {
    color: 'red',
  },
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabBarShell: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 30,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 10,
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 24,
    elevation: 20,
  },
  blurLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  highlightLayer: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 8,
    height: '48%',
    borderRadius: 24,
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabSlot: {
    minWidth: 48,
  },
  tabButton: {
    minHeight: 56,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  activeBubble: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    lineHeight: 20,
  },
  tabLabel: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    overflow: 'hidden',
  },
});
