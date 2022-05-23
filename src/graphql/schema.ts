import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { GraphQL } from "@the-devoyage/mongo-filter-generator";
import { gql } from "apollo-server";

export const federation2 = gql`
  extend schema
  @link(url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@key", "@shareable"])
`;

export const schema = buildSubgraphSchema([
  { typeDefs: federation2 },
  { typeDefs: typeDefs.Account, resolvers: resolvers.Account },
  { typeDefs: GraphQL.typeDefs, resolvers: GraphQL.resolvers },
  { typeDefs: typeDefs.Query, resolvers: resolvers.Query },
  { typeDefs: typeDefs.Mutation, resolvers: resolvers.Mutation },
]);
