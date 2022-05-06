import "reflect-metadata";
import { Container } from "inversify";
import { DependencyIdentifier } from "./DependencyIdentifiers";
// import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";
import { ILogger } from "./infrastructure/Logger/interface/ILogger";
import { Logger } from "./infrastructure/Logger/classes/Logger";
import { containerBidings } from "./inversify.config";

/*
 * Create the DI container.
 */
const container = new Container();

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);

container.loadAsync(containerBidings);
//start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});

let serverInstance = server.build();
serverInstance.listen(3000);

console.log("server is running on port 3000");

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
// const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
// (async () => {
//   await app.start();
// })();
