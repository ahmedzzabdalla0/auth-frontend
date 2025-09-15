import type { ErrorInterface } from "@/constants/interfaces";
import { messages } from "@/constants/messages";
import toast from "react-hot-toast";

export function errorHandler({
  error,
  defaultMessage,
}: {
  error: ErrorInterface;
  defaultMessage?: string;
}) {
  const status = error?.response?.originalStatus || error?.response?.status;
  try {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error?.message === "canceled" || error?.code === "ERR_CANCELED") {
      throw new Error(messages.error.canceled);
    }
    if (status === 500) {
      throw new Error(messages.error.serverError);
    }
    if (status === 404) {
      throw new Error(messages.error.notFound);
    }
    if (status === 401) {
      throw new Error(messages.error.unauthorized);
    }
    if (status === 524) {
      throw new Error(messages.error.timeout);
    }
    if (!error?.response) {
      throw new Error(messages.error.noInternet);
    }
    if (defaultMessage) {
      throw new Error(defaultMessage);
    }
    throw new Error(messages.error.unexpected);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error(String(error));
    }
  }
}

export function successHandler<T>({
  response,
  defaultMessage,
}: {
  response: { data: T };
  defaultMessage?: string;
}) {
  const shownMessage = (response?.data as any)?.message || defaultMessage;
  if (shownMessage) toast.success(shownMessage);
}
