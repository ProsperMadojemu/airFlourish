import * as React from 'react';
import { Pressable, Text, View, type PressableProps, type TextProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useThemeTokens } from '@/components/ui/theme';

type ItemVariant = 'default' | 'outline' | 'muted';
type ItemSize = 'default' | 'sm' | 'xs';

export function ItemGroup({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('w-full flex-col gap-4', className)} {...props} />;
}

export function ItemSeparator({ className, ...props }: ViewProps & { className?: string }) {
  return <Separator className={cn('my-2', className)} {...props} />;
}

export function Item({
  className,
  style,
  variant = 'default',
  size = 'default',
  ...props
}: PressableProps & { className?: string; variant?: ItemVariant; size?: ItemSize }) {
  const { colors } = useThemeTokens();

  const backgroundColor =
    variant === 'muted' ? colors.muted : colors.card;
  const borderColor = variant === 'outline' ? colors.border : 'transparent';

  return (
    <Pressable
      className={cn(
        'w-full flex-row flex-wrap items-center rounded-md',
        size === 'default' ? 'gap-3.5 px-4 py-3.5' : size === 'sm' ? 'gap-2.5 px-3 py-2.5' : 'gap-2 px-2.5 py-2',
        className
      )}
      style={({ pressed }) => [{ backgroundColor, borderColor, borderWidth: 1 }, typeof style === 'function' ? style({ pressed }) : style, pressed ? { opacity: 0.92 } : null]}
      {...props}
    />
  );
}

export function ItemMedia({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('shrink-0 items-center justify-center', className)} {...props} />;
}

export function ItemContent({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-1 flex-col gap-1', className)} {...props} />;
}

export function ItemTitle({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-sm font-medium leading-snug', className)}
      style={[{ color: colors.foreground }, style]}
      {...props}
    />
  );
}

export function ItemDescription({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-sm leading-normal', className)}
      style={[{ color: colors.mutedForeground }, style]}
      {...props}
    />
  );
}

export function ItemActions({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-row items-center gap-2', className)} {...props} />;
}

export function ItemHeader({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('basis-full flex-row items-center justify-between gap-2', className)} {...props} />;
}

export function ItemFooter({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('basis-full flex-row items-center justify-between gap-2', className)} {...props} />;
}
