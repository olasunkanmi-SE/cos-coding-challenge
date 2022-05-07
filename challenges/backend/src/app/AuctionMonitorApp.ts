import "reflect-metadata";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";

@injectable()
export class AuctionMonitorApp {
  public constructor(@inject(DependencyIdentifier.Logger) private logger: ILogger) {}

  public async start(): Promise<void> {
    this.logger.info(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
  }
}
