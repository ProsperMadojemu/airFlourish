import { ScrollView, View } from 'react-native';

import { Card, CardContent, CardDescription, CardTitle, useThemeTokens } from '@/components/ui';

import type { Destination } from './data';
import { PlaceholderImageCard } from './placeholder-image-card';
import { SectionHeading } from './section-heading';

type DestinationsSectionProps = {
  destinations: Destination[];
};

export function DestinationsSection({ destinations }: DestinationsSectionProps) {
  const { colors } = useThemeTokens();

  return (
    <View className="pt-7">
      <SectionHeading title="Popular Destinations" actionLabel="See All" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
      >
        {destinations.map((destination) => (
          <Card key={destination.id} className='pt-0'>
            <PlaceholderImageCard
              label={destination.placeholderLabel}
              accentColor={destination.accentColor}
              height={124}
              width={140}
              roundedClassName="rounded-t-xl"
            />
            <CardContent>
              <CardTitle className="font-bold mt-3" style={{ color: colors.foreground}}>
                {destination.city}
              </CardTitle>
              <CardDescription className="text-base font-semibold" style={{ color: colors.primary }}>
                {destination.price}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
