import { PressableOpacity } from "@/components/ui/pressable-opacity";
import { ActivityIndicator, Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { useLoginMutation } from "@/lib/hooks/auth/use-login-mutation";
import { LoginSchema, loginSchema } from "@/lib/validators/auth";
import { useRouter } from "expo-router";

export function LoginScreenForm() {
    const loginMutation = useLoginMutation();
    const router = useRouter();

    const {
        reset,
        control,
        handleSubmit
    } = useForm<LoginSchema>({
        defaultValues: {
            email: __DEV__ ? "prospermadojemu00@gmail.com" : "",
            password: __DEV__ ? "Prosper" : "",
        },
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (values: LoginSchema) => {
        try {
            await loginMutation.mutateAsync(values);
            router.replace("/(protected)/(tabs)");
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                    />
                )}
                name="password"
            />

            <PressableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-600 p-4 rounded-2xl mt-4"
            >
                {loginMutation.isPending ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-center font-semibold w-full text-lg">
                        Login
                    </Text>
                )}
            </PressableOpacity>
        </View>
    )
}