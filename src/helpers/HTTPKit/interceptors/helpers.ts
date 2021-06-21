import { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import APIKit from "helpers/APIKit";
import HTTPKit from "helpers/HTTPKit";
import { COOKIES } from "helpers/Constants";

// Constants

export const tokenRefreshEndpoint = "/api/token/refresh";

// Types

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface FailedQueueObject {
  resolve: (accessToken: string) => void;
  reject: (reason?: any) => void;
}

// Functions

export const storeTokens = (tokens: TokenResponse) => {
  const in15minutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  Cookie.set(COOKIES.ACCESS_TOKEN, tokens.access, {
    expires: in15minutes,
  });
  Cookie.set(COOKIES.REFRESH_TOKEN, tokens.refresh, { expires: 30 });
};

export const clearTokens = () => {
  Cookie.remove(COOKIES.ACCESS_TOKEN);
  Cookie.remove(COOKIES.REFRESH_TOKEN);
};

export const queueFailedRequest =
  (queue: FailedQueueObject[]) =>
  (
    resolve: FailedQueueObject["resolve"],
    reject: FailedQueueObject["reject"]
  ) => {
    queue.push({ resolve, reject });
  };

export const resolveRequest =
  (accessToken: string) =>
  ({ resolve }) =>
    resolve(accessToken);

export const rejectRequest =
  (error) =>
  ({ reject }) =>
    reject(error);

export const retryRequest =
  (request: AxiosRequestConfig) => (accessToken: string) => {
    request.headers.Authorization = `Bearer ${accessToken}`;
    return HTTPKit.client.request(request);
  };

export const getRefreshedTokens = (): Promise<TokenResponse["access"]> => {
  return new Promise((resolve, reject) => {
    APIKit.auth
      .refreshTokens()
      .then(({ data }: { data: TokenResponse }) => {
        storeTokens(data);
        resolve(data.access);
      })
      .catch((err) => {
        clearTokens();
        reject(err);
        // redirectToLogin(re, undefined, Router.asPath);
      });
  });
};
