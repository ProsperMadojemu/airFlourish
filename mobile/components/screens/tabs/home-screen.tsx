import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import {
  Button,
  ButtonGroup,
  Card,
  CardDescription,
  CardTitle,
  Dialog,
  DialogBody,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupField,
  InputOTP,
} from '@/components/ui';
import { PressableOpacity } from '@/components/ui/pressable-opacity';

export default function HomeScreen() {
  const [email, setEmail] = React.useState('traveler@example.com');
  const [otp, setOtp] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <ScrollView className="flex-1 bg-background p-5">
      <Text className="mb-2 text-3xl font-bold text-foreground">Welcome 👋</Text>
      <Text className="mb-6 text-base text-muted-foreground">
        A React Native friendly shadcn-style UI kit is now wired into the app with NativeWind tokens and reusable primitives.
      </Text>

      <Card className="mb-6 gap-4">
        <View>
          <CardTitle>Shadcn-style component showcase</CardTitle>
          <CardDescription>
            These components mirror the ergonomics of shadcn/ui, but they render with React Native primitives instead of DOM elements.
          </CardDescription>
        </View>

        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />

        <InputGroup>
          <InputGroupAddon>
            <Ionicons name="search-outline" size={18} color="#637083" />
          </InputGroupAddon>
          <InputGroupField placeholder="Search flights, hotels, visas..." />
          <InputGroupAddon>⌘K</InputGroupAddon>
        </InputGroup>

        <View className="gap-2">
          <Text className="text-sm font-medium text-foreground">Input OTP</Text>
          <InputOTP value={otp} onChange={setOtp} maxLength={6} />
        </View>

        <ButtonGroup>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button isSuccess>Success</Button>
        </ButtonGroup>

        <Button variant="outline" onPress={() => setShowDialog(true)}>
          Open dialog
        </Button>
      </Card>

      <Text className="mb-4 text-xl font-semibold text-foreground">Quick actions</Text>

      <PressableOpacity
        onPress={() => router.push('/flights')}
        className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
      >
        <View className="flex-row items-center">
          <Ionicons name="airplane-outline" size={24} color="#2563EB" />
          <Text className="ml-3 text-lg font-semibold text-card-foreground">Book Flight</Text>
        </View>
      </PressableOpacity>

      <PressableOpacity
        onPress={() => router.push('/hotels/search')}
        className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
      >
        <View className="flex-row items-center">
          <Ionicons name="bed-outline" size={24} color="#2563EB" />
          <Text className="ml-3 text-lg font-semibold text-card-foreground">Reserve Hotel</Text>
        </View>
      </PressableOpacity>

      <PressableOpacity
        onPress={() => router.push('/transport')}
        className="mb-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
      >
        <View className="flex-row items-center">
          <Ionicons name="car-outline" size={24} color="#2563EB" />
          <Text className="ml-3 text-lg font-semibold text-card-foreground">Transport</Text>
        </View>
      </PressableOpacity>

      <PressableOpacity
        onPress={() => router.push('/visa')}
        className="rounded-2xl border border-border bg-card p-5 shadow-xs"
      >
        <View className="flex-row items-center">
          <Ionicons name="document-outline" size={24} color="#2563EB" />
          <Text className="ml-3 text-lg font-semibold text-card-foreground">Visa Application</Text>
        </View>
      </PressableOpacity>

      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Complete setup"
        description="Use these primitives as building blocks for forms, auth flows, and bottom-sheet style interactions throughout the app."
        confirmLabel="Nice"
      >
        <DialogBody>
          <Text className="text-sm text-muted-foreground">
            You now have input, button, button group, input group, OTP input, dialog, card, and spinner-ready patterns that work in Expo/React Native.
          </Text>
        </DialogBody>
      </Dialog>
    </ScrollView>
  );
}
