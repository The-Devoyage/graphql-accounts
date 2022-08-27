import { Resolvers } from "types/generated";
import { Account } from "./account";
import { Query } from "./query";
import { Mutation } from "./mutation";

export const resolvers: Resolvers = {
  Account: { Account },
  Query: { Query },
  Mutation: { Mutation },
};
