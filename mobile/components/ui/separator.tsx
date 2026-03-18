import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export function Separator({ className, style, ...props }: ViewProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <View
      className={cn('h-px w-full', className)}
      style={[{ backgroundColor: colors.border }, style]}
      {...props}
    />
  );
}
