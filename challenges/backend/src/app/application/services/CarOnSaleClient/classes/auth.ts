import { ICarOnSaleClient } from "./../interface/ICarOnSaleClient";

import { RestAPIService } from "./rest-api-service";
import { injectable } from "inversify";
import { APIResponseMessages } from "../../../constants/literals";

@injectable()
export class Auth implements ICarOnSaleClient {
  private _baseUrl: string | undefined;
  private _authUrl: string | undefined;
  constructor() {
    this._baseUrl = process.env.BASE_URL;
    this._authUrl = process.env.AUTH_URL;
  }
  async authenticateUser(data: { userId: string; password: string }): Promise<any> {
    try {
      const options: any = {
        method: "PUT",
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      if (!this._baseUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      if (!this._authUrl) {
        throw new Error(APIResponseMessages.ERROR_GETTING_BASE_URL);
      }
      const userId: string = options.data.userId;
      const url: string = `${this._baseUrl}${this._authUrl}${userId}`;
      options.url = url;
      const auth = await RestAPIService.callAPI(options);
      console.log(auth.data);
      return auth.data;
    } catch (error: any) {
      console.log(error);
    }
  }
}
