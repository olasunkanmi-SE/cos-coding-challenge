import { IRestAPI } from "./application/services/CarOnSaleClient/interface/rest-api";
import { IEnvironmentConfigurationManager } from "./infrastructure/configuration/env-config-manager.interface";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { AuctionController } from "./application/controller/auction";
import { ContainerModule, interfaces } from "inversify";
import { initLogger } from "./infrastructure/Logger/init_logger";
import { Context } from "./infrastructure/context/context";
import { ApplicationLogger } from "./infrastructure/Logger/classes/Logger";
import { IContextManager } from "./infrastructure/context/context-manager.interface";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { EnvironmentConfigurationManager } from "./infrastructure/configuration/env-config-manager";
import { AuctionMonitorApp } from "./auctionMonitorApp";
import { Auth } from "./application/services/CarOnSaleClient/classes/auth";
import { AuthController } from "./application/controller/auth";
import { IBuyerAuth } from "./application/services/CarOnSaleClient/interface/auth";
import { ICarOnSaleClient } from "./application/services/CarOnSaleClient/interface/ICarOnSaleClient";
import { RestAPIService } from "./application/services/CarOnSaleClient";

export const containerBidings = new ContainerModule((bind: interfaces.Bind) => {
  const winstonLogger = initLogger();
  const contextManager = new Context(new Date());
  const environmentConfigurationManger = new EnvironmentConfigurationManager();

  bind<IEnvironmentConfigurationManager>(DependencyIdentifier.ConfigurationManager).toConstantValue(environmentConfigurationManger);

  bind<IContextManager>(DependencyIdentifier.CurrentContext)
    .toDynamicValue(() => {
      return contextManager;
    })
    .inSingletonScope();

  const applicationContextLogger = new ApplicationLogger(contextManager, winstonLogger);
  bind<ILogger>(DependencyIdentifier.Logger)
    .toDynamicValue(() => {
      return applicationContextLogger;
    })
    .inSingletonScope();

  bind<ICarOnSaleClient>(DependencyIdentifier.AuctionMonitorApp).to(AuctionMonitorApp).inSingletonScope();

  bind<IBuyerAuth>(DependencyIdentifier.Auth).to(Auth).inSingletonScope();

  bind<IRestAPI>(DependencyIdentifier.RestAPIService).to(RestAPIService).inSingletonScope();
  AuctionController;
  AuthController;
});
