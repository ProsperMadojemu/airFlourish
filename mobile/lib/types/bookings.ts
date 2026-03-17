export type Booking = {
  id: number;
  service_type: string;
  reference_code: string;
  status: string;
  total_price?: number | string | null;
  currency?: string;
  created_at?: string;
  external_service_id?: string | null;
  details?: unknown;
};
