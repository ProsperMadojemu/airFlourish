import * as React from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

type CardSize = 'default' | 'sm';

type CardRootProps = ViewProps & {
  className?: string;
  size?: CardSize;
};

export function Card({ className, style, size = 'default', ...props }: CardRootProps) {
  const { colors } = useThemeTokens();

  return (
    <View
      className={cn('overflow-hidden rounded-xl', size === 'sm' ? 'py-4' : 'py-6', className)}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          shadowColor: colors.shadow,
          shadowOpacity: 1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        },
        style,
      ]}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('gap-1 px-6', className)} {...props} />;
}

export function CardTitle({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-base font-medium leading-normal', className)}
      style={[{ color: colors.cardForeground }, style]}
      {...props}
    />
  );
}

export function CardDescription({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-sm', className)}
      style={[{ color: colors.mutedForeground }, style]}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('self-end', className)} {...props} />;
}

export function CardContent({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('px-6', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-row items-center px-6', className)} {...props} />;
}
