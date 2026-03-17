export type Payment = {
  id: string;
  booking: number;
  amount: number | string;
  currency: string;
  payment_method: string;
  tx_ref: string;
  status: string;
  paid_at?: string | null;
  created_at?: string;
};

export type CardPaymentInitPayload = {
  bookingId: number;
  amount: number | string;
  currency: string;
  txRef: string;
  idempotencyKey?: string;
  traceId?: string;
};

export type CardPaymentInitResponse = {
  payment: Payment;
  gateway: {
    link?: string;
    tx_ref?: string;
    flw_ref?: string;
  };
};

export type ListPaymentsFilters = {
  bookingId?: number | string;
  status?: string;
};
