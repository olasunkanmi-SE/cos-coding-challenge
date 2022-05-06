import { injectable } from "inversify";
import { IAuthToken } from "./security-token";

/**
 * Context Object will return current context information of a Request
 * @export
 * @class Context
 */
@injectable()
export class Context {
  private readonly _userId: string;
  private readonly _authToken: IAuthToken | undefined;
  private readonly _requestTimeStamp: string;
  private readonly _additionalData:
    | {
        [index: string]: any;
      }
    | undefined;
  constructor(
    userId: string,
    requestTimeStamp: Date,
    authToken?: IAuthToken,
    additionalData?: {
      [index: string]: any;
    }
  ) {
    this._userId = userId;
    this._authToken = authToken;
    this._requestTimeStamp = requestTimeStamp?.toISOString();
    this._additionalData = additionalData;
  }

  get userId(): string {
    return this._userId;
  }

  get authToken(): IAuthToken | undefined {
    return this._authToken;
  }

  get requestTimeStamp(): string {
    return this._requestTimeStamp;
  }

  get additionalData():
    | {
        [index: string]: any;
      }
    | undefined {
    return this._additionalData;
  }
}
