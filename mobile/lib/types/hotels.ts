export type Hotel = {
  id: number;
  hotel_name: string;
  price_per_night?: number;
  currency?: string;
  city: string;
};

export type HotelDetail = Hotel & {
  address?: string;
};

export type ListHotelsParams = {
  city: string;
  checkIn: string;
  checkOut: string;
};

export type CreateHotelReservationPayload = {
  hotelId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
};
