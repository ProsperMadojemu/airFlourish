import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

export const useLoginMutation = () => {
  const { login } = useAuth();
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace("/(protected)/(tabs)");
      toast.show("Login successful!", { type: "success" });
    },
  });
};
