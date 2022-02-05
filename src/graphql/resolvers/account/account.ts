import { Account as IAccount, AccountResolvers } from "types/generated";
import { Account as Accounts } from "@src/models";

export const Account: AccountResolvers = {
  __resolveReference: async (AccountRef: IAccount) => {
    const account = await Accounts.findOne({ _id: AccountRef._id }).select(
      "-password -activation.code"
    );
    return account;
  },
};
