import { useMutation } from "@tanstack/react-query";

import { registerRequest } from "@/lib/api/auth";
import { useLoginMutation } from "./use-login-mutation";

export const useRegisterMutation = () =>{
  const loginMutation = useLoginMutation();
  return useMutation({
    mutationFn: registerRequest,
    onSuccess(data, variables) {
      loginMutation.mutate({ email: variables.email, password: variables.password });
    },
  });
}