export type CreateVisaApplicationPayload = {
  destinationCountry: string;
  visaType: string;
  appointmentDate?: string;
  visaFee: number;
};
