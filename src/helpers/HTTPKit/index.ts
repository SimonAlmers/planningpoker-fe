/* eslint-disable import/no-cycle */
import axios from "axios";
import requestInterceptor from "./interceptors/request";
import responseErrorInterceptor from "./interceptors/responseError";

class HTTPKit {
  client = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  constructor() {
    this.client.interceptors.request.use(requestInterceptor);
    this.client.interceptors.response.use(
      (response) => response,
      responseErrorInterceptor
    );
  }

  setAuthHeader = (accessToken: string) => {
    this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  get = (url: string, params: object = {}) =>
    this.client({ method: "get", params, url });

  post = (
    url: string,
    data: object,
    params: object = {},
    headers: object = {}
  ) => this.client({ data, headers, method: "post", params, url });

  put = (url: string, data: object, params: object = {}) =>
    this.client({ data, method: "put", params, url });

  patch = (url: string, data: object, params: object = {}) =>
    this.client({ data, method: "patch", params, url });

  delete = (url: string, data: object) =>
    this.client({ data, method: "delete", url });
}

export default new HTTPKit();
