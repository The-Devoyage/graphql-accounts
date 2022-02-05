import { Activation } from "types/generated";

export const createActivationCode = (): Activation => {
  const start = 6 <= 1 ? 1 : Math.pow(10, 6 - 1);
  const activationCode = Math.floor(start + Math.random() * 9 * start);
  const activationLimit = new Date(Date.now() + 24 * 3600 * 1000);
  return {
    code: activationCode.toString(),
    limit: activationLimit,
    verified: false,
  };
};

export const checkAuth = (options: { context: any; requireUser?: boolean }) => {
  const { context, requireUser } = options;

  if (!context.isAuth) throw new Error("Not Authenticated");

  if (requireUser) {
    if (!("user" in context.token)) {
      throw new Error("Requires User Authentiction");
    }
  }
};

export const limitRole = (userRole: number = 100, limit: number) => {
  if (userRole !== 1) {
    if (userRole > limit) throw new Error("Permission denied.");
  }
};
