import "reflect-metadata";
import { ILogger, RequestMethod } from "../interface/ILogger";
import { injectable } from "inversify";
import { Logger } from "winston";
import { BaseError } from "../../error/base-error";
import { IContextManager } from "../../context/context-manager.interface";
import { IContextData } from "../../context/context-manager.interface";
import { IErrorMetadata } from "./../../error/error-metadata";

@injectable()
export class ApplicationLogger implements ILogger {
  private _logger: Logger;
  private _currentContextManager: IContextManager;

  public constructor(currentContextManager: IContextManager, logger: Logger) {
    this._currentContextManager = currentContextManager;
    this._logger = logger;
  }

  public info(message: string, meta?: object): Logger {
    const contextData = this.getErrorContextData();
    return this._logger.info(message, { ...contextData, ...meta });
  }

  public error(error: BaseError, meta?: IErrorMetadata, errorCode?: number): Logger {
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

  private getErrorContextData(error?: BaseError): IContextData | undefined {
    if (!error) {
      return this._currentContextManager.getContextData();
    }
    const contextData: IContextData = this._currentContextManager.getContextData();
    contextData.errors.errors.push(error);
    return contextData;
  }

  public trackRequest(params: RequestMethod): RequestMethod {
    const { name, url, duration, resultCode, success } = params;
    return {
      name,
      url,
      duration,
      resultCode,
      success,
    };
  }
}
