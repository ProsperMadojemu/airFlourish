import { apiClient } from "@/lib/api/client";
import {
  CreateHotelReservationPayload,
  Hotel,
  HotelDetail,
  ListHotelsParams,
} from "@/lib/types/hotels";

export const listHotelsRequest = async (params: ListHotelsParams) => {
  const response = await apiClient.get<Hotel[]>("hotels/hotels/", {
    params: {
      city: params.city,
      check_in: params.checkIn,
      check_out: params.checkOut,
      guests: 1,
    },
  });

  return response.data;
};

export const getHotelRequest = async (hotelId: string) => {
  const response = await apiClient.get<HotelDetail>(`hotels/hotels/${hotelId}/`);
  return response.data;
};

export const createHotelReservationRequest = async (
  payload: CreateHotelReservationPayload,
) => {
  const response = await apiClient.post("hotels/hotel-reservations/", {
    hotel_id: payload.hotelId,
    check_in: payload.checkIn,
    check_out: payload.checkOut,
    guests: payload.guests,
  });

  return response.data;
};
