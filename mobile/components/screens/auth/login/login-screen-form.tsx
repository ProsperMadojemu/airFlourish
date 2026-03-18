import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { useLoginMutation } from "@/lib/hooks/auth/use-login-mutation";
import { LoginSchema, loginSchema } from "@/lib/validators/auth";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui";

export function LoginScreenForm() {
    const loginMutation = useLoginMutation();
    const router = useRouter();

    const login_mail = process.env.EXPO_PUBLIC_LOGIN_EMAIL
    const login_password = process.env.EXPO_PUBLIC_LOGIN_PASSWORD

    const {
        reset,
        control,
        handleSubmit
    } = useForm<LoginSchema>({
        defaultValues: {
            email: __DEV__ ? login_mail : "",
            password: __DEV__ ? login_password : "",
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
            <View className="gap-2">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            editable={!loginMutation.isPending}
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
                            editable={!loginMutation.isPending}
                            placeholder="Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                        />
                    )}
                    name="password"
                />
            </View>
            <Button
                onPress={handleSubmit(onSubmit)}
                className="rounded-2xl mt-4"
                variant="default"
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending}
            >
                {/* {loginMutation.isPending ? (
                    <ActivityIndicator color="white" />
                ) : ( */}
                Login
            </Button>

        </View>
    )
}