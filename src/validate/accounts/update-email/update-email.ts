import Validator from "validator";
import isEmpty from "is-empty";
import { UpdateEmailInput } from "types/generated";

export const UpdateEmail = (data: UpdateEmailInput) => {
  const errors: Partial<Record<keyof UpdateEmailInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
