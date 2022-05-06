import { ERROR_CATEGORY } from "./error-category";

/**
 * Accepts error params and returns type of error based on the input parameters
 * @export
 * @class BaseError
 */
export class BaseError {
  protected readonly _name: string;
  protected readonly _code: number;
  protected readonly _description: string;
  protected readonly _categories: ERROR_CATEGORY[];

  constructor(code: number, name: string, description: string, categories: ERROR_CATEGORY[]) {
    this._name = name;
    this._code = code;
    this._categories = categories;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get code(): number {
    return this._code;
  }

  get description(): string {
    return this._description;
  }

  get categories(): Array<ERROR_CATEGORY> {
    return this._categories;
  }

  static readonly UNKOWN_ERROR = new BaseError(
    1001,
    "Unknown error ",
    "We have encountered unknown error, please try again.",
    [ERROR_CATEGORY.TechnicalInProcess]
  );
}
