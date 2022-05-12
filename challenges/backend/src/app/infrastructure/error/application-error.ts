import { BaseError } from "./base-error";
import { ERROR_CATEGORY } from "./error-category";
export class ApplicationError extends BaseError {
  public static API_ERROR: number = 7051;

  public static readonly EXPRESS_SERVER_RUN_ERROR = new BaseError(
    7001,
    "Unabe to run express server",
    "We have ecnountered unkown error in running REST service using express server, please try again.",
    [ERROR_CATEGORY.Unknown]
  );

  public static error(ErrorCode: number, ShortDescription: string, LongDescription: string) {
    return new BaseError(ErrorCode, ShortDescription, LongDescription, [ERROR_CATEGORY.Unknown]);
  }
}
