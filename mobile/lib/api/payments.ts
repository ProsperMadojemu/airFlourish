import { apiClient } from "@/lib/api/client";
import {
  CardPaymentInitPayload,
  CardPaymentInitResponse,
  ListPaymentsFilters,
  Payment,
} from "@/lib/types/payments";

const PAYMENTS_PATH = "payments/payments/";

export const createIdempotencyKey = () =>
  `idemp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createTraceId = () =>
  `trace-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const listPaymentsRequest = async (filters?: ListPaymentsFilters) => {
  const response = await apiClient.get<Payment[]>(PAYMENTS_PATH, {
    params: {
      booking_id: filters?.bookingId,
      status: filters?.status,
    },
  });

  return response.data;
};

export const initiateCardPaymentRequest = async (
  payload: CardPaymentInitPayload,
) => {
  const idempotencyKey = payload.idempotencyKey ?? createIdempotencyKey();
  const traceId = payload.traceId ?? createTraceId();

  const response = await apiClient.post<CardPaymentInitResponse>(
    "payments/card/initiate/",
    {
      booking_id: payload.bookingId,
      amount: payload.amount,
      currency: payload.currency,
      tx_ref: payload.txRef,
    },
    {
      headers: {
        "Idempotency-Key": idempotencyKey,
        "X-Trace-Id": traceId,
      },
    },
  );

  return response.data;
};
