import * as React from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

type FormAlertVariant = 'error' | 'success' | 'info';

type FormAlertProps = ViewProps & {
  className?: string;
  message?: string | null;
  textClassName?: string;
  textProps?: TextProps;
  variant?: FormAlertVariant;
};

const variantStyles = {
  error: {
    lightBackground: '#fff1f2',
    darkBackground: 'rgba(248, 113, 113, 0.12)',
    lightBorder: '#fecdd3',
    darkBorder: 'rgba(248, 113, 113, 0.18)',
  },
  success: {
    lightBackground: '#ecfdf5',
    darkBackground: 'rgba(16, 185, 129, 0.14)',
    lightBorder: '#a7f3d0',
    darkBorder: 'rgba(16, 185, 129, 0.2)',
  },
  info: {
    lightBackground: '#eff6ff',
    darkBackground: 'rgba(59, 130, 246, 0.14)',
    lightBorder: '#bfdbfe',
    darkBorder: 'rgba(59, 130, 246, 0.2)',
  },
} as const;

const variantTextColors = {
  error: 'destructive',
  success: 'success',
  info: 'primary',
} as const;

export function FormAlert({
  className,
  message,
  textClassName,
  textProps,
  variant = 'error',
  style,
  ...props
}: FormAlertProps) {
  const { colors, isDark } = useThemeTokens();

  if (!message) return null;

  const currentVariant = variantStyles[variant];
  const textColorKey = variantTextColors[variant];

  return (
    <View
      accessibilityRole="alert"
      className={cn('mt-5 rounded-2xl px-4 py-3', className)}
      style={[
        {
          backgroundColor: isDark ? currentVariant.darkBackground : currentVariant.lightBackground,
          borderColor: isDark ? currentVariant.darkBorder : currentVariant.lightBorder,
          borderWidth: 1,
        },
        style,
      ]}
      {...props}
    >
      <Text
        className={cn('text-sm', textClassName)}
        style={{ color: colors[textColorKey] }}
        {...textProps}
      >
        {message}
      </Text>
    </View>
  );
}
