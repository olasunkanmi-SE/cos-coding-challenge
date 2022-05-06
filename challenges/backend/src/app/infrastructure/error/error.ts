import { BaseError } from "./base-error";

export class Errors {
  private readonly _instance: string;
  private readonly _errors: BaseError[];

  constructor(instance: string, errors: BaseError[]) {
    this._instance = instance;
    this._errors = errors;
  }

  get instance(): string {
    return this._instance;
  }

  get errors(): BaseError[] {
    return this._errors;
  }
}
