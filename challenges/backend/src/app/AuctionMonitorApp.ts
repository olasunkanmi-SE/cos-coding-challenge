import { ApplicationError } from "./infrastructure/error/application-error";
import "reflect-metadata";
import { applicationConstants } from "./application/constants/constants";
import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./application/services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuctionResponseDTO } from "./application/dtos/auction.dto";
import { APIResponseMessages } from "./application/constants/literals";
import { RestAPIService } from "./application/services/CarOnSaleClient/classes";
import { userInfoCache } from "./infrastructure/cache/cache";
import { IEnvironmentConfigurationManager } from "./infrastructure";

@injectable()
export class AuctionMonitorApp implements ICarOnSaleClient {
  public constructor(
    @inject(DependencyIdentifier.Logger) private logger: ILogger,
    @inject(DependencyIdentifier.ConfigurationManager) private configurationManager: IEnvironmentConfigurationManager,
    @inject(DependencyIdentifier.RestAPIService) private restAPIService: RestAPIService
  ) {}

  public async start(): Promise<void> {
    this.logger.info(`Auction Monitor started.`);
  }

  public async getRunningAuctions(): Promise<AxiosResponse<IAuctionResponseDTO, any>> {
    try {
      this.start();
      const options: any = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authtoken: userInfoCache.get(applicationConstants.authtoken) ? userInfoCache.get(applicationConstants.authtoken) : "",
          userid: userInfoCache.get(applicationConstants.userId) ? userInfoCache.get(applicationConstants.userId) : "",
        },
      };
      const baseUrl = this.configurationManager.get("BASE_URL");
      const buyerUrl = this.configurationManager.get("BUYER_URL");
      if (!baseUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      if (!buyerUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      const url: string = `${baseUrl}${buyerUrl}`;
      options.url = url;
      const auth: AxiosResponse<IAuctionResponseDTO, any> = await this.restAPIService.callAPI(options);
      return auth;
    } catch (error: any) {
      this.logger.error(
        ApplicationError.error(ApplicationError.API_ERROR, "Exception while retrieving running auctions", `Exception while retrieving running auctions`)
      );
      throw error;
    }
  }
}
