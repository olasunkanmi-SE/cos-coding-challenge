import { IError } from "./interfaces/error";
import { isEmpty } from "./is-empty";
import { validationError } from "./validation-error";

export const validateRequest = (
  request: any
): {
  errors: IError;
  isValid: boolean;
} => {
  const errors: any = {};
  request.password = !isEmpty(request.password) ? request.password : "";
  request.userMailId = !isEmpty(request.userMailId) ? request.userMailId : "";
  if (!request.password) {
    errors.password = validationError.passwordRequired;
  }

  if (!request.password.length) {
    errors.password = validationError.passwordEmpty;
  }

  if (!request.userMailId) {
    errors.userMailId = validationError.userIdRequired;
  }

  if (!request.userMailId.length) {
    errors.userMailId = validationError.userIdEmpty;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
