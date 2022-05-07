import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { AuctionMonitorApp } from "../../AuctionMonitorApp";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";

@controller("/")
export class HomeController {
  constructor(
    @inject(DependencyIdentifier.AuctionMonitorApp) private auctionMonitorApp: AuctionMonitorApp
  ) {}
  @httpGet("/")
  public get() {
    return this.auctionMonitorApp.start();
  }
}
