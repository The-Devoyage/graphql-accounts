import { Resolvers } from "types/generated";
import {
  DateTimeScalar,
  GraphQLObjectID,
} from "@the-devoyage/mongo-filter-generator";
import { Account, Mutation, Query } from "./";

export const resolvers: Resolvers = {
  Account,
  DateTime: DateTimeScalar,
  Query,
  Mutation,
  ObjectId: GraphQLObjectID,
};
