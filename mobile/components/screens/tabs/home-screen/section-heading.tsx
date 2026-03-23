import { Pressable, Text, View } from 'react-native';

import { useThemeTokens } from '@/components/ui';

type SectionHeadingProps = {
  title: string;
  actionLabel?: string;
};

export function SectionHeading({ title, actionLabel }: SectionHeadingProps) {
  const { colors } = useThemeTokens();

  return (
    <View className="mb-4 flex-row items-center justify-between px-6">
      <Text className="text-2xl font-bold" style={{ color: colors.foreground }}>
        {title}
      </Text>
      {actionLabel ? (
        <Pressable accessibilityRole="button">
          <Text className="text-base font-semibold" style={{ color: colors.primary }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
