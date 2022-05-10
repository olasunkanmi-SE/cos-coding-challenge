import { IAuthResponse } from "./../dtos/auth.dto";
import { validateRequest } from "./../../validation/validate";
import { inject } from "inversify";
import { Response } from "express";
import { controller, requestBody, httpPut, response } from "inversify-express-utils";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";
import { IUserAuthDTO } from "../dtos/auth.dto";
import { IBuyerAuth } from "../services/CarOnSaleClient/interface/auth";

@controller("/api/auth")
export class AuthController {
  public constructor(@inject(DependencyIdentifier.Auth) private auth: IBuyerAuth) {}
  @httpPut("/")
  public async validateUser(@requestBody() reqBody: IUserAuthDTO, @response() res: Response): Promise<any> {
    try {
      const data: { userId: string; password: string } = {
        userId: reqBody.userMailId,
        password: reqBody.password,
      };
      const { errors, isValid } = validateRequest(reqBody);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const apiResponse: IAuthResponse | undefined = await this.auth.authenticateUser(data);
      return res.status(200).json(apiResponse);
    } catch (error) {
      console.log(error);
    }
  }
}
