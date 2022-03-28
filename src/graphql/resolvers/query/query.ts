import { GenerateMongo } from "@the-devoyage/mongo-filter-generator";
import { Account } from "@src/models";
import { QueryResolvers, Account as IAccount } from "types/generated";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Query: QueryResolvers = {
  isAuthenticated: async (_parent, _args, context) => {
    return context.auth.isAuth ?? false;
  },
  getMyAccount: async (_parent, _args, context) => {
    try {
      Helpers.Resolver.CheckAuth({ context });
      const account = await Account.findOne<IAccount>({
        _id: context.auth.payload.account?._id,
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
      Helpers.Resolver.CheckAuth({ context, requireUser: true });

      Helpers.Resolver.LimitRole({
        userRole: context.auth.payload.user?.role,
        roleLimit: 1,
      });

      const { filter, options } = GenerateMongo({
        fieldFilters: args.getAccountsInput,
        config: args.getAccountsInput.config,
      });

      const accounts = await Account.findAndPaginate<IAccount>(filter, options);

      return accounts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
