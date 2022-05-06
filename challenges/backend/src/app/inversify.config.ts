import { HomeController } from "./application/controller/home";
import { AsyncContainerModule } from "inversify";
import "reflect-metadata";

export const containerBidings = new AsyncContainerModule(async (bind) => {
  await HomeController;
});
