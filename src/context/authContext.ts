import { createContext } from "react";
import type { AuthContextType } from "@/constants/types";

export const AuthContext = createContext<AuthContextType>({
  states: {
    user: null,
    access_token: null,
    isAuthenticated: false,
    isFinished: false,
    hasPermission: false,
  },
  actions: {
    loginHandler: () => {},
    setNotAuthed: () => {},
    checkAuthHandler: async () => {},
  },
});
