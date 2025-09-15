import type {
  FetchResponse,
  FetchSuccess,
  GetUserResponse,
  RefreshResponse,
  StoredUser,
} from "@/constants/types";
import { AuthContext } from "@/context/authContext";
import { getUserRequest, refreshRequest } from "@/features/auth/authApi";
import { isFetchError } from "@/helpers/fetch";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const hasPermission = isFinished && isAuthenticated && !!access_token;

  const loginHandler = ({
    access_token,
    user,
  }: {
    access_token: string;
    user: StoredUser;
  }) => {
    setAccessToken(access_token);
    setUser(user);
    setIsAuthenticated(true);
    setIsFinished(true);
  };

  const setNotAuthed = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    setIsFinished(true);
    setUser(null);
  };

  const checkAuthHandler = async () => {
    const accessResponse = (await refreshRequest({
      skipErrorHandler: true,
    })) as FetchResponse<RefreshResponse>;
    if (isFetchError(accessResponse)) {
      return setNotAuthed();
    }
    const accessToken = (accessResponse as FetchSuccess<RefreshResponse>).data
      .accessToken;

    const userResponse = (await getUserRequest({
      access_token: accessToken,
    })) as FetchResponse<GetUserResponse>;
    if (isFetchError(userResponse)) {
      return setNotAuthed();
    }
    const user = (userResponse as FetchSuccess<GetUserResponse>).data.user;

    loginHandler({ user, access_token: accessToken });
    keepLoginHandler();
  };

  const keepLoginHandler = async () => {
    if (hasPermission) {
      const interval = setInterval(async () => {
        const accessResponse =
          (await refreshRequest()) as FetchResponse<RefreshResponse>;

        if (!isFetchError(accessResponse)) {
          setAccessToken(
            (accessResponse as FetchSuccess<RefreshResponse>).data.accessToken
          );
        } else {
          clearInterval(interval);
          setNotAuthed();
          navigate("/login");
        }
      }, 14 * 60 * 1000);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthHandler();
    };
    initAuth();
  }, []);

  const value = {
    states: { user, access_token, isAuthenticated, isFinished, hasPermission },
    actions: {
      loginHandler,
      setNotAuthed,
      checkAuthHandler,
    },
  };

  if (!isFinished) {
    return (
      <div className="font-heading-6 w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
