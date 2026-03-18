import * as React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { cn } from '@/lib/utils';

type InputOTPProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
};

export function InputOTP({ value, onChange, maxLength = 6, className, disabled }: InputOTPProps) {
  const inputRef = React.useRef<TextInput>(null);
  const digits = Array.from({ length: maxLength }, (_, index) => value[index] ?? '');

  return (
    <Pressable
      className={cn('w-full gap-2', className)}
      disabled={disabled}
      onPress={() => inputRef.current?.focus()}
    >
      <View className="flex-row justify-between gap-2">
        {digits.map((digit, index) => (
          <View
            key={index}
            className={cn(
              'h-12 w-11 items-center justify-center rounded-lg border border-input bg-background',
              index === value.length && !disabled && 'border-primary'
            )}
          >
            <Text className="text-lg font-semibold text-foreground">{digit || '•'}</Text>
          </View>
        ))}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, maxLength))}
        keyboardType="number-pad"
        maxLength={maxLength}
        editable={!disabled}
        className="absolute h-0 w-0 opacity-0"
      />
    </Pressable>
  );
}
