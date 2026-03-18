
// import { useAuth } from "@/hooks/useAuth";
import { ThemedView } from "@/components/themes/themed-view";
import { useAuth } from "@/lib/hooks/use-auth";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
    const { isLoggedIn, isReady, user } = useAuth();
    const hasUser = user ? true : false;


    if (!isReady) {
        return null;
    }
    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }
    if (!user) {
        return null;
    }
    // bookings/   flights/   hotels/   payments/   transport/   visa/
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "none",
            }}
        >
                <Stack.Protected guard={hasUser}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="bookings" />
                    <Stack.Screen name="flights" />
                    <Stack.Screen name="payments" />
                    <Stack.Screen name="transport" />
                    <Stack.Screen name="visa" />
                    <Stack.Screen name="hotels" />
                </Stack.Protected>
        </Stack>
    );
}
