import { RestAPIService } from "./rest-api-service";
import { injectable } from "inversify";
import { APIResponseMessages } from "../../../constants/literals";
import { IBuyerAuth } from "../interface/auth";
import { IAuthResponse } from "../../../dtos/auth.dto";
import { AxiosResponse } from "axios";
@injectable()
export class Auth implements IBuyerAuth {
  private _baseUrl: string | undefined;
  private _authUrl: string | undefined;
  public constructor() {
    this._baseUrl = process.env.BASE_URL;
    this._authUrl = process.env.AUTH_URL;
  }
  public async authenticateUser(data: { userId: string; password: string }): Promise<AxiosResponse<IAuthResponse, any>> {
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
      const auth: AxiosResponse<IAuthResponse, any> = await RestAPIService.callAPI(options);
      return auth;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
