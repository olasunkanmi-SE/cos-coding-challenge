import { Errors } from "../error/error";

export interface IContextData {
  userId?: string;
  authToken?: string;
  requestTimeStamp: string;
  additionalData: { [index: string]: any } | undefined;
  errors: Errors;
}

export interface IContextManager {
  getContextData(): IContextData;
}
