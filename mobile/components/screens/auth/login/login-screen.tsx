import { Link } from "expo-router";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { LoginScreenForm } from "./login-screen-form";
import { dismissKeyboard } from "@/lib/keyboard_events";
export function LoginScreen() {

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View className="flex-1 bg-gray-50 justify-center items-center px-6 w-full">
        <View className="bg-white p-8 rounded-3xl shadow-lg">
          <Text className="text-3xl font-bold mb-2 text-center">Welcome Back</Text>
          <Text className="text-gray-500 text-center mb-8">Login to continue</Text>
          <LoginScreenForm />
          <Text className="text-center text-gray-600">
            Don&apos;t have an account? <Link href={"/register"} className="text-blue-600 font-semibold">Register</Link>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
