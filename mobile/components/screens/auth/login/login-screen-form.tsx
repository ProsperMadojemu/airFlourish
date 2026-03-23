import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { PressableOpacity } from "pressto"
import { Button, FormAlert, Input, useThemeTokens } from '@/components/ui';
import { useLoginMutation } from '@/lib/hooks/auth/use-login-mutation';
import { getRequestErrorMessage } from '@/lib/utils/get-request-error-message';
import { LoginSchema, loginSchema } from '@/lib/validators/auth';
import { Link } from 'expo-router';

// type SocialButtonProps = {
//   icon: React.ReactNode;
//   label: string;
//   backgroundColor: string;
//   borderColor: string;
//   textColor: string;
// };

// function SocialButton({
//   icon,
//   label,
//   backgroundColor,
//   borderColor,
//   textColor,
// }: SocialButtonProps) {
//   return (
//     <PressableOpacity
//       disabled
//       className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl"
//       style={{
//         backgroundColor,
//         borderColor,
//         borderWidth: 1,
//       }}
//     >
//       {icon}
//       <Text className="text-base font-semibold" style={{ color: textColor }}>
//         {label}
//       </Text>
//     </PressableOpacity>
//   );
// }

export function LoginScreenForm() {
  const loginMutation = useLoginMutation();
  const { colors, isDark } = useThemeTokens();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const loginMail = process.env.EXPO_PUBLIC_LOGIN_EMAIL;
  const loginPassword = process.env.EXPO_PUBLIC_LOGIN_PASSWORD;

  const panelBackground = isDark ? '#0f172a' : colors.card;
  const panelBorder = isDark ? '#1f2b42' : '#e8ecf4';
  const fieldBackground = isDark ? '#111c2d' : '#ffffff';
  const fieldBorder = isDark ? '#22304a' : '#d9dee9';
  const dividerColor = isDark ? '#22304a' : '#dbe1ec';
  const iconColor = isDark ? '#94a3b8' : '#6b7280';

  const {
    reset,
    control,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: __DEV__ ? loginMail ?? '' : '',
      password: __DEV__ ? loginPassword ?? '' : '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: LoginSchema) => {
    setAuthError(null);

    try {
      await loginMutation.mutateAsync(values);
      // router.replace('/(protected)/(tabs)');
      reset();
    } catch (error) {
      setAuthError(
        getRequestErrorMessage(error, {
          fallbackMessage: 'Unable to sign in right now. Please check your details and try again.',
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
        Welcome Back
      </Text>
      <Text className="mt-2 text-base" style={{ color: colors.mutedForeground }}>
        Sign in to continue your journey
      </Text>

      <FormAlert message={authError} />

      <View className="mt-7 gap-5">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              editable={!loginMutation.isPending}
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
              editable={!loginMutation.isPending}
              label="Password"
              placeholder="Enter your password"
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
              autoComplete="password"
              textContentType="password"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              returnKeyType="done"
              secureTextEntry={!showPassword}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              onSubmitEditing={handleSubmit(onSubmit)}
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
      </View>

      <Text
        className="mt-3 self-end text-sm font-semibold"
        style={{ color: colors.primary }}
      >
        Forgot Password?
      </Text>

      <Button
        onPress={handleSubmit(onSubmit)}
        className="mt-6 h-14 w-full rounded-2xl"
        textClassName="text-base font-semibold"
        variant="default"
        isLoading={loginMutation.isPending}
        disabled={loginMutation.isPending}
        style={{
          shadowColor: colors.primary,
          shadowOpacity: isDark ? 0.28 : 0.18,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 14,
          elevation: 6,
        }}
      >
        Login
      </Button>

      <View className="mt-7 flex-row items-center gap-3">
        <View className="h-px flex-1" style={{ backgroundColor: dividerColor }} />
        <Text className="text-sm font-medium" style={{ color: colors.mutedForeground }}>
          Or login with
        </Text>
        <View className="h-px flex-1" style={{ backgroundColor: dividerColor }} />
      </View>

      {/* <View className="mt-5 flex-row gap-3">
        <SocialButton
          label="Google"
          backgroundColor={socialSurface}
          borderColor={socialBorder}
          textColor={colors.foreground}
          icon={<AntDesign name="google" size={18} color="#ea4335" />}
        />
        <SocialButton
          label="Facebook"
          backgroundColor={socialSurface}
          borderColor={socialBorder}
          textColor={colors.foreground}
          icon={<FontAwesome name="facebook" size={18} color="#1877f2" />}
        />
      </View> */}

      <Button
        // onPress={handleSubmit(onSubmit)}
        className="mt-6 h-14 w-full rounded-2xl"
        textClassName="text-base font-semibold"
        variant="default"
        disabled={loginMutation.isPending}
        style={{
          shadowColor: colors.kingschat,
          shadowOpacity: isDark ? 0.28 : 0.18,
          shadowOffset: { width: 0, height: 10 },
          backgroundColor: colors.kingschat,
          shadowRadius: 14,
          elevation: 6,
        }}
      >
        Kingschat
      </Button>

      <View className="mt-7 flex-row items-center justify-center gap-1.5">
        <Text className="text-sm" style={{ color: colors.mutedForeground }}>
          Don&apos;t have an account?
        </Text>
        <Link href="/(public)/(auth)/register" asChild>
          <PressableOpacity>
            <Text className="text-sm font-semibold" style={{ color: colors.primary }}>
              Register
            </Text>
          </PressableOpacity>
        </Link>
      </View>
    </View>
  );
}
