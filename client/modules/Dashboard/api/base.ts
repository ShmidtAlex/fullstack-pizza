import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IAxiosConfig } from "~/models/Http/types";

axios.defaults.withCredentials = true;

export default class BaseHttpService<HttpService> {
  axiosConfig = {
    withCredentials: true,
    baseURL: `http://localhost:5009/api/`,
    headers: {
      "Cache-Control": "no-cache",
    },
  };

  axiosClient: AxiosInstance = axios.create();

  constructor(config: IAxiosConfig = {}) {
    this.axiosClient = axios.create(
      Object.assign(this.axiosConfig, config) as any
    );
    this.axiosClient.defaults.withCredentials = true;
    this.axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;
        return config;
      }
      return config as any;
    });
  }

  wrap(callback: Function): any {
    callback.bind(this).call(this, this);
    return this;
  }
}
