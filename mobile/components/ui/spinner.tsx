import { ActivityIndicator, View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export function Spinner({ className, ...props }: ViewProps & { className?: string }) {
  return (
    <View className={cn('items-center justify-center', className)} {...props}>
      <ActivityIndicator size="small" color="#fcfdff" />
    </View>
  );
}
