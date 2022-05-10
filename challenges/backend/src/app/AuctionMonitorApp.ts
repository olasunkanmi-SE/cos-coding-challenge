import { applicationConstants } from "./application/constants/constants";
import "reflect-metadata";
import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./application/services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IActionResponseDTO } from "./application/dtos/auction.dto";
import { APIResponseMessages } from "./application/constants/literals";
import { RestAPIService } from "./application/services/CarOnSaleClient/classes";
import { userInfoCache } from "./infrastructure/cache/cache";

@injectable()
export class AuctionMonitorApp implements ICarOnSaleClient {
  private _baseUrl: string | undefined;
  private _buyerUrl: string | undefined;
  public constructor(@inject(DependencyIdentifier.Logger) private logger: ILogger) {
    this._baseUrl = process.env.BASE_URL;
    this._buyerUrl = process.env.BUYER_URL;
  }

  public async start(): Promise<void> {
    this.logger.info(`Auction Monitor started.`);
    this.getRunningAuctions();
  }

  public async getRunningAuctions(): Promise<IActionResponseDTO> {
    try {
      const options: any = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          authtoken: userInfoCache.get(applicationConstants.authtoken),
          userid: userInfoCache.get(applicationConstants.userId),
        },
      };
      if (!this._baseUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      if (!this._buyerUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      //   const userId: string = options.data.userId;
      const url: string = `${this._baseUrl}${this._buyerUrl}`;
      options.url = url;
      const auth: AxiosResponse<IActionResponseDTO, any> = await RestAPIService.callAPI(options);
      return auth.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
