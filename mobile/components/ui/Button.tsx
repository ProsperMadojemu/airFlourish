import * as React from 'react';
import { ActivityIndicator, Pressable, Text, View, type PressableProps } from 'react-native';

import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link' | 'success';
type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-primary border-primary',
  outline: 'border-border bg-background',
  secondary: 'bg-secondary border-secondary',
  ghost: 'bg-transparent border-transparent',
  destructive: 'bg-destructive/10 border-destructive/20',
  link: 'bg-transparent border-transparent px-0',
  success: 'bg-success border-success',
};

const textVariantStyles: Record<ButtonVariant, string> = {
  default: 'text-primary-foreground',
  outline: 'text-foreground',
  secondary: 'text-secondary-foreground',
  ghost: 'text-foreground',
  destructive: 'text-destructive',
  link: 'text-primary underline',
  success: 'text-white',
};

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
  const finalVariant: ButtonVariant = isSuccess ? 'success' : variant;
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center gap-2 border shadow-xs',
        variantStyles[finalVariant],
        sizeStyles[size],
        isDisabled && 'opacity-50',
        className
      )}
      accessibilityRole="button"
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={finalVariant === 'outline' || finalVariant === 'secondary' || finalVariant === 'ghost' || finalVariant === 'link' ? '#1f2937' : '#fcfdff'} />
      ) : (
        leftIcon
      )}
      {typeof children === 'string' ? (
        <Text className={cn('text-sm font-medium', textVariantStyles[finalVariant], textClassName)}>
          {isSuccess ? `✓ ${children}` : children}
        </Text>
      ) : children ? (
        <View className="flex-row items-center gap-2">
          {isSuccess ? <Text className={cn('text-sm font-medium', textVariantStyles[finalVariant])}>✓</Text> : null}
          {children}
        </View>
      ) : null}
      {!isLoading ? rightIcon : null}
    </Pressable>
  );
}
