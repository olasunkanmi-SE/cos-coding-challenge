import { injectable } from "inversify";
import { IEnvironmental } from "../interface/environmentalVariables";
@injectable()
export class EnvironmentVariable implements IEnvironmental {
  public constructor() {}
  getBaseURL(): string | undefined {
    return process.env.BASE_URL;
  }

  getBuyerURL(): string | undefined {
    return process.env.BUYER_URL;
  }

  getAuthURL(): string | undefined {
    return process.env.AUTH_URL;
  }
}
