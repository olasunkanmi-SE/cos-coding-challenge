// import { IEnvironmental } from "./../application/services/CarOnSaleClient/interface/environmentalVariables";
// import "reflect-metadata";
// import * as sinon from "ts-sinon";
// import chai from "chai";
// import { ILogger } from "../infrastructure";
// import { AuctionMonitorApp } from "../AuctionMonitorApp";

// describe("auction monitor app", () => {
//   const loggerStub: ILogger = sinon.stubInterface<ILogger>();
//   const environmentVariableStub: IEnvironmental = sinon.stubInterface<IEnvironmental>();
//   const auctionMonitorStub = new AuctionMonitorApp(loggerStub, environmentVariableStub);
//   process.env.BASE_URL = "test";
//   process.env.BUYER_URL = "test";
//   process.env.AUTH_URL = "test";
//   it("should log running auction", async () => {
//     const log = await auctionMonitorStub.start();
//     chai.expect(log).to.eq(undefined);
//   });
// });
