import { Text, View, ScrollView } from 'react-native';

import type { HomeDeal } from './data';
import { PlaceholderImageCard } from './placeholder-image-card';

type PromoDealsSectionProps = {
  deals: HomeDeal[];
};

export function PromoDealsSection({ deals }: PromoDealsSectionProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, gap: 16 }}
    >
      {deals.map((deal) => (
        <View key={deal.id} className="w-[280px] overflow-hidden rounded-xl">
          <PlaceholderImageCard
            label={deal.placeholderLabel}
            accentColor={deal.accentColor}
            height={148}
            width={280}
          />
          <View
            // locations={[0, 1]}
            // end={{ "x": 0.5, "y": 0 }}
            // start={{ "x": 0.5, "y": 2 }}
            className="absolute inset-x-0 bottom-0 p-4" 
            style={{ backgroundColor: 'rgba(230, 42, 43, 0.72)', borderTopRightRadius: 12 }}
          >
            <View className="self-start rounded-full bg-white/20 px-3 py-1">
              <Text className="text-xs font-bold text-white">{deal.badge}</Text>
            </View>
            <Text className="mt-2 text-2xl font-bold text-white" style={{ fontSize: 24 / 1.5 }}>
              {deal.title}
            </Text>
            <Text className="mt-1 text-base text-white/95">{deal.subtitle}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
