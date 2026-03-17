export type SearchFlightsParams = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
};

export type FlightPassenger = {
  firstName: string;
  lastName: string;
  dob: string;
};

export type SecureBookFlightPayload = {
  flightOffer: any;
  passenger: FlightPassenger;
};

export type SecureBookFlightResponse = {
  payment_link?: string;
};
