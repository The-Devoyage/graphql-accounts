import { gql } from "apollo-server-express";

export const AccountTypes = gql`
  type Account @key(fields: "_id") {
    _id: ObjectID!
    email: String!
    password: String
    createdAt: DateTime!
    updatedAt: DateTime!
    activation: Activation
  }

  type Activation {
    verified: Boolean!
    code: String
    limit: DateTime!
  }

  type LoginAccountResponse {
    token: String!
    account: Account!
  }

  type VerifyEmailResponse {
    message: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    password2: String!
  }

  input ResetPasswordInput {
    email: String!
    password: String!
    password2: String!
    code: String!
  }

  input ResetCodeInput {
    email: String!
  }

  input UpdateEmailInput {
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input VerifyEmailInput {
    email: String!
    code: String!
  }

  input GetAccountsActivationInput {
    verified: BooleanFieldFilter!
  }

  input GetAccountsInput {
    _id: StringFieldFilter
    email: StringFieldFilter
    activation: GetAccountsActivationInput
    config: FilterConfig
  }

  type GetAccountsResponse {
    data: [Account!]
    stats: Stats
  }

  extend type Query {
    getMyAccount: Account!
    getAccounts(getAccountsInput: GetAccountsInput!): GetAccountsResponse!
    isAuthenticated: Boolean!
  }

  extend type Mutation {
    login(loginInput: LoginInput!): LoginAccountResponse!
    register(registerInput: RegisterInput!): Account!
    resetPassword(resetInput: ResetPasswordInput!): Account!
    updateEmail(updateEmailInput: UpdateEmailInput!): Account!
    verifyEmail(verifyEmailInput: VerifyEmailInput!): Account!
    resetActivationCode(resetCodeInput: ResetCodeInput!): Account!
  }
`;
