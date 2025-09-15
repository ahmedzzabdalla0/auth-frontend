import { fetchRequest } from "@/services/fetch";
import type {
  ErrorFetchService,
  GetUserResponse,
  LoginResponse,
  MessageResponse,
  RefreshResponse,
  SignupResponse,
} from "@/constants/types";
import { authEndpoints } from "@/constants/endpoints";

export async function loginRequest(
  {
    email,
    password,
    rememberMe,
  }: { email: string; password: string; rememberMe: boolean },
  config = {}
) {
  try {
    return await fetchRequest<LoginResponse>(authEndpoints.login, {
      data: {
        email,
        password,
        rememberMe,
      },
      config: {
        skipSuccessHandler: true,
        skipErrorHandler: true,
        ...config,
      },
    });
  } catch (error) {
    return error as ErrorFetchService;
  }
}

export async function signupRequest(
  {
    email,
    password,
    repassword,
    name,
  }: { email: string; password: string; repassword: string; name: string },
  config = {}
) {
  try {
    return await fetchRequest<SignupResponse>(authEndpoints.signup, {
      data: {
        email,
        password,
        repassword,
        name,
      },
      config,
    });
  } catch (error) {
    return error as ErrorFetchService;
  }
}

export async function refreshRequest(config = {}) {
  try {
    return await fetchRequest<RefreshResponse>(
      authEndpoints.refreshAccessToken,
      {
        config,
      }
    );
  } catch (error) {
    return error;
  }
}

export async function getUserRequest(config: { access_token: string }) {
  try {
    return await fetchRequest<GetUserResponse>(authEndpoints.getUserRequest, {
      config,
    });
  } catch (error) {
    return error as ErrorFetchService;
  }
}

export async function logoutRequest(config = {}) {
  try {
    return await fetchRequest<null>(authEndpoints.logout, {
      config: {
        skipSuccessHandler: true,
        ...config,
      },
    });
  } catch (error) {
    return error;
  }
}
export async function reportRefreshStolenRequest(config = {}) {
  try {
    return await fetchRequest<MessageResponse>(authEndpoints.reportStolen, {
      config: { skipSuccessHandler: false, ...config },
    });
  } catch (error) {
    return error;
  }
}
