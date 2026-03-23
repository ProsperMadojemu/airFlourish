import * as React from 'react';
import { Text, TextInput, View, type StyleProp, type TextInputProps, type ViewProps, type ViewStyle } from 'react-native';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export type InputProps = TextInputProps & {
  className?: string;
  containerClassName?: string;
  inputContainerClassName?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const inputBaseClassName = 'h-11 flex-1 px-0 py-2 text-base';
const inputContainerBaseClassName = 'w-full flex-row items-center gap-3 rounded-lg border px-3';

const Input = React.forwardRef<TextInput, InputProps>(function Input(
  {
    className,
    containerClassName,
    inputContainerClassName,
    inputContainerStyle,
    label,
    error,
    style,
    leftIcon,
    rightIcon,
    editable = true,
    placeholderTextColor,
    ...props
  },
  ref
) {
  const { colors, isDark } = useThemeTokens();

  return (
    <View className={cn('w-full gap-1.5', containerClassName)}>
      {label ? <Text className="text-sm font-medium" style={{ color: colors.foreground }}>{label}</Text> : null}
      <View
        className={cn(
          inputContainerBaseClassName,
          !editable && 'opacity-70',
          inputContainerClassName
        )}
        style={[
          {
            backgroundColor: isDark ? '#172033' : colors.background,
            borderColor: error ? colors.destructive : colors.input,
            borderWidth: 1,
          },
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View className="items-center justify-center">{leftIcon}</View> : null}
        <TextInput
          ref={ref}
          editable={editable}
          placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
          className={cn(inputBaseClassName, className)}
          style={[
            {
              color: colors.foreground,
            },
            style,
          ]}
          {...props}
        />
        {rightIcon ? <View className="items-center justify-center">{rightIcon}</View> : null}
      </View>
      {error ? <Text className="text-sm" style={{ color: colors.destructive }}>{error}</Text> : null}
    </View>
  );
});

export function InputGroup({ className, style, ...props }: ViewProps & { className?: string }) {
  const { colors, isDark } = useThemeTokens();

  return (
    <View
      className={cn('w-full flex-row items-center gap-2 rounded-lg px-3', className)}
      style={[{ backgroundColor: isDark ? '#172033' : colors.card, borderColor: colors.border, borderWidth: 1 }, style]}
      {...props}
    />
  );
}

export function InputGroupAddon({ className, children, ...props }: ViewProps & { className?: string; children?: React.ReactNode }) {
  const { colors } = useThemeTokens();

  return (
    <View className={cn('items-center justify-center', className)} {...props}>
      {typeof children === 'string' ? <Text className="text-sm" style={{ color: colors.mutedForeground }}>{children}</Text> : children}
    </View>
  );
}

export function InputGroupField({ className, style, ...props }: TextInputProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <TextInput
      placeholderTextColor={colors.mutedForeground}
      className={cn('h-11 flex-1 text-base', className)}
      style={[{ color: colors.foreground }, style]}
      {...props}
    />
  );
}

export { Input, inputBaseClassName };
export default Input;
