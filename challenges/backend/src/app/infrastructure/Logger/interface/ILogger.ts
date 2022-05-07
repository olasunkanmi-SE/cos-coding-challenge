import { Logger } from "winston";
import { BaseError } from "../../error/base-error";
import { IErrorMetadata } from "../../error/error-metadata";

/**
 * Error Logger accepts error metadatas and logs the error for further debugging
 * @export
 * @interface ILogger
 */
export interface RequestMethod {
  name: string;
  url: string;
  duration: number;
  resultCode: number;
  success: true;
}
export interface ILogger {
  error(message: BaseError, meta?: IErrorMetadata, errorCode?: number): Logger;
  info(message: string, meta?: object): Logger;
  trackRequest(params: RequestMethod): RequestMethod;
}
