import { apiClient } from "@/lib/api/client";
import { TransportOption } from "@/lib/types/transport";

export const listTransportOptionsRequest = async () => {
  const response = await apiClient.get<TransportOption[]>(
    "transport/transport-options/",
  );

  return response.data;
};
