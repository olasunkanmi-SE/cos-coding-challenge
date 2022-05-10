import { applicationConstants } from "./../constants/constants";
import { ICarOnSaleClient } from "./../services/CarOnSaleClient/interface/ICarOnSaleClient";
import { Response } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";
import { userInfoCache } from "../../infrastructure/cache/cache";

@controller("/api/auction")
export class AuctionController extends BaseHttpController {
  public constructor(@inject(DependencyIdentifier.AuctionMonitorApp) private auctionMonitor: ICarOnSaleClient) {
    super();
  }
  @httpGet("/")
  public async getRunningAuction(@response() res: Response): Promise<any> {
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
      const apiResponse = await this.auctionMonitor.getRunningAuctions();
      return res.status(200).send(apiResponse);
    } catch (error) {}
  }
}
