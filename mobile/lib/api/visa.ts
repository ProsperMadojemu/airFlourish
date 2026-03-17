import { apiClient } from "@/lib/api/client";
import { CreateVisaApplicationPayload } from "@/lib/types/visa";

export const createVisaApplicationRequest = async (
  payload: CreateVisaApplicationPayload,
) => {
  const response = await apiClient.post("visas/visas/", {
    destination_country: payload.destinationCountry,
    visa_type: payload.visaType,
    appointment_date: payload.appointmentDate || null,
    visa_fee: payload.visaFee,
    currency: "NGN",
  });

  return response.data;
};
