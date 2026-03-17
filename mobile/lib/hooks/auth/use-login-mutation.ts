import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/use-auth";

export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: login,
    
  });
};
