export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum CredentialsOption {
  INCLUDE = "include",
  OMIT = "omit",
  SAME_ORIGIN = "same-origin",
}

export enum RequestOptions {
  AUTH_REQUIRED = "auth",
}
export interface EndpointInterface {
  url: string | ((params: { [key: string]: string | number }) => string);
  method: HttpMethod;
  credentials?: CredentialsOption;
  options?: RequestOptions[];
}
export interface EndpointsInterface {
  [key: string]: EndpointInterface;
}
export const authEndpoints: EndpointsInterface = {
  login: {
    url: "/auth/login/",
    method: HttpMethod.POST,
    credentials: CredentialsOption.INCLUDE,
    options: [],
  },
  signup: {
    url: "/auth/signup/",
    method: HttpMethod.POST,
    credentials: CredentialsOption.INCLUDE,
    options: [],
  },
  logout: {
    url: "/auth/logout/",
    method: HttpMethod.POST,
    credentials: CredentialsOption.INCLUDE,
    options: [],
  },
  refreshAccessToken: {
    url: "/auth/refresh/",
    method: HttpMethod.POST,
    credentials: CredentialsOption.INCLUDE,
    options: [],
  },
  reportStolen: {
    url: "/auth/report_refresh_stolen/",
    method: HttpMethod.POST,
    credentials: CredentialsOption.INCLUDE,
    options: [],
  },
  getUserRequest: {
    url: "/auth/get_user/",
    method: HttpMethod.GET,
    options: [RequestOptions.AUTH_REQUIRED],
  },
};

export const dashboardEndpoints: EndpointsInterface = {
  securedContent: {
    url: "/dashboard/content",
    method: HttpMethod.GET,
    options: [RequestOptions.AUTH_REQUIRED],
  },
};
