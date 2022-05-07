import { validateRequest } from "./../../validation/validate";
import { inject } from "inversify";
import { Response } from "express";
import { controller, requestBody, httpPut, response } from "inversify-express-utils";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";
import { ICarOnSaleClient } from "../services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IUserAuthDTO } from "../auth/dtos/user-auth-dto";

@controller("/auth")
export class AuthController {
  constructor(@inject(DependencyIdentifier.Auth) private auth: ICarOnSaleClient) {}
  @httpPut("/")
  public async validateUser(
    @requestBody() reqBody: IUserAuthDTO,
    @response() res: Response
  ): Promise<any> {
    try {
      const data: { userId: string; password: string } = {
        userId: reqBody.userMailId,
        password: reqBody.password,
      };
      let validAuthRequest = validateRequest(reqBody);
      if (!validAuthRequest.isValid) {
        return res.status(400).json({ isSuccess: "false", error: validAuthRequest.errors });
      }
      const response = await this.auth.authenticateUser(data);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}
