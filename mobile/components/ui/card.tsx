import * as React from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export function Card({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('rounded-2xl border border-border bg-card p-4 shadow-xs', className)} {...props} />;
}

export function CardTitle({ className, ...props }: TextProps & { className?: string }) {
  return <Text className={cn('text-lg font-semibold text-card-foreground', className)} {...props} />;
}

export function CardDescription({ className, ...props }: TextProps & { className?: string }) {
  return <Text className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
