import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class RestAPIService {
  public static async callAPI(options: Partial<AxiosRequestConfig>): Promise<any> {
    try {
      const response: AxiosResponse = await axios(options);
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
}
