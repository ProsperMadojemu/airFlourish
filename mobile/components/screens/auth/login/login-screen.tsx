import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { PressableOpacity } from 'pressto';
export function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-6 w-full">
      <View className="bg-white p-8 rounded-3xl shadow-lg">
        <Text className="text-3xl font-bold mb-2 text-center">Welcome Back</Text>
        <Text className="text-gray-500 text-center mb-8">Login to continue</Text>



        <PressableOpacity
          onPress={() => router.push("/(public)/(auth)/register")}
        >
          <Text className="text-center text-gray-600">
            Don’t have an account? <Text className="text-blue-600 font-semibold">Register</Text>
          </Text>
        </PressableOpacity>
      </View>
    </View>
  );
}
