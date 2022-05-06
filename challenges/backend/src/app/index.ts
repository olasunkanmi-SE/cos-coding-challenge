import "reflect-metadata";
import { Container } from "inversify";
import { containerBidings } from "./inversify.config";
import { bootstrap } from "./main";

export async function runApp() {
  const container = new Container();
  const appPort = Number(process.env.APP_PORT);
  const app = await bootstrap(container, appPort, containerBidings);
  return app;
}

(async () => {
  await runApp();
})().catch(async (e) => {
  console.error(e);
  process.exit(-1);
});
