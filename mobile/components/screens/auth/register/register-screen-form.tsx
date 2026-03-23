import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { Button, Input, useThemeTokens } from '@/components/ui';
import { PressableOpacity } from '@/components/ui/pressable-opacity';
import { useRegisterMutation } from '@/lib/hooks/auth/use-register-mutation';
import { RegisterSchema, registerSchema } from '@/lib/validators/auth';

function getRegisterErrorMessage(error: unknown) {
  const fallbackMessage = 'Unable to create your account right now. Please try again in a moment.';

  if (typeof error !== 'object' || error === null) {
    return fallbackMessage;
  }

  const responseData = (error as {
    response?: {
      data?: {
        detail?: unknown;
        message?: unknown;
        email?: unknown;
        password?: unknown;
      };
    };
    message?: unknown;
  }).response?.data;

  if (typeof responseData?.detail === 'string') {
    return responseData.detail;
  }

  if (typeof responseData?.message === 'string') {
    return responseData.message;
  }

  if (Array.isArray(responseData?.email) && typeof responseData.email[0] === 'string') {
    return responseData.email[0];
  }

  if (Array.isArray(responseData?.password) && typeof responseData.password[0] === 'string') {
    return responseData.password[0];
  }

  const errorMessage = (error as { message?: unknown }).message;

  return typeof errorMessage === 'string' ? errorMessage : fallbackMessage;
}

export function RegisterScreenForm() {
  const registerMutation = useRegisterMutation();
  const router = useRouter();
  const { colors, isDark } = useThemeTokens();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const panelBackground = isDark ? '#0f172a' : colors.card;
  const panelBorder = isDark ? '#1f2b42' : '#e8ecf4';
  const fieldBackground = isDark ? '#111c2d' : '#ffffff';
  const fieldBorder = isDark ? '#22304a' : '#d9dee9';
  const iconColor = isDark ? '#94a3b8' : '#6b7280';

  const {
    reset,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: RegisterSchema) => {
    setAuthError(null);

    try {
      await registerMutation.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name || '',
        email: values.email,
        password: values.password,
        user_type: 'regular',
      });
      reset();
      router.replace('/(public)/(auth)/login');
    } catch (error) {
      setAuthError(getRegisterErrorMessage(error));
    }
  };

  return (
    <View
      className="rounded-[32px] px-6 pb-8 pt-7"
      style={{
        backgroundColor: panelBackground,
        borderColor: panelBorder,
        borderWidth: 1,
        shadowColor: colors.shadow,
        shadowOpacity: isDark ? 0.32 : 0.1,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 20,
        elevation: 10,
      }}
    >
      <Text className="text-[34px] font-bold leading-tight" style={{ color: colors.foreground }}>
        Create Account
      </Text>
      <Text className="mt-2 text-base" style={{ color: colors.mutedForeground }}>
        Sign up to start your AirFlourish journey
      </Text>

      {authError ? (
        <View
          className="mt-5 rounded-2xl px-4 py-3"
          style={{
            backgroundColor: isDark ? 'rgba(248, 113, 113, 0.12)' : '#fff1f2',
            borderColor: isDark ? 'rgba(248, 113, 113, 0.18)' : '#fecdd3',
            borderWidth: 1,
          }}
        >
          <Text className="text-sm" style={{ color: colors.destructive }}>
            {authError}
          </Text>
        </View>
      ) : null}

      <View className="mt-7 gap-5">
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="First Name"
              placeholder="Enter your first name"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('first_name');
                onChange(text);
              }}
              value={value}
              error={errors.first_name?.message}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="givenName"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="user" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.first_name ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="last_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Last Name"
              placeholder="Enter your last name"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('last_name');
                onChange(text);
              }}
              value={value}
              error={errors.last_name?.message}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="familyName"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="user" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.last_name ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Email Address"
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('email');
                onChange(text);
              }}
              value={value}
              error={errors.email?.message}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="mail" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.email ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Password"
              placeholder="Create a password"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('password');
                onChange(text);
              }}
              value={value}
              error={errors.password?.message}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password-new"
              textContentType="newPassword"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              secureTextEntry={!showPassword}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="lock" size={18} color={iconColor} />}
              rightIcon={
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                  hitSlop={10}
                  onPress={() => setShowPassword((current) => !current)}
                >
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={iconColor}
                  />
                </Pressable>
              }
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.password ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Confirm Password"
              placeholder="Re-enter your password"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('confirmPassword');
                onChange(text);
              }}
              value={value}
              error={errors.confirmPassword?.message}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="done"
              secureTextEntry={!showConfirmPassword}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              onSubmitEditing={handleSubmit(onSubmit)}
              leftIcon={<Feather name="shield" size={18} color={iconColor} />}
              rightIcon={
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  hitSlop={10}
                  onPress={() => setShowConfirmPassword((current) => !current)}
                >
                  <Feather
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={18}
                    color={iconColor}
                  />
                </Pressable>
              }
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.confirmPassword ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        className="mt-7 h-14 w-full rounded-2xl"
        textClassName="text-base font-semibold"
        variant="default"
        isLoading={registerMutation.isPending}
        disabled={registerMutation.isPending}
        style={{
          shadowColor: colors.primary,
          shadowOpacity: isDark ? 0.28 : 0.18,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 14,
          elevation: 6,
        }}
      >
        Sign Up
      </Button>

      <View className="mt-7 flex-row items-center justify-center gap-1.5">
        <Text className="text-sm" style={{ color: colors.mutedForeground }}>
          Already have an account?
        </Text>
        <Link href="/(public)/(auth)/login" asChild>
          <PressableOpacity>
            <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
              Login
            </Text>
          </PressableOpacity>
        </Link>
      </View>
    </View>
  );
}
