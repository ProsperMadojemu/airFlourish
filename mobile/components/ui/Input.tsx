import * as React from 'react';
import { Text, TextInput, View, type TextInputProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export type InputProps = TextInputProps & {
  className?: string;
  containerClassName?: string;
  label?: string;
  error?: string;
};

const inputBaseClassName =
  'h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground';

const Input = React.forwardRef<TextInput, InputProps>(function Input(
  { className, containerClassName, label, error, ...props },
  ref
) {
  return (
    <View className={cn('w-full gap-1.5', containerClassName)}>
      {label ? <Text className="text-sm font-medium text-foreground">{label}</Text> : null}
      <TextInput
        ref={ref}
        placeholderTextColor="#637083"
        className={cn(inputBaseClassName, error && 'border-destructive', className)}
        {...props}
      />
      {error ? <Text className="text-sm text-destructive">{error}</Text> : null}
    </View>
  );
});

export function InputGroup({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('w-full flex-row items-center gap-2 rounded-lg border border-border bg-card px-3', className)} {...props} />;
}

export function InputGroupAddon({ className, children, ...props }: ViewProps & { className?: string; children?: React.ReactNode }) {
  return (
    <View className={cn('items-center justify-center', className)} {...props}>
      {typeof children === 'string' ? <Text className="text-sm text-muted-foreground">{children}</Text> : children}
    </View>
  );
}

export function InputGroupField({ className, ...props }: TextInputProps & { className?: string }) {
  return (
    <TextInput
      placeholderTextColor="#637083"
      className={cn('h-11 flex-1 text-base text-foreground', className)}
      {...props}
    />
  );
}

export { Input, inputBaseClassName };
export default Input;
