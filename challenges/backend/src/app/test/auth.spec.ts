import axios, { AxiosRequestConfig } from "axios";
import { IRestAPI } from "./../application/services/CarOnSaleClient/interface/rest-api";
import { IEnvironmentConfigurationManager } from "./../infrastructure/configuration/env-config-manager.interface";
import "reflect-metadata";
import * as sinon from "ts-sinon";
import chai from "chai";
import { ILogger } from "../infrastructure";
import { Auth } from "../application/services/CarOnSaleClient";

describe("user authentication", async () => {
  const loggerStub: ILogger = sinon.stubInterface<ILogger>();
  const configManagerStub: IEnvironmentConfigurationManager = sinon.stubInterface<IEnvironmentConfigurationManager>();
  const restAPISserviceStub: IRestAPI = sinon.stubInterface<IRestAPI>();
  const auth = new Auth(configManagerStub, restAPISserviceStub, loggerStub);
  const mockData = {
    token: "eyJhbGc",
    authenticated: true,
    userId: "buyer-challenge@caronsale.de",
    internalUserId: 2324,
    internalUserUUID: "054d4577-69a0-4e4b-8e5e-975bcf8c62c7",
    type: 1,
    privileges: "{SALESMAN_USER}",
  };

  const mockRequest: any = {
    method: "PUT",
    url: "http://api-core-dev.caronsale.de/api/v1/authentication/",
    data: {
      userId: "buyer-challenge@caronsale.de",
      password: "",
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  it("should return user auth data", async () => {
    // @ts-ignore
    configManagerStub.get = (key: string) => {
      return "/";
    };
    // @ts-ignore
    restAPISserviceStub.callAPI = async (options: Partial<AxiosRequestConfig>): Promise<any> => {
      return mockData;
    };
    const result = await auth.authenticateUser(mockRequest.data);
    chai.expect(result.userId).to.eq("buyer-challenge@caronsale.de");
    chai.expect(result.authenticated).to.eq(true);
    chai.expect(result.internalUserId).to.eq(2324);
  });

  it("should call the authentication URL", () => {
    let stub: any;
    beforeEach(() => {
      stub = sinon.default.stub(axios, "put");
    });
    it("should send request with correct parameters", () => {
      auth.authenticateUser(mockRequest.data);
      chai.expect(stub.calledWith("http://api-core-dev.caronsale.de/api/v1/authentication/", mockRequest)).to.be.true;
    });
  });
});
