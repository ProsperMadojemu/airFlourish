import { apiClient } from "@/lib/api/client";
import { Booking } from "../types/bookings";

const BOOKINGS_PATH = "bookings/bookings/";

export const listBookingsRequest = async () => {
  const response = await apiClient.get<Booking[]>(BOOKINGS_PATH);
  return response.data;
};

export const getBookingRequest = async (bookingId: number | string) => {
  const response = await apiClient.get<Booking>(`${BOOKINGS_PATH}${bookingId}/`);
  return response.data;
};
