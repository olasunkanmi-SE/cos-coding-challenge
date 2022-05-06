import { BaseError } from "./base-error";

export class Errors {
  private readonly _instance?: string;
  private readonly _errors: BaseError[];

  constructor(errors: BaseError[], instance?: string) {
    this._instance = instance;
    this._errors = errors;
  }

  get instance(): string | undefined {
    return this._instance;
  }

  get errors(): BaseError[] {
    return this._errors;
  }
}
