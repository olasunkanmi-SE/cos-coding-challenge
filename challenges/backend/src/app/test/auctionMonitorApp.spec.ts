import "reflect-metadata";
import * as sinon from "ts-sinon";
import chai from "chai";
import axios, { AxiosRequestConfig } from "axios";
import { IEnvironmentConfigurationManager, ILogger } from "../infrastructure";
import { AuctionMonitorApp } from "../AuctionMonitorApp";
import { IRestAPI } from "../application/services/CarOnSaleClient/interface/rest-api";
import { auctionMockData } from "./auction-mock-data";

describe("auction monitor app", () => {
  const loggerStub: ILogger = sinon.stubInterface<ILogger>();
  const configManagerStub: IEnvironmentConfigurationManager = sinon.stubInterface<IEnvironmentConfigurationManager>();
  const restAPIServiceStub: IRestAPI = sinon.stubInterface<IRestAPI>();
  const auctionMonitorStub = new AuctionMonitorApp(loggerStub, configManagerStub, restAPIServiceStub);
  //@ts-ignore
  configManagerStub.get = (key: string) => {
    return "/";
  };
  const options: any = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      authtoken: "",
      userid: "",
    },
  };

  it("should return running Auctions", async () => {
    //@ts-ignore
    restAPIServiceStub.callAPI = async (options: Partial<AxiosRequestConfig>): Promise<any> => {
      return auctionMockData;
    };
    const runningAuctions = await auctionMonitorStub.getRunningAuctions();
    chai.expect(runningAuctions.items).to.have.length;
    chai.expect(runningAuctions.page).to.eq(1);
    chai.expect(runningAuctions.total).to.eq(50);
  });

  it("should call the authentication URL", () => {
    let stub: any;
    beforeEach(() => {
      stub = sinon.default.stub(axios, "put");
    });
    it("should send request with correct parameters", () => {
      auctionMonitorStub.getRunningAuctions();
      chai.expect(stub.calledWith("http://api-core-dev.caronsale.de/api/v2/auction/buyer/", options)).to.be.true;
    });
  });
});
