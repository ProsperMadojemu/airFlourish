import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { useThemeTokens } from '@/components/ui';

import type { QuickAction } from './data';
import { SectionHeading } from './section-heading';
import { Link } from 'expo-router';

type QuickActionsSectionProps = {
  actions: QuickAction[];
};

export function QuickActionsSection({ actions }: QuickActionsSectionProps) {
  const { colors } = useThemeTokens();

  return (
    <View className="pt-4">
      <SectionHeading title="Quick Actions" />
      <View className="flex-row flex-wrap justify-between gap-y-4 px-6">
        {actions.map((action) => (
          <Link key={action.id} href={action.href} asChild>
            <Pressable className="items-center" style={{ width: '22%' }}>
              <View
                className="h-14 w-14 items-center justify-center rounded-[18px]"
                style={{ backgroundColor: colors.accent }}
              >
                <Ionicons name={action.icon} size={24} color={colors.primary} />
              </View>
              <Text className="mt-3 text-center text-sm font-medium" style={{ color: colors.foreground }}>
                {action.label}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}
