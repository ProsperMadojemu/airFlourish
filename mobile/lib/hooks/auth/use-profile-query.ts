import { useQuery } from "@tanstack/react-query";

import { fetchProfileRequest } from "@/lib/api/auth";
import { authQueryKeys } from "@/lib/query-keys/auth";
import { useAuth } from "../use-auth";

export const useProfileQuery = () => {
  const { user } = useAuth();
  return useQuery({

    queryKey: authQueryKeys.profile(),
    queryFn: fetchProfileRequest,
    initialData: user,
  });
};
