import { IEnvironmentConfigurationManager } from "./infrastructure/configuration/env-config-manager.interface";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { HomeController } from "./application/controller/home";
import { ContainerModule, interfaces } from "inversify";
import { initLogger } from "./infrastructure/Logger/init_logger";
import { Context } from "./infrastructure/context/context";
import { ApplicationLogger } from "./infrastructure/Logger/classes/Logger";
import { IContextManager } from "./infrastructure/context/context-manager.interface";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { EnvironmentConfigurationManager } from "./infrastructure/configuration/env-config-manager";

export const containerBidings = new ContainerModule((bind: interfaces.Bind) => {
  const winstonLogger = initLogger();
  const contextManager = new Context("", new Date());
  const environmentConfigurationManger = new EnvironmentConfigurationManager();

  bind<IEnvironmentConfigurationManager>(DependencyIdentifier.ConfigurationManager).toConstantValue(
    environmentConfigurationManger
  );

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

  HomeController;
});
