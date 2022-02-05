import Validator from "validator";
import isEmpty from "is-empty";
import { ResetPasswordInput } from "types/generated";

export const ResetPassword = (data: ResetPasswordInput) => {
  const errors: Partial<Record<keyof ResetPasswordInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (data.password !== data.password2) {
    errors.password = "Passwords do not match.";
    errors.password2 = "Passwords do not match.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
