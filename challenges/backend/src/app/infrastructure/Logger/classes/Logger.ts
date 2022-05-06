import "reflect-metadata";
import { ILogger } from "../interface/ILogger";
import { injectable } from "inversify";
import { Logger } from "winston";
import { BaseError } from "../../error/base-error";
import { IContextManager } from "../../context/context-manager";
import { IContextData } from "./../../context/context-manager";
import { IErrorMetadata } from "./../../error/error-metadata";

@injectable()
export class ApplicationLogger implements ILogger {
  private _logger: Logger;
  private _currentContextManager: IContextManager;

  constructor(currentContextManager: IContextManager, logger: Logger) {
    this._currentContextManager = currentContextManager;
    this._logger = logger;
  }

  error(error: BaseError, meta?: IErrorMetadata, errorCode?: number): Logger {
    const exception = meta?.exception;
    const contextData = this.getErrorContextData(error);
    if (typeof error === "string") {
      return this._logger.error(error, { ...contextData, ...meta });
    }

    if (error instanceof Error) {
      return this._logger.error(`${JSON.stringify(error)}`, {
        ...contextData,
        ...meta,
        error: { ...error },
        errorCode,
      });
    }

    return this._logger.error(`{${error.code}} - {${error.name}} - {${error.description}}`, {
      exception: { ...exception },
      ...contextData,
      ...meta,
      error: { ...error },
      errorCode,
    });
  }

  private getErrorContextData(error: BaseError): IContextData {
    const contextData: IContextData = this._currentContextManager.getContextData();
    contextData.errors.errors.push(error);
    return contextData;
  }
}
