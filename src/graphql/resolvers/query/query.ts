import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { checkAuth, limitRole } from "@src/helpers";
import { Account } from "@src/models";
import { QueryResolvers, Account as IAccount } from "types/generated";

export const Query: QueryResolvers = {
  isAuthenticated: async (_parent, _args, context) => {
    return context.isAuth;
  },
  getMyAccount: async (_parent, _args, context) => {
    try {
      checkAuth({ context });
      const account = await Account.findOne({
        _id: context.token.account?._id,
      }).select("-password -activation.code");
      if (!account) {
        throw new Error("Can't find account");
      }
      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getAccounts: async (_parent, args, context) => {
    try {
      checkAuth({ context, requireUser: true });

      limitRole(context.token.user?.role, 1);

      const { filters, options } = GenerateMongo({
        fieldFilters: args.getAccountsInput,
        config: args.getAccountsInput.config!,
      });

      const accounts = await Account.findAndPaginate<IAccount>(
        filters,
        options
      );

      return accounts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
