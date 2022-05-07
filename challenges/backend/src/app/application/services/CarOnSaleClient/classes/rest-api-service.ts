import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class RestAPIService {
 public static async callAPI<T>(options: Partial<AxiosRequestConfig>): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse = await axios(options);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}
