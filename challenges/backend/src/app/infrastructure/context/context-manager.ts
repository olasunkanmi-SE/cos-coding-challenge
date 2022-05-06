import { Errors } from "../error/error";
import { IAuthToken } from "./security-token";

export interface IContextData {
  userId: string;
  authToken?: IAuthToken;
  requestTimeStamp: string;
  additionalData: { [index: string]: any } | undefined;
  errors: Errors;
}

export interface IContextManager {
  getContextData(): IContextData;
}
