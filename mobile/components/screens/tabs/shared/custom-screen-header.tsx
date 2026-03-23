import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import { Logo } from '@/components/logo';
import { useThemeTokens } from '@/components/ui';

type HeaderActionButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  badgeCount?: number;
  accessibilityLabel: string;
  onPress?: () => void;
};

function HeaderActionButton({ icon, badgeCount, accessibilityLabel, onPress }: HeaderActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className="relative h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
    >
      <Ionicons name={icon} size={22} color="#ffffff" />
      {badgeCount ? (
        <View className="absolute right-1.5 top-1.5 min-h-3.z5 min-w-3.5 items-center justify-center rounded-full bg-white px-1">
          <Text className="text-[10px] font-bold" style={{ color: '#ef4444' }}>
            {badgeCount}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function CustomScreenHeader() {
  const { colors } = useThemeTokens();
  const navigation = useNavigation();

  return (
    <View
      className="flex-row items-center justify-between px-5 pb-4 pt-2"
      style={{ backgroundColor: colors.primary }}
    >
      <HeaderActionButton
        icon="menu-outline"
        accessibilityLabel="Open menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

      <View className="flex-1 items-center px-4">
        <Logo width={140} accessibilityLabel="AirFlourish logo" />
      </View>

      <HeaderActionButton icon="notifications-outline" badgeCount={3} accessibilityLabel="Notifications" />
    </View>
  );
}
