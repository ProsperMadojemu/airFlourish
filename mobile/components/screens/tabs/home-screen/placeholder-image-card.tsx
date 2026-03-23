import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type PlaceholderImageCardProps = {
  label: string;
  accentColor: string;
  height: number;
  width?: number;
  roundedClassName?: string;
};

export function PlaceholderImageCard({
  label,
  accentColor,
  height,
  width,
  roundedClassName = 'rounded-[24px]',
}: PlaceholderImageCardProps) {
  return (
    <View
      className={`overflow-hidden bg-slate-200 ${roundedClassName}`}
      style={{ height, width }}
    >
      <View className="absolute inset-0" style={{ backgroundColor: '#dbeafe' }} />
      <View
        className="absolute -left-10 -top-8 h-24 w-24 rounded-full"
        style={{ backgroundColor: `${accentColor}55` }}
      />
      <View
        className="absolute bottom-0 right-0 h-28 w-28 rounded-full"
        style={{ backgroundColor: `${accentColor}88` }}
      />
      <View className="absolute inset-0 justify-between p-4">
        <View className="h-12 w-20 rounded-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold uppercase" style={{ color: '#334155', letterSpacing: 1.5 }}>
              Placeholder
            </Text>
            <Text className="mt-1 text-lg font-bold" style={{ color: '#0f172a' }}>
              {label}
            </Text>
          </View>
          <View
            className="h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          >
            <Ionicons name="image-outline" size={20} color="#475569" />
          </View>
        </View>
      </View>
    </View>
  );
}
