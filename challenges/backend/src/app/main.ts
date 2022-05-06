import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
// import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { InversifyExpressServer } from "inversify-express-utils";
import bodyParser from "body-parser";

/*
 * Create the DI container.
 */
const container = new Container();

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);

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

console.log("server is running on port");

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
