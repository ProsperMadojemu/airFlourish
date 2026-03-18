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
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { PressableOpacity } from '@/components/ui/pressable-opacity';
import { useLogoutMutation } from '@/lib/hooks/auth/use-logout-mutation';

const Drawer = createDrawerNavigator();
const AnimatedPressable = Animated.createAnimatedComponent(PressableOpacity);
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

type TabIconName = ComponentProps<typeof Ionicons>['name'];

type TabConfig = {
  icon: TabIconName;
  label: string;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { icon: 'home-outline', label: 'Home' },
  bookings: { icon: 'receipt-outline', label: 'Bookings' },
  flights: { icon: 'airplane-outline', label: 'Flights' },
  payments: { icon: 'card-outline', label: 'Payments' },
  profile: { icon: 'person-outline', label: 'Profile' },
  settings: { icon: 'options-outline', label: 'Settings' },
};

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
}: {
  route: BottomTabBarProps['state']['routes'][number];
  isFocused: boolean;
  onPress: () => void;
}) {
  const progress = useSharedValue(isFocused ? 1 : 0);
  const config = TAB_CONFIG[route.name] ?? {
    icon: 'ellipse-outline',
    label: route.name,
  };

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, progress]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -8]) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.03]) },
    ],
    backgroundColor: interpolateColor(progress.value, [0, 1], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.92)']),
    borderColor: interpolateColor(progress.value, [0, 1], ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.75)']),
    shadowOpacity: interpolate(progress.value, [0, 1], [0, 0.24]),
    elevation: interpolate(progress.value, [0, 1], [0, 12]),
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ scaleX: interpolate(progress.value, [0, 1], [0.86, 1]) }],
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['rgba(255,255,255,0.72)', '#111111']),
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['rgba(255,255,255,0.75)', '#111111']),
    opacity: interpolate(progress.value, [0, 1], [0.82, 1]),
  }));

  return (
    <PressableOpacity onPress={onPress} style={styles.tabSlot}>
      <Animated.View pointerEvents="none" style={[styles.activeGlow, animatedGlowStyle]}>
        <Svg width="100%" height="100%">
          <Defs>
            <LinearGradient id={`tabGlow-${route.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <Stop offset="55%" stopColor="rgba(129,140,248,0.58)" />
              <Stop offset="100%" stopColor="rgba(56,189,248,0.3)" />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width="100%" height="100%" rx={26} fill={`url(#tabGlow-${route.key})`} />
        </Svg>
      </Animated.View>
      <AnimatedPressable onPress={onPress} style={[styles.tabButton, animatedButtonStyle]}>
        <AnimatedIonicons
          name={isFocused ? (config.icon.replace('-outline', '') as TabIconName) : config.icon}
          size={20}
          style={[styles.iconWrapper, animatedIconStyle]}
        />
        <Animated.Text numberOfLines={1} style={[styles.tabLabel, animatedLabelStyle]}>
          {config.label}
        </Animated.Text>
      </AnimatedPressable>
    </PressableOpacity>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const visibleRoutes = useMemo(
    () => state.routes.filter((route) => descriptors[route.key]?.options.href !== null),
    [descriptors, state.routes],
  );

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <View style={styles.tabBarShell}>
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
              <FloatingTabButton key={route.key} route={route} isFocused={isFocused} onPress={onPress} />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function BottomTabs() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <PressableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} />
          </PressableOpacity>
        ),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#f8fafc',
        },
        sceneStyle: {
          backgroundColor: '#f8fafc',
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
    paddingHorizontal: 16,
  },
  tabBarShell: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 34,
    backgroundColor: 'rgba(17, 24, 39, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 28,
    elevation: 22,
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  tabSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  activeGlow: {
    position: 'absolute',
    top: 6,
    width: '88%',
    height: 52,
    borderRadius: 26,
    overflow: 'hidden',
  },
  tabButton: {
    minWidth: 0,
    width: '100%',
    minHeight: 58,
    borderRadius: 26,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 20,
  },
  iconWrapper: {
    fontSize: 20,
    lineHeight: 20,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
});
