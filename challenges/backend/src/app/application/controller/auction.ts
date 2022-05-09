import { Response } from "express";
import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";

@controller("/api")
export class AuctionController extends BaseHttpController {
  @httpGet("/")
  public async getRunningAuction(@response() res: Response): Promise<any> {
    try {
      const userId = this.httpContext.request.headers["userid"];
      const authtoken = this.httpContext.request.headers["authtoken"];
      if (!userId) {
        return res.status(400).send({ error: "provide a userid in the header of the request" });
      }
      if (!authtoken) {
        return res.status(400).send({ error: "provide a authtoken in the header of the request" });
      }
      return res.status(200).send({ hello: "Hi" });
    } catch (error) {}
  }
}
