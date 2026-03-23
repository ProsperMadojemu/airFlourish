import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeTokens } from '@/components/ui';

import { CustomScreenHeader } from './shared/custom-screen-header';
import { DESTINATIONS, PROMO_DEALS, QUICK_ACTIONS } from './home-screen/data';
import { DestinationsSection } from './home-screen/destinations-section';
import { HomeIntro } from './home-screen/home-intro';
import { PromoDealsSection } from './home-screen/promo-deals-section';
import { QuickActionsSection } from './home-screen/quick-actions-section';

export default function HomeScreen() {
  const { colors, isDark } = useThemeTokens();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? 'light' : 'light'} />

      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.primary }}>
        <CustomScreenHeader />
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeIntro />
        <PromoDealsSection deals={PROMO_DEALS} />
        <QuickActionsSection actions={QUICK_ACTIONS} />
        <DestinationsSection destinations={DESTINATIONS} />
      </ScrollView>
    </View>
  );
}
