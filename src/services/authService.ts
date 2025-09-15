import { loginRequest, signupRequest } from "@/features/auth/authApi";
import { isFetchError } from "@/helpers/fetch";
import type {
  ErrorFetchService,
  InputErrors,
  LoginForm,
  SignupForm,
} from "@/constants/types";

export const handleAuthRequest = async (
  form: LoginForm | SignupForm,
  formId: "login" | "signup"
): Promise<ErrorFetchService | null> => {
  try {
    let response;

    if (formId === "login") {
      response = await loginRequest(form as LoginForm, {
        skipErrorHandler: true,
      });
    } else {
      response = await signupRequest(form as SignupForm, {
        skipErrorHandler: true,
      });
    }

    // Return error if request failed
    if (isFetchError(response)) {
      return response as ErrorFetchService;
    }

    return null;
  } catch (error) {
    // Handle unexpected errors
    console.error("Auth request error:", error);
    throw error;
  }
};

export const parseServerErrors = (
  response: ErrorFetchService
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (response?.response?.data?.inputErrors) {
    const inputErrors = response.response.data.inputErrors as InputErrors;
    inputErrors.forEach((error) => {
      if (error.field && error.messages.length) {
        errors[error.field] = error.messages[0];
      }
    });
  }

  return errors;
};
