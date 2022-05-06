import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { DependencyIdentifier } from "./application/constants/DependencyIdentifiers";
// import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";

/**
 * Start Express server
 *
 * @export
 * @param {Container} container Inversify container
 * @param {number} appPort The port on which the app needs to run
 * @param {...ContainerModule[]} modules The container modules that needs to be loaded
 * @returns
 */
export async function bootstrap(
  container: Container,
  appPort: number,
  ...modules: ContainerModule[]
) {
  if (container.isBound(DependencyIdentifier.App) === false) {
    container.load(...modules);
    const logger: ILogger = container.get<ILogger>(DependencyIdentifier.Logger);
    logger.info("Logger Initialised");
    let server = new InversifyExpressServer(container);
    logger.info("Initialising express server");
    server.setConfig((app) => {
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());
    });
    try {
      let serverInstance = server.build();
      serverInstance.listen(appPort);
      console.log(`server is running on port ${appPort}`);
    } catch (error) {
      console.log(error);
    }
  }
}
