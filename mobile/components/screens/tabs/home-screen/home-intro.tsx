import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Input, useThemeTokens } from '@/components/ui';
import { useAuth } from '@/lib/hooks/use-auth';

export function HomeIntro() {
  const { colors } = useThemeTokens();
  const { user } = useAuth();

  return (
    <View className="px-6 pb-2 pt-7">
      <Text className="text-[34px] font-bold" style={{ color: colors.foreground, fontSize: 34 / 1.6 }}>
        Hello, {user?.first_name ?? 'Traveler'}!
      </Text>
      <Text className="mt-1 text-lg" style={{ color: colors.mutedForeground }}>
        Where do you want to go?
      </Text>

      <Input
        accessibilityLabel="Search flights and hotels"
        containerClassName="mt-5"
        inputContainerClassName="rounded-xl border-0 px-4"
        inputContainerStyle={{ backgroundColor: colors.card }}
        placeholder="Search flights, hotels..."
        leftIcon={<Ionicons name="search-outline" size={20} color={colors.mutedForeground} />}
        returnKeyType="search"
      />
    </View>
  );
}
