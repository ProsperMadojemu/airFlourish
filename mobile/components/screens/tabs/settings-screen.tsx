import { useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, Switch, Text, View } from 'react-native';

import { PressableOpacity } from '@/components/ui/pressable-opacity';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="mb-6 text-2xl font-bold">Settings</Text>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg">Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
      </View>

      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-lg">Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
        />
      </View>

      <PressableOpacity className="border-b border-gray-200 py-4" onPress={() => router.push('/profile')}>
        <Text className="text-lg">Account & Security</Text>
      </PressableOpacity>

      <PressableOpacity className="border-b border-gray-200 py-4" onPress={() => router.push('/payments')}>
        <Text className="text-lg">Payment Methods</Text>
      </PressableOpacity>

      <PressableOpacity className="border-b border-gray-200 py-4" onPress={() => alert('Help & Support')}>
        <Text className="text-lg">Help & Support</Text>
      </PressableOpacity>

      <PressableOpacity className="mt-6 border-b border-gray-200 py-4" onPress={() => alert('Logout')}>
        <Text className="text-lg text-red-500">Logout</Text>
      </PressableOpacity>
    </ScrollView>
  );
}
