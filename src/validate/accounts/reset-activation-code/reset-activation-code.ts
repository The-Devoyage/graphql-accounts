import Validator from "validator";
import isEmpty from "is-empty";
import { ResetCodeInput } from "types/generated";

export const ResetActivationCode = (data: ResetCodeInput) => {
  const errors: Partial<Record<keyof ResetCodeInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
