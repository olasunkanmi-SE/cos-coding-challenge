import { ApplicationError } from "./../../../../infrastructure/error/application-error";
import { IRestAPI } from "./../interface/rest-api";
import { DependencyIdentifier } from "./../../../constants/DependencyIdentifiers";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { ILogger } from "../../../../infrastructure";

@injectable()
export class RestAPIService implements IRestAPI {
  public constructor(@inject(DependencyIdentifier.Logger) private logger: ILogger) {}
  public async callAPI(options: Partial<AxiosRequestConfig>): Promise<any> {
    try {
      const response: AxiosResponse = await axios(options);
      return response.data;
    } catch (error: any) {
      this.logger.error(ApplicationError.error(error.response.status, error.response.statusText, `Exception while calling API-> ${options}`));
      throw error;
    }
  }
}
