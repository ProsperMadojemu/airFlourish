import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { router } from 'expo-router';
import { ScrollView, Switch, Text, View } from 'react-native';

import {
  Button,
  ButtonGroup,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogBody,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupField,
  InputOTP,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  useThemeTokens,
} from '@/components/ui';
import { PressableOpacity } from '@/components/ui/pressable-opacity';

export default function HomeScreen() {
  const [email, setEmail] = React.useState('traveler@example.com');
  const [otp, setOtp] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);
  const [enableAlerts, setEnableAlerts] = React.useState(true);
  const { colors, isDark } = useThemeTokens();

  return (
    <ScrollView className="flex-1 p-5" style={{ backgroundColor: colors.background }}>
      <Text className="mb-2 text-3xl font-bold" style={{ color: colors.foreground }}>Welcome 👋</Text>
      <Text className="mb-6 text-base" style={{ color: colors.mutedForeground }}>
        The mobile UI kit now uses your red primary brand color, supports dark mode, and ships with field, card, and item building blocks.
      </Text>

      <Card className="mb-6">
        <CardHeader className="flex-row items-start justify-between gap-3">
          <View className="flex-1 gap-1">
            <CardTitle>Shadcn-style React Native primitives</CardTitle>
            <CardDescription>
              Composable mobile-first building blocks for forms, dialogs, lists, and CTA surfaces.
            </CardDescription>
          </View>
          <CardAction>
            <View className="rounded-full px-3 py-1" style={{ backgroundColor: isDark ? '#3f1d1d' : '#fff1f2' }}>
              <Text className="text-xs font-medium" style={{ color: colors.primary }}>
                {isDark ? 'Dark mode' : 'Light mode'}
              </Text>
            </View>
          </CardAction>
        </CardHeader>

        <CardContent className="gap-5">
          <FieldGroup>
            <Input value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Field>
              <FieldContent>
                <FieldLabel>Search</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Ionicons name="search-outline" size={18} color={colors.mutedForeground} />
                  </InputGroupAddon>
                  <InputGroupField placeholder="Search flights, hotels, visas..." />
                  <InputGroupAddon>⌘K</InputGroupAddon>
                </InputGroup>
              </FieldContent>
            </Field>

            <Field>
              <FieldContent>
                <FieldLabel>Input OTP</FieldLabel>
                <InputOTP value={otp} onChange={setOtp} maxLength={6} />
                {/* <FieldError errors={otp.length > 0 && otp.length < 6 ? [{ message: 'Enter the full 6-digit verification code.' }] : undefined} /> */}
              </FieldContent>
            </Field>
          </FieldGroup>

          <FieldSeparator>Actions</FieldSeparator>

          <ButtonGroup>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button isSuccess>Success</Button>
          </ButtonGroup>

          <Field orientation="horizontal" className="items-center justify-between">
            <FieldContent>
              <FieldLabel>Push alerts</FieldLabel>
              <FieldDescription>Example field layout with content and actions side by side.</FieldDescription>
            </FieldContent>
            <Switch value={enableAlerts} onValueChange={setEnableAlerts} trackColor={{ true: colors.primary, false: colors.border }} />
          </Field>

          <Button variant="outline" onPress={() => setShowDialog(true)}>
            Open dialog
          </Button>
        </CardContent>

        <CardFooter>
          <Text className="text-sm" style={{ color: colors.mutedForeground }}>
            Components adapt their surfaces, borders, and foreground colors automatically for dark mode.
          </Text>
        </CardFooter>
      </Card>

      <Card className="mb-6" size="sm">
        <CardHeader>
          <CardTitle>Item components</CardTitle>
          <CardDescription>Use items for settings rows, result summaries, or compact list entries.</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia>
                <Ionicons name="card-outline" size={20} color={colors.primary} />
              </ItemMedia>
              <ItemContent>
                <ItemHeader>
                  <ItemTitle>Wallet ending in 0427</ItemTitle>
                  <ItemActions>
                    <Button size="xs" variant="secondary">Default</Button>
                  </ItemActions>
                </ItemHeader>
                <ItemDescription>Primary payment method for flights and hotels.</ItemDescription>
              </ItemContent>
            </Item>
            <ItemSeparator />
            <Item variant="muted">
              <ItemMedia>
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Account verification</ItemTitle>
                <ItemDescription>Passport verified and ready for visa applications.</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <Text className="mb-4 text-xl font-semibold" style={{ color: colors.foreground }}>Quick actions</Text>

      {[
        { icon: 'airplane-outline', label: 'Book Flight', route: '/flights' },
        { icon: 'bed-outline', label: 'Reserve Hotel', route: '/hotels/search' },
        { icon: 'car-outline', label: 'Transport', route: '/transport' },
        { icon: 'document-outline', label: 'Visa Application', route: '/visa' },
      ].map(({ icon, label, route }) => (
        <PressableOpacity
          key={route}
          onPress={() => router.push(route as never)}
          className="mb-4 rounded-2xl p-5"
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
        >
          <View className="flex-row items-center">
            <Ionicons name={icon as any} size={24} color={colors.primary} />
            <Text className="ml-3 text-lg font-semibold" style={{ color: colors.cardForeground }}>{label}</Text>
          </View>
        </PressableOpacity>
      ))}

      <Dialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Component kit ready"
        description="You now have a darker-mode aware mobile component set that follows the spirit of shadcn/ui while staying React Native native."
        confirmLabel="Done"
      >
        <DialogBody>
          <Text className="text-sm" style={{ color: colors.mutedForeground }}>
            Included: buttons, button groups, cards, fields, inputs, grouped inputs, OTP input, items, dialog, label, separator, and spinner primitives.
          </Text>
        </DialogBody>
      </Dialog>
    </ScrollView>
  );
}
