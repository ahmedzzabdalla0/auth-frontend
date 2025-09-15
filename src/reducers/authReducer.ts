import type { AuthAction, AuthState } from "@/constants/types";

export function createInitialState(formId: "login" | "signup"): AuthState {
  return {
    form:
      formId === "login"
        ? { email: "", password: "", rememberMe: false }
        : { email: "", name: "", password: "", repassword: "" },
    errors: {},
    isSubmitting: false,
  };
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_FORM_FIELD":
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value,
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };

    case "RESET_FORM":
      return createInitialState(action.formId);

    default:
      return state;
  }
}
