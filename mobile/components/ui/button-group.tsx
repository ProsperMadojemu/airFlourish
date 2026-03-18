import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export function ButtonGroup({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-row flex-wrap gap-2', className)} {...props} />;
}
