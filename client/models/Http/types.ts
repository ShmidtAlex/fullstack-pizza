import { AxiosInstance } from "axios";

export interface IAxiosHeaders {
  "Cache-Control"?: "no-cache";
  "x-api-version"?: string;
  Authorization?: string;
}

export interface IAxiosConfig {
  baseURL?: string;
  headers?: IAxiosHeaders;
}

export interface IHttpService {
  axiosConfig?: IAxiosConfig;
  axiosClient: AxiosInstance;
  wrap: Function;
}

export interface IError {
  Message: string;
  Target: string;
}

export interface IErrorData {
  Code: string;
  Details: IError[];
}

// Todo: wtf???
export enum IErrorStatuses {
  BadRequest = 400,
  NotAuthorize = 401,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalError = 500,
  ServiceUnavailable = 503,
}
