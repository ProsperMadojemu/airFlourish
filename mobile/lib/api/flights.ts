import { apiClient } from "@/lib/api/client";
import {
  SearchFlightsParams,
  SecureBookFlightPayload,
  SecureBookFlightResponse,
} from "@/lib/types/flights";

export const searchFlightsRequest = async (params: SearchFlightsParams) => {
  const response = await apiClient.get("bookings/flights/search/", {
    params: {
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departureDate,
      return_date: params.returnDate,
    },
  });

  return response.data as any[];
};

export const secureBookFlightRequest = async (payload: SecureBookFlightPayload) => {
  const departureSegment = payload.flightOffer.itineraries?.[0]?.segments?.[0];
  const arrivalSegment = payload.flightOffer.itineraries?.[0]?.segments?.slice(-1)[0];
  const returnSegment = payload.flightOffer.itineraries?.[1]?.segments?.slice(-1)[0];

  const response = await apiClient.post("flights/secure-book/", {
    flight_offer: payload.flightOffer,
    travelers: [
      {
        id: "1",
        dateOfBirth: payload.passenger.dob,
        name: {
          firstName: payload.passenger.firstName,
          lastName: payload.passenger.lastName,
        },
      },
    ],
    departure_city: departureSegment?.departure?.iataCode,
    arrival_city: arrivalSegment?.arrival?.iataCode,
    departure_date: departureSegment?.departure?.at?.split("T")[0],
    return_date: returnSegment?.arrival?.at
      ? returnSegment.arrival.at.split("T")[0]
      : null,
    airline: payload.flightOffer.validatingAirlineCodes?.[0],
    passengers: 1,
  });

  return response.data as SecureBookFlightResponse;
};
