import * as React from 'react';
import { ActivityIndicator, Pressable, Text, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link' | 'success';
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

const sizeStyles: Record<ButtonSize, string> = {
  default: 'h-10 px-4 rounded-lg',
  xs: 'h-7 px-2 rounded-md',
  sm: 'h-9 px-3 rounded-md',
  lg: 'h-11 px-5 rounded-lg',
  icon: 'h-10 w-10 rounded-lg',
  'icon-xs': 'h-7 w-7 rounded-md',
  'icon-sm': 'h-9 w-9 rounded-md',
  'icon-lg': 'h-11 w-11 rounded-lg',
};

export type ButtonProps = PressableProps & {
  className?: string;
  textClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isSuccess?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
};

export function Button({
  className,
  textClassName,
  style,
  variant = 'default',
  size = 'default',
  isLoading = false,
  isSuccess = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const { colors } = useThemeTokens();
  const finalVariant: ButtonVariant = isSuccess ? 'success' : variant;
  const isDisabled = disabled || isLoading;

  const variantStyle = React.useMemo<StyleProp<ViewStyle>>(() => {
    switch (finalVariant) {
      case 'outline':
        return { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 };
      case 'secondary':
        return { backgroundColor: colors.secondary, borderColor: colors.secondary, borderWidth: 1 };
      case 'ghost':
        return { backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 1 };
      case 'destructive':
        return { backgroundColor: colors.background === '#0f172a' ? '#4c1d1d' : '#fee2e2', borderColor: colors.destructive, borderWidth: 1 };
      case 'link':
        return { backgroundColor: 'transparent', borderColor: 'transparent', borderWidth: 0 };
      case 'success':
        return { backgroundColor: colors.success, borderColor: colors.success, borderWidth: 1 };
      default:
        return { backgroundColor: colors.primary, borderColor: colors.primary, borderWidth: 1 };
    }
  }, [colors, finalVariant]);

  const textColor =
    finalVariant === 'outline' || finalVariant === 'secondary' || finalVariant === 'ghost'
      ? colors.foreground
      : finalVariant === 'destructive'
        ? colors.destructive
        : finalVariant === 'link'
          ? colors.primary
          : finalVariant === 'success'
            ? colors.successForeground
            : colors.primaryForeground;

  return (
    <Pressable
      className={cn('flex-row items-center justify-center gap-2', sizeStyles[size], finalVariant === 'link' && 'px-0', isDisabled && 'opacity-50', className)}
      style={({ pressed }) => [variantStyle, typeof style === 'function' ? style({ pressed }) : style, pressed && !isDisabled ? { opacity: 0.88 } : null]}
      accessibilityRole="button"
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <ActivityIndicator size="small" color={textColor} /> : leftIcon}
      {typeof children === 'string' ? (
        <Text className={cn('text-sm font-medium', finalVariant === 'link' && 'underline', textClassName)} style={{ color: textColor }}>
          {isSuccess ? `✓ ${children}` : children}
        </Text>
      ) : children ? (
        <View className="flex-row items-center gap-2">
          {isSuccess ? <Text className="text-sm font-medium" style={{ color: textColor }}>✓</Text> : null}
          {children}
        </View>
      ) : null}
      {!isLoading ? rightIcon : null}
    </Pressable>
  );
}
