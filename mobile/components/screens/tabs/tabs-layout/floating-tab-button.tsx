import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { getTabConfig, type TabRoute } from './config';
import { styles } from './styles';
import { rgba } from './utils';

type FloatingTabButtonProps = {
  route: TabRoute;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  primaryColor: string;
  inactiveIconColor: string;
  inactiveLabelColor: string;
  isDark: boolean;
};

export function FloatingTabButton({
  route,
  isFocused,
  onPress,
  onLongPress,
  primaryColor,
  inactiveIconColor,
  inactiveLabelColor,
  isDark,
}: FloatingTabButtonProps) {
  const progress = useSharedValue(isFocused ? 1 : 0);
  const config = getTabConfig(route.name);
  const inactiveTrayColor = rgba(primaryColor, 0);
  const activeTrayColor = rgba(primaryColor, isDark ? 0.12 : 0.08);
  const inactiveTrayBorderColor = rgba(primaryColor, 0);
  const activeTrayBorderColor = rgba(primaryColor, isDark ? 0.24 : 0.16);
  const inactiveBadgeBackground = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.96)';
  const activeBadgeBackground = primaryColor;
  const inactiveBadgeBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)';
  const activeBadgeBorder = 'rgba(255, 255, 255, 0.22)';
  const activeLabelColor = primaryColor;
  const glowColor = rgba(primaryColor, isDark ? 0.26 : 0.18);
  const activeBadgeShadowColor = isDark ? '#000000' : rgba(primaryColor, 0.22);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [isFocused, progress]);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveTrayColor, activeTrayColor],
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveTrayBorderColor, activeTrayBorderColor],
    ),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -2], Extrapolation.CLAMP) }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.84, 1.16], Extrapolation.CLAMP) }],
  }));

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveBadgeBackground, activeBadgeBackground],
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [inactiveBadgeBorder, activeBadgeBorder],
    ),
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -5], Extrapolation.CLAMP) },
      { scale: interpolate(progress.value, [0, 1], [1, 1.04], Extrapolation.CLAMP) },
    ],
    shadowColor: activeBadgeShadowColor,
    shadowOpacity: interpolate(progress.value, [0, 1], [0, 0.24]),
    elevation: interpolate(progress.value, [0, 1], [0, 6]),
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.62, 1]),
    color: interpolateColor(progress.value, [0, 1], [inactiveLabelColor, activeLabelColor]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -2], Extrapolation.CLAMP) }],
  }));

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 1], [6, 22], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0, 1], [0.16, 1]),
    backgroundColor: interpolateColor(progress.value, [0, 1], [inactiveLabelColor, activeLabelColor]),
  }));

  return (
    <View style={styles.tabSlot}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabPressable}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
      >
        <Animated.View style={[styles.tabButton, animatedButtonStyle]} pointerEvents="none">
          <Animated.View style={[styles.badgeGlow, { backgroundColor: glowColor }, animatedGlowStyle]} />
          <Animated.View style={[styles.iconBadge, animatedBadgeStyle]}>
            <Ionicons
              name={isFocused ? config.activeIcon : config.icon}
              size={20}
              color={isFocused ? '#ffffff' : inactiveIconColor}
            />
          </Animated.View>
          <Animated.Text numberOfLines={1} style={[styles.tabLabel, animatedLabelStyle]}>
            {config.label}
          </Animated.Text>
          <Animated.View style={[styles.tabIndicator, animatedIndicatorStyle]} />
        </Animated.View>
      </Pressable>
    </View>
  );
}
