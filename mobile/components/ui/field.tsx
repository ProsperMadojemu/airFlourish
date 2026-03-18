import * as React from 'react';
import { Text, View, type TextProps, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useThemeTokens } from '@/components/ui/theme';

type Orientation = 'vertical' | 'horizontal' | 'responsive';

type FieldErrorItem = { message?: string } | undefined;

export function FieldSet({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-col gap-6', className)} {...props} />;
}

export function FieldLegend({
  className,
  style,
  variant = 'legend',
  ...props
}: TextProps & { className?: string; variant?: 'legend' | 'label' }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('mb-3 font-medium', variant === 'label' ? 'text-sm' : 'text-base', className)}
      style={[{ color: colors.foreground }, style]}
      {...props}
    />
  );
}

export function FieldGroup({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('w-full flex-col gap-4', className)} {...props} />;
}

export function Field({
  className,
  orientation = 'vertical',
  ...props
}: ViewProps & { className?: string; orientation?: Orientation }) {
  return (
    <View
      className={cn(
        'w-full gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-start',
        className
      )}
      {...props}
    />
  );
}

export function FieldContent({ className, ...props }: ViewProps & { className?: string }) {
  return <View className={cn('flex-1 flex-col gap-1', className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label> & { className?: string }) {
  return <Label className={cn('w-fit', className)} {...props} />;
}

export function FieldTitle({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('w-fit items-center text-sm font-medium leading-snug', className)}
      style={[{ color: colors.foreground }, style]}
      {...props}
    />
  );
}

export function FieldDescription({ className, style, ...props }: TextProps & { className?: string }) {
  const { colors } = useThemeTokens();

  return (
    <Text
      className={cn('text-left text-sm leading-normal font-normal', className)}
      style={[{ color: colors.mutedForeground }, style]}
      {...props}
    />
  );
}

export function FieldSeparator({
  children,
  className,
  ...props
}: ViewProps & { className?: string; children?: React.ReactNode }) {
  const { colors } = useThemeTokens();

  return (
    <View className={cn('my-1 h-5 justify-center', className)} {...props}>
      <Separator />
      {children ? (
        <View className="absolute inset-0 items-center justify-center">
          <View className="px-2" style={{ backgroundColor: colors.background }}>
            {typeof children === 'string' ? (
              <Text className="text-sm" style={{ color: colors.mutedForeground }}>
                {children}
              </Text>
            ) : (
              children
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}

export function FieldError({
  className,
  style,
  children,
  errors,
  ...props
}: TextProps & {
  className?: string;
  errors?: FieldErrorItem[];
}) {
  const { colors } = useThemeTokens();

  const content = React.useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueMessages = [...new Set(errors.map((error) => error?.message).filter(Boolean))] as string[];
    return uniqueMessages.join('\n');
  }, [children, errors]);

  if (!content) return null;

  return (
    <Text
      accessibilityRole="alert"
      className={cn('text-sm font-normal', className)}
      style={[{ color: colors.destructive }, style]}
      {...props}
    >
      {content}
    </Text>
  );
}
