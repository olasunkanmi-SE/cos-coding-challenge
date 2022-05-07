import { Errors } from "../error/error";
import { IContextManager, IContextData } from "./context-manager.interface";

/**
 * Context Object will return current context information of a Request
 * @export
 * @class Context
 */

export class Context implements IContextManager {
  private readonly _userId: string | undefined;
  private readonly _authToken: string | undefined;
  private readonly _requestTimeStamp: string;
  private readonly _additionalData: { [index: string]: any } | undefined;
  private readonly _errors: Errors;
  private readonly _requestContext?: string;

  /**
   * Creates an instance of Context
   * Pass the Context Information to the constructor
   * For e.g. `new Context("buyer-challenge@caronsale.de", "2022-05-06T09:36:46.229Z", "HTTP POST api/role", "", "")`
   * @param {string} requestTimeStamp Date and time of this occurence for example ("2022-05-06T09:36:46.229Z")
   * @param {string} userId Email Address of the Current User
   * @param {string} requestContext Request Context (`HTTP POST api/user`)
   * @param {string} [authToken] `OPTIONAL PARAMETER` Authorization Token for the current request
   * @param {{[index: string]: any}} additionalData Additional data to be mainatined i context in the form of object of key values pairs where key is of string type and value could be of any type
   * @memberof Context
   */
  constructor(
    requestTimeStamp: Date,
    userId?: string,
    requestContext?: string,
    authToken?: string,
    additionalData?: { [index: string]: any }
  ) {
    this._userId = userId;
    this._authToken = authToken;
    this._requestTimeStamp = requestTimeStamp?.toISOString();
    this._additionalData = additionalData;
    this._requestContext = requestContext;
    this._errors = new Errors([], requestContext);
  }

  get userId(): string | undefined {
    return this._userId;
  }

  get authToken(): string | undefined {
    return this._authToken;
  }

  get requestTimeStamp(): string {
    return this._requestTimeStamp;
  }

  get additionalData(): { [index: string]: any } | undefined {
    return this._additionalData;
  }

  get requestContext(): string | undefined {
    return this._requestContext;
  }

  get errors(): Errors {
    return this._errors;
  }

  getContextData(): IContextData {
    return {
      userId: this.userId,
      authToken: this.authToken,
      requestTimeStamp: this.requestTimeStamp,
      additionalData: this.additionalData,
      errors: this.errors,
    };
  }
}
