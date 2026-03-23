import type { ReactNode } from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/components/logo';
import { useThemeTokens } from '@/components/ui';
import { KeyboardAwareScrollView, KeyboardGestureArea } from 'react-native-keyboard-controller';

type AuthScreenShellProps = {
  children: ReactNode;
  heroCaption?: string;
};

export function AuthScreenShell({
  children,
  heroCaption = 'Your Journey Begins Here',
}: AuthScreenShellProps) {
  const { colors, isDark } = useThemeTokens();

  const pageBackground = isDark ? '#070d18' : '#f6f7fb';
  const heroBackground = isDark ? '#8f1d24' : colors.primary;
  const heroCardBackground = isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.94)';
  const heroCardBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.42)';
  const heroCaptionColor = isDark ? '#fecdd3' : '#991b1b';
  const decorationPrimary = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.16)';
  const decorationSecondary = isDark ? 'rgba(15, 23, 42, 0.18)' : 'rgba(127, 29, 29, 0.12)';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pageBackground }}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <KeyboardGestureArea>
          <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1, backgroundColor: pageBackground }}>
              <View
                className="overflow-hidden px-6 pb-20 pt-4"
                style={{
                  backgroundColor: heroBackground,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
              >
                <View
                  className="absolute -left-20 top-8 h-56 w-56 rounded-full"
                  style={{ backgroundColor: decorationPrimary }}
                />
                <View
                  className="absolute -right-24 top-20 h-72 w-72 rounded-full"
                  style={{ backgroundColor: decorationSecondary }}
                />
                <View
                  className="absolute bottom-0 left-10 h-36 w-36 rounded-full"
                  style={{ backgroundColor: decorationSecondary }}
                />

                <View className="items-center pt-8">
                  <View
                    className="mt-5 w-full items-center rounded-[28px] px-6 py-6"
                    style={{
                      backgroundColor: heroCardBackground,
                      borderColor: heroCardBorder,
                      borderWidth: 1,
                    }}
                  >
                    <Logo width={170} accessibilityLabel="AirFlourish logo" />
                    <Text
                      className="mt-4 text-center text-base font-semibold"
                      style={{ color: heroCaptionColor }}
                    >
                      {heroCaption}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="px-6 pb-10" style={{ marginTop: -42 }}>
                {children}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardGestureArea>
      </KeyboardAvoidingView>
      {/* <KeyboardToolbar /> */}
    </SafeAreaView>
  );
}
