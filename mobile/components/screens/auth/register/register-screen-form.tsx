import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { Button, FormAlert, Input, SelectField, useThemeTokens } from '@/components/ui';
import { PressableOpacity } from '@/components/ui/pressable-opacity';
import { countries } from '@/lib/constants/countries';
import { useRegisterMutation } from '@/lib/hooks/auth/use-register-mutation';
import { getRequestErrorMessage } from '@/lib/utils/get-request-error-message';
import { RegisterSchema, registerSchema } from '@/lib/validators/auth';

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
  const countryOptions = useMemo(
    () => countries.countries.map((country) => ({ label: country.name, value: country.code })),
    []
  );

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
      phone_number: '',
      country: '',
      church: '',
      zone: '',
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
        first_name: values.first_name || undefined,
        last_name: values.last_name || undefined,
        email: values.email,
        password: values.password,
        phone_number: values.phone_number || null,
        country: values.country,
        church: values.church || null,
        zone: values.zone || null,
        user_type: 'regular',
      });
      reset();
      router.replace('/(public)/(auth)/login');
    } catch (error) {
      console.error('Register error:', error);

      setAuthError(
        getRequestErrorMessage(error, {
          fallbackMessage: 'Unable to create your account right now. Please try again in a moment.',
          preferredKeys: ['email', 'password', 'country', 'phone_number', 'church', 'zone', 'first_name', 'last_name'],
        })
      );
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

      <FormAlert message={authError} />

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
          name="phone_number"
          render={({ field: { onChange, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Phone Number"
              placeholder="Enter your phone number"
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('phone_number');
                onChange(text);
              }}
              value={value}
              error={errors.phone_number?.message}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="phone" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.phone_number ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, value } }) => (
            <SelectField
              disabled={registerMutation.isPending}
              label="Country"
              placeholder="Select your country"
              value={value}
              options={countryOptions}
              error={errors.country?.message}
              searchable
              title="Select your country"
              description="Choose the country linked to your account."
              searchPlaceholder="Search countries"
              leftIcon={<Feather name="map-pin" size={18} color={iconColor} />}
              onValueChange={(selectedValue) => {
                setAuthError(null);
                clearErrors('country');
                onChange(selectedValue);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="church"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Church"
              placeholder="Enter your church"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('church');
                onChange(text);
              }}
              value={value}
              error={errors.church?.message}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="home" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.church ? colors.destructive : fieldBorder,
              }}
              className="h-14 text-base"
            />
          )}
        />

        <Controller
          control={control}
          name="zone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!registerMutation.isPending}
              label="Zone"
              placeholder="Enter your zone"
              onBlur={onBlur}
              onChangeText={(text) => {
                setAuthError(null);
                clearErrors('zone');
                onChange(text);
              }}
              value={value}
              error={errors.zone?.message}
              autoCapitalize="words"
              autoCorrect={false}
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="next"
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              leftIcon={<Feather name="grid" size={18} color={iconColor} />}
              inputContainerClassName="min-h-14 rounded-2xl px-4"
              inputContainerStyle={{
                backgroundColor: fieldBackground,
                borderColor: errors.zone ? colors.destructive : fieldBorder,
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
