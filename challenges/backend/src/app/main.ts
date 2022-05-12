import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { errorMiddleware } from "./infrastructure/middleware/error-middleware";
import { loggerMiddleware } from "./infrastructure/middleware/logger-middleware";
import { contextMiddleWare } from "./infrastructure/middleware/context-middleware";
import cors from "cors";
import { ApplicationError } from "./infrastructure/error/application-error";

declare module "express-session" {
  export interface SessionData {
    authtoken: string;
    userId: string;
  }
}

/**
 * Start Express server
 *
 * @export
 * @param {Container} container Inversify container
 * @param {number} appPort The port on which the app needs to run
 * @param {...ContainerModule[]} modules The container modules that needs to be loaded
 * @returns
 */
export async function bootstrap(container: Container, appPort: number, ...modules: ContainerModule[]) {
  const startTime = Date.now();
  if (container.isBound(DependencyIdentifier.App) === false) {
    container.load(...modules);
    const logger: ILogger = container.get<ILogger>(DependencyIdentifier.Logger);
    logger.info("Logger Initialised");

    const server = new InversifyExpressServer(container);
    logger.info("Initialising express server");

    server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(cors());
      app.use(bodyParser.json());
      app.use(loggerMiddleware);
      app.use(contextMiddleWare);
    });

    server.setErrorConfig((app) => {
      app.use(errorMiddleware);
    });

    try {
      const serverInstance = server.build();
      serverInstance.listen(appPort);
      console.log(`server is running on port ${appPort}`);
    } catch (error) {
      ApplicationError.EXPRESS_SERVER_RUN_ERROR;
      throw error;
    }
    logger.info(`Booted in: ${Date.now() - startTime}ms.`);
  }
}
