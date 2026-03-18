
// import { useAuth } from "@/hooks/useAuth";
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

    return (
        // <Stack
        //     screenOptions={{
        //         headerShown: false,
        //         animation: "none",
        //     }}
        // >
        <Stack.Protected guard={hasUser}>
            <Stack />
        </Stack.Protected>
        // </Stack>
    );
}
