import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import "reflect-metadata";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";

@injectable()
export class AuctionMonitorApp {
  public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {}

  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
  }
}
