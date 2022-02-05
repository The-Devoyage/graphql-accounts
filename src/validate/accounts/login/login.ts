import Validator from "validator";
import isEmpty from "is-empty";
import { LoginInput } from "types/generated";

export const Login = (data: LoginInput) => {
  const errors: Partial<Record<keyof LoginInput, string>> = {};

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  };
};
