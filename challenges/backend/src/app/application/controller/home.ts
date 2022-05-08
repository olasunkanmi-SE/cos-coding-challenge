import { Response } from "express";
import { controller, httpGet, response } from "inversify-express-utils";

@controller("/api")
export class HomeController {
  @httpGet("/")
  public get(@response() res: Response) {
    return res.status(200).send({ hello: "Hi" });
  }
}
