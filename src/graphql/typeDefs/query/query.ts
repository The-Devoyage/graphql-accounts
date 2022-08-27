import { gql } from "apollo-server-express";

export const Query = gql`
  input GetAccountsInput {
    query: AccountFieldFiltersInput!
    config: FilterConfig
  }

  input AccountFieldFiltersInput {
    _id: [StringFieldFilter]
    email: [StringFieldFilter]
    activation: GetAccountsActivationInput
    createdAt: [DateFieldFilter]
    updatedAt: [DateFieldFilter]
  }

  input GetAccountsActivationInput {
    verified: [BooleanFieldFilter!]!
  }

  type GetAccountsResponse {
    data: [Account!]!
    stats: Stats!
  }

  extend type Query {
    getMyAccount: Account!
    getAccounts(getAccountsInput: GetAccountsInput!): GetAccountsResponse!
    isAuthenticated: Boolean!
  }
`;
