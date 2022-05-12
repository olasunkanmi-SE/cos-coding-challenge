import { ApplicationError } from "./../../infrastructure/error/application-error";
import { ILogger } from "./../../infrastructure/Logger/interface/ILogger";
import { Context } from "./../../infrastructure/context/context";
import { IAuthResponse } from "./../dtos/auth.dto";
import { validateRequest } from "./../../validation/validate";
import { inject } from "inversify";
import { Response, Request } from "express";
import { controller, requestBody, httpPut, response, request } from "inversify-express-utils";
import { DependencyIdentifier } from "../constants/DependencyIdentifiers";
import { IUserAuthDTO } from "../dtos/auth.dto";
import { IBuyerAuth } from "../services/CarOnSaleClient/interface/auth";

@controller("/api/auth")
export class AuthController {
  public constructor(@inject(DependencyIdentifier.Auth) private auth: IBuyerAuth, @inject(DependencyIdentifier.Logger) private logger: ILogger) {}
  @httpPut("/")
  public async validateUser(
    @requestBody() reqBody: IUserAuthDTO,
    @response() res: Response,
    @request() req: Request
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const data: { userId: string; password: string } = {
        userId: reqBody.userMailId,
        password: reqBody.password,
      };
      const { errors, isValid } = validateRequest(reqBody);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const contextManager = new Context(new Date(), data.userId, req.path);
      const apiResponse: IAuthResponse = await this.auth.authenticateUser(data, contextManager.getContextData());
      return res.status(200).json(apiResponse);
    } catch (exception) {
      this.logger.error(
        ApplicationError.error(
          ApplicationError.API_ERROR,
          "Exception while authenticating user",
          `Exception while authenticating user -> ${reqBody.userMailId}`
        )
      );
      throw exception;
    }
  }
}
