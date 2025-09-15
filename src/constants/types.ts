export type User = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  refreshTokenRef: string;
  __v: number;
};

export type StoredUser = {
  name: string;
  email: string;
};

export type LoginResponse = User & {
  accessToken: string;
};

export type SignupResponse = { createdUser: User } & {
  accessToken: string;
};

export type RefreshResponse = { accessToken: string };

export type GetUserResponse = { user: User };

export type MessageResponse = { message: string };

export type ErrorFetchService = {
  ok: false;
  response: { statusText: string; originalStatus: number; data: any };
};

export type FetchSuccess<T> = { data: T };

export type FetchResponse<T> = FetchSuccess<T> | ErrorFetchService;

export type AuthContextType = {
  states: {
    user: StoredUser | null;
    access_token: string | null;
    isAuthenticated: boolean;
    isFinished: boolean;
    hasPermission: boolean;
  };
  actions: {
    loginHandler: (args: { access_token: string; user: StoredUser }) => void;
    setNotAuthed: () => void;
    checkAuthHandler: () => Promise<void>;
  };
};

export type LoginForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupForm = {
  email: string;
  name: string;
  password: string;
  repassword: string;
};

export type InputErrors = {
  field: string;
  messages: string[];
}[];

export type FormType = LoginForm | SignupForm;

export interface AuthState {
  form: FormType;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

export type AuthAction =
  | { type: "SET_FORM_FIELD"; name: string; value: string | boolean }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SET_SUBMITTING"; isSubmitting: boolean }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET_FORM"; formId: "login" | "signup" };
