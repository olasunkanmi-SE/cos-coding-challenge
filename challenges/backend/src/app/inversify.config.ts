import { HomeController } from "./application/controller/home";
import { AsyncContainerModule } from "inversify";

export const containerBidings = new AsyncContainerModule(async () => {
  await HomeController;
});
