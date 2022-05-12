import { applicationConstants } from "./../constants/constants";
import { ICarOnSaleClient } from "./../services/CarOnSaleClient/interface/ICarOnSaleClient";
import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";
import { userInfoCache } from "../../infrastructure/cache/cache";
import { ILogger } from "../../infrastructure";
import { ApplicationError } from "../../infrastructure/error/application-error";
import { IAuctionResponseDTO } from "../dtos";

@controller("/api/auction")
export class AuctionController extends BaseHttpController {
  public constructor(
    @inject(DependencyIdentifier.AuctionMonitorApp) private auctionMonitor: ICarOnSaleClient,
    @inject(DependencyIdentifier.Logger) private logger: ILogger
  ) {
    super();
  }
  @httpGet("/")
  public async getRunningAuction(@response() res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const userId = this.httpContext.request.headers["userid"];
      const authtoken = this.httpContext.request.headers["authtoken"];
      userInfoCache.mset([
        { key: applicationConstants.userId, val: userId },
        { key: applicationConstants.authtoken, val: authtoken },
      ]);
      if (!userId) {
        return res.status(400).send({ error: "provide a userid in the header of the request" });
      }
      if (!authtoken) {
        return res.status(400).send({ error: "provide a authtoken in the header of the request" });
      }
      const apiResponse: IAuctionResponseDTO = await this.auctionMonitor.getRunningAuctions();
      return res.status(200).send(apiResponse);
    } catch (exception) {
      this.logger.error(ApplicationError.error(ApplicationError.API_ERROR, "Exception while retrieving Auctions", `Exception while retrieving Auctions`));
      throw exception;
    }
  }
}
