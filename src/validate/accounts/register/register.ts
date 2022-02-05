import Validator from "validator";
import isEmpty from "is-empty";
import { RegisterInput } from "types/generated";

export const Register = (data: RegisterInput) => {
  const errors: Partial<Record<keyof RegisterInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (data.password !== data.password2) {
    errors.password2 = "Passwords do not match.";
    errors.password = "Passwords do not match.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
