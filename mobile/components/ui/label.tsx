import { Text, type TextProps } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export function Label({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-sm font-medium leading-snug', className)}
      style={[{ color: colors.foreground }, style]}
      {...props}
    />
  );
}
