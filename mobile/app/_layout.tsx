import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryProvider } from "@/components/providers/query-provider";
import "../global.css"
import { AuthProvider } from "@/components/providers/auth-provider";

function AppRouter() {
  // const router = useRouter();
  // const segments = useSegments();
  // const { token, loading,  } = useAuth();


  // useEffect(() => {
  //   if (loading) return;

  //   const inAuthGroup = segments[0] === "(auth)";
  //   const isAuthenticated = Boolean(token);

  //   if (!isAuthenticated && !inAuthGroup) {
  //     router.replace("/(auth)/login");
  //   }

  //   if (isAuthenticated && inAuthGroup) {
  //     router.replace("/(tabs)");
  //   }
  // }, [loading, router, segments, token]);

  // if (loading) {
  //   return (
  //     <View className="flex-1 justify-center items-center">
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryProvider>
          <AppRouter />
          {/* <ReactQueryDevtools /> */}
        </QueryProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
