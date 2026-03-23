import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type ViewProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { cn } from '@/lib/utils';
import { useThemeTokens } from '@/components/ui/theme';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = ViewProps & {
  className?: string;
  containerClassName?: string;
  triggerClassName?: string;
  label?: string;
  placeholder?: string;
  value?: string | null;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  leftIcon?: React.ReactNode;
  onValueChange: (value: string) => void;
};

export function SelectField({
  className,
  containerClassName,
  triggerClassName,
  label,
  placeholder = 'Select an option',
  value,
  options,
  error,
  disabled = false,
  title = 'Choose an option',
  description,
  searchPlaceholder = 'Search options',
  searchable = false,
  leftIcon,
  onValueChange,
  style,
  ...props
}: SelectFieldProps) {
  const { colors, isDark } = useThemeTokens();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const filteredOptions = React.useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) return options;

    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, searchQuery]);

  const closePicker = React.useCallback(() => {
    setOpen(false);
    setSearchQuery('');
  }, []);

  const selectValue = React.useCallback(
    (nextValue: string) => {
      onValueChange(nextValue);
      closePicker();
    },
    [closePicker, onValueChange]
  );

  return (
    <>
      <View className={cn('w-full gap-1.5', containerClassName)} style={style} {...props}>
        {label ? <Text className="text-sm font-medium" style={{ color: colors.foreground }}>{label}</Text> : null}
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          className={cn(
            'min-h-14 w-full flex-row items-center gap-3 rounded-2xl border px-4',
            disabled && 'opacity-70',
            triggerClassName
          )}
          onPress={() => setOpen(true)}
          style={{
            backgroundColor: isDark ? '#111c2d' : colors.background,
            borderColor: error ? colors.destructive : isDark ? '#22304a' : '#d9dee9',
            borderWidth: 1,
          }}
        >
          {leftIcon ? <View className="items-center justify-center">{leftIcon}</View> : null}
          <Text
            className={cn('flex-1 text-base', className)}
            numberOfLines={1}
            style={{ color: selectedOption ? colors.foreground : colors.mutedForeground }}
          >
            {selectedOption?.label ?? placeholder}
          </Text>
          <Feather name="chevron-down" size={18} color={colors.mutedForeground} />
        </Pressable>
        {error ? <Text className="text-sm" style={{ color: colors.destructive }}>{error}</Text> : null}
      </View>

      <Modal animationType="slide" transparent visible={open} onRequestClose={closePicker}>
        <View className="flex-1 justify-end" style={{ backgroundColor: colors.overlay }}>
          <Pressable className="absolute inset-0" onPress={closePicker} />
          <View
            className="rounded-t-[30px] px-5 pb-6 pt-5"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderTopWidth: 1,
              maxHeight: '78%',
            }}
          >
            <View className="items-center">
              <View
                className="mb-4 h-1.5 w-12 rounded-full"
                style={{ backgroundColor: isDark ? '#334155' : '#cbd5e1' }}
              />
            </View>
            <Text className="text-xl font-semibold" style={{ color: colors.cardForeground }}>
              {title}
            </Text>
            {description ? (
              <Text className="mt-2 text-sm leading-5" style={{ color: colors.mutedForeground }}>
                {description}
              </Text>
            ) : null}

            {searchable ? (
              <View
                className="mt-4 flex-row items-center gap-3 rounded-2xl border px-4"
                style={{
                  backgroundColor: isDark ? '#111c2d' : colors.background,
                  borderColor: isDark ? '#22304a' : '#d9dee9',
                  borderWidth: 1,
                }}
              >
                <Feather name="search" size={18} color={colors.mutedForeground} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={colors.mutedForeground}
                  className="h-12 flex-1 text-base"
                  style={{ color: colors.foreground }}
                />
              </View>
            ) : null}

            <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
              <View className="gap-2">
                {filteredOptions.map((option) => {
                  const isSelected = option.value === value;

                  return (
                    <Pressable
                      key={option.value}
                      className="flex-row items-center justify-between rounded-2xl px-4 py-3"
                      onPress={() => selectValue(option.value)}
                      style={{
                        backgroundColor: isSelected ? colors.accent : isDark ? '#0f172a' : colors.background,
                        borderColor: isSelected ? colors.primary : colors.border,
                        borderWidth: 1,
                      }}
                    >
                      <Text
                        className="flex-1 text-base"
                        style={{ color: isSelected ? colors.primary : colors.foreground }}
                      >
                        {option.label}
                      </Text>
                      {isSelected ? <Feather name="check" size={18} color={colors.primary} /> : null}
                    </Pressable>
                  );
                })}

                {filteredOptions.length === 0 ? (
                  <View
                    className="rounded-2xl px-4 py-5"
                    style={{
                      backgroundColor: isDark ? '#0f172a' : colors.background,
                      borderColor: colors.border,
                      borderWidth: 1,
                    }}
                  >
                    <Text className="text-sm" style={{ color: colors.mutedForeground }}>
                      No options match your search.
                    </Text>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
