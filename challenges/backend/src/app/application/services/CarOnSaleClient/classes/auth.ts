import { RestAPIService } from "./rest-api-service";
import { inject, injectable } from "inversify";
import { APIResponseMessages } from "../../../constants/literals";
import { IBuyerAuth } from "../interface/auth";
import { IAuthResponse } from "../../../dtos/auth.dto";
import { AxiosResponse } from "axios";
import { DependencyIdentifier } from "../../../constants";
import { IEnvironmentConfigurationManager, ILogger } from "../../../../infrastructure";
import { ApplicationError } from "../../../../infrastructure/error/application-error";
@injectable()
export class Auth implements IBuyerAuth {
  public constructor(
    @inject(DependencyIdentifier.ConfigurationManager) private configurationManager: IEnvironmentConfigurationManager,
    @inject(DependencyIdentifier.RestAPIService) private restAPIService: RestAPIService,
    @inject(DependencyIdentifier.Logger) private logger: ILogger
  ) {}
  public async authenticateUser(data: { userId: string; password: string }): Promise<AxiosResponse<IAuthResponse, any>> {
    try {
      const options: any = {
        method: "PUT",
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const baseUrl = this.configurationManager.get("BASE_URL");
      const authUrl = this.configurationManager.get("AUTH_URL");
      if (!baseUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      if (!authUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      const userId: string = options.data.userId;
      const url: string = `${baseUrl}${authUrl}${userId}`;
      options.url = url;
      const auth: AxiosResponse<IAuthResponse, any> = await this.restAPIService.callAPI(options);
      return auth;
    } catch (error: any) {
      this.logger.error(ApplicationError.error(error.response.status, error.response.statusText, `error.message -> ${data}`));
      throw error;
    }
  }
}
