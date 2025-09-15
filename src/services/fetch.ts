import { successHandler, errorHandler } from "@/helpers/responseHandler";
import {
  CredentialsOption,
  RequestOptions,
  type EndpointInterface,
} from "@/constants/endpoints";
import type { ErrorFetchService } from "@/constants/types";

interface DataInterface {
  [key: string]: string | number | boolean | object | null;
}

const defaultConfig = {
  headers: {},
  skipSuccessHandler: false,
  skipErrorHandler: false,
  defaultErrorMessage: "",
  defaultSuccessMessage: "",
  access_token: null,
} as {
  headers: { [key: string]: string };
  skipSuccessHandler: boolean;
  skipErrorHandler: boolean;
  defaultErrorMessage: string;
  defaultSuccessMessage: string;
  access_token: string | null;
};

const baseURL = import.meta.env.VITE_BACKEND_API_URL;

export const fetchRequest = async <T>(
  endpoint: EndpointInterface,
  {
    params = {},
    data,
    body = null,
    config = defaultConfig,
  }: {
    params?: Record<string, any>;
    data?: DataInterface;
    body?: any;
    config?: Partial<typeof defaultConfig>;
  }
) => {
  try {
    const isAuthRequired = endpoint.options?.includes(
      RequestOptions.AUTH_REQUIRED
    );

    const headers = {
      "Content-Type": "application/json",
      ...(isAuthRequired
        ? { Authorization: `Bearer ${config.access_token}` }
        : {}),
      ...config.headers,
    };

    const url =
      baseURL +
      (typeof endpoint.url === "function"
        ? endpoint.url(params)
        : endpoint.url);

    const {
      skipSuccessHandler,
      skipErrorHandler,
      defaultErrorMessage,
      defaultSuccessMessage,
      ...fetchOptions
    } = {
      ...config,
      method: endpoint.method,
      headers,
      credentials: (endpoint.credentials === CredentialsOption.INCLUDE
        ? "include"
        : "same-origin") as RequestCredentials,
      body: data ? JSON.stringify(data) : body,
      cache: "no-store" as RequestCache,
    };

    const response = await fetch(url, fetchOptions);

    const responseData = await handleResponse<T>(response);

    if (!skipSuccessHandler) {
      successHandler<T>({
        response: { data: responseData },
        defaultMessage: defaultSuccessMessage,
      });
    }

    return { data: responseData };
  } catch (error) {
    if (!config.skipErrorHandler) {
      errorHandler({
        error: error as ErrorFetchService,
        defaultMessage: config.defaultErrorMessage,
      });
    }
    throw {
      ok: false,
      ...(typeof error === "object" ? error : { message: String(error) }),
    } as ErrorFetchService;
  }
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  let data: any;

  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error: any = new Error(response.statusText);
    error.response = {
      originalStatus: response.status,
      data: data,
    };
    throw error;
  }

  return data as T;
}
