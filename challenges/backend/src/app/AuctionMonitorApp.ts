import "reflect-metadata";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./application/services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IActionResponseDTO } from "./application/dtos/auction.dto";

@injectable()
export class AuctionMonitorApp implements ICarOnSaleClient {
  public constructor(@inject(DependencyIdentifier.Logger) private logger: ILogger) {}

  public async start(): Promise<void> {
    this.logger.info(`Auction Monitor started.`);

    // TODO: Retrieve auctions and display aggregated information (see README.md)
  }

  public async getRunningAuctions(): Promise<IActionResponseDTO> {}
}
