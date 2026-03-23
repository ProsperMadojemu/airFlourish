type ErrorResponseData = {
  detail?: unknown;
  message?: unknown;
  [key: string]: unknown;
};

type RequestErrorLike = {
  response?: {
    data?: ErrorResponseData | string;
  };
  message?: unknown;
};

type GetRequestErrorMessageOptions = {
  fallbackMessage: string;
  preferredKeys?: string[];
};

function getMessageFromValue(value: unknown) {
  if (typeof value === 'string') return value;

  if (Array.isArray(value)) {
    const firstString = value.find((item) => typeof item === 'string');
    if (typeof firstString === 'string') return firstString;
  }

  return null;
}

export function getRequestErrorMessage(
  error: unknown,
  { fallbackMessage, preferredKeys = [] }: GetRequestErrorMessageOptions
) {
  if (typeof error !== 'object' || error === null) {
    return fallbackMessage;
  }

  const requestError = error as RequestErrorLike;
  const responseData = requestError.response?.data;

  if (typeof responseData === 'string') {
    return responseData;
  }

  const detailMessage = getMessageFromValue(responseData?.detail);
  if (detailMessage) return detailMessage;

  const genericMessage = getMessageFromValue(responseData?.message);
  if (genericMessage) return genericMessage;

  for (const key of preferredKeys) {
    const preferredMessage = getMessageFromValue(responseData?.[key]);
    if (preferredMessage) return preferredMessage;
  }

  if (responseData && typeof responseData === 'object') {
    for (const value of Object.values(responseData)) {
      const fieldMessage = getMessageFromValue(value);
      if (fieldMessage) return fieldMessage;
    }
  }

  const errorMessage = requestError.message;

  return typeof errorMessage === 'string' ? errorMessage : fallbackMessage;
}
