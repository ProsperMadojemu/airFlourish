import { ActivityIndicator, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export function Spinner({ className, ...props }: ViewProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <View className={cn('items-center justify-center', className)} {...props}>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
}
