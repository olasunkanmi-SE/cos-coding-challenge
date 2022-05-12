import { AxiosRequestConfig } from "axios";

export interface IRestAPI {
  callAPI(options: Partial<AxiosRequestConfig>): Promise<any>;
}
