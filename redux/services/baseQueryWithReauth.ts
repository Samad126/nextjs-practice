import swal from "sweetalert";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/authSlice";
import { RootState } from "../app/store";

const API_URL = process.env.NEXT_PUBLIC_URL;

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
});

const authBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

let isRefreshing = false;
let refreshQueue: {
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}[] = [];

export const authBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await authBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newToken) => {
        const newArgs = typeof args === "string" ? { url: args } : { ...args };
        newArgs.headers = {
          ...newArgs.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return authBaseQuery(newArgs, api, extraOptions);
      });
    }

    isRefreshing = true;

    try {
      const state = api.getState() as RootState;
      const refreshToken: string | null = state.auth.refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshResult : any = await publicBaseQuery(
        {
          url: "/users/token/refresh/",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.error) {
        throw new Error("Refresh request failed with error");
      }
      if (!refreshResult.data?.accessToken) {
        throw new Error("No valid 'access' field returned");
      }

      const newAccess = refreshResult.data.accessToken;
      api.dispatch(setCredentials({ accessToken: newAccess, refreshToken }));

      refreshQueue.forEach(({ resolve }) => resolve(newAccess));
      refreshQueue = [];

      const newArgs = typeof args === "string" ? { url: args } : { ...args };
      newArgs.headers = {
        ...newArgs.headers,
        Authorization: `Bearer ${newAccess}`,
      };
      result = await authBaseQuery(newArgs, api, extraOptions);
    } catch (error) {
      refreshQueue.forEach(({ reject }) => reject(error));
      refreshQueue = [];

      swal({
        title: "Sessiya müddəti bitti, xahiş edirik yenidən giriş edin",
        icon: "error",
      }).then(() => {
        api.dispatch(logout());
      });
    } finally {
      isRefreshing = false;
    }
  }

  return result;
};
