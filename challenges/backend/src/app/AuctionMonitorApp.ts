import "reflect-metadata";
import { IEnvironmental } from "./application/services/CarOnSaleClient/interface/environmentalVariables";
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

@injectable()
export class AuctionMonitorApp implements ICarOnSaleClient {
  public constructor(
    @inject(DependencyIdentifier.Logger) private logger: ILogger,
    @inject(DependencyIdentifier.EnvironmentVariable) private environmentVariable: IEnvironmental
  ) {}

  public async start(): Promise<void> {
    this.logger.info(`Auction Monitor started.`);
    this.getRunningAuctions();
  }

  public async getRunningAuctions(): Promise<AxiosResponse<IAuctionResponseDTO, any>> {
    try {
      const options: any = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authtoken: userInfoCache.get(applicationConstants.authtoken) ? userInfoCache.get(applicationConstants.authtoken) : "",
          userid: userInfoCache.get(applicationConstants.userId) ? userInfoCache.get(applicationConstants.userId) : "",
        },
      };
      const baseUrl = this.environmentVariable.getBaseURL();
      const buyerUrl = this.environmentVariable.getBuyerURL();
      if (!baseUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      if (!buyerUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      const url: string = `${baseUrl}${buyerUrl}`;
      options.url = url;
      const auth: AxiosResponse<IAuctionResponseDTO, any> = await RestAPIService.callAPI(options);
      return auth;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
