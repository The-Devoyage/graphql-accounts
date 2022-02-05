import Validator from "validator";
import isEmpty from "is-empty";
import { VerifyEmailInput } from "types/generated";

export const VerifyEmail = (data: VerifyEmailInput) => {
  const errors: Partial<Record<keyof VerifyEmailInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
