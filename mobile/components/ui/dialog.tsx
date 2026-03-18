import * as React from 'react';
import { Modal, Pressable, Text, View, type ViewProps } from 'react-native';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
  onConfirm,
}: DialogProps) {
  const { colors } = useThemeTokens();

  return (
    <Modal animationType="fade" transparent visible={open} onRequestClose={() => onOpenChange(false)}>
      <View className="flex-1 items-center justify-center px-5" style={{ backgroundColor: colors.overlay }}>
        <Pressable className="absolute inset-0" onPress={() => onOpenChange(false)} />
        <View
          className="w-full max-w-md rounded-2xl p-5"
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
        >
          <Text className="text-xl font-semibold" style={{ color: colors.cardForeground }}>{title}</Text>
          {description ? <Text className="mt-2 text-sm leading-5" style={{ color: colors.mutedForeground }}>{description}</Text> : null}
          {children ? <View className="mt-4">{children}</View> : null}
          <View className="mt-5 flex-row justify-end gap-2">
            <Button variant="outline" onPress={() => onOpenChange(false)}>{cancelLabel}</Button>
            <Button
              onPress={() => {
                onConfirm?.();
                onOpenChange(false);
              }}
            >
              {confirmLabel}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function DialogBody({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('gap-3', className)} {...props} />;
}
