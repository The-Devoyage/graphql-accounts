import { gql } from "apollo-server-express";

export const Mutation = gql`
  type LoginAccountResponse {
    token: JWT!
    account: Account!
  }

  type VerifyEmailResponse {
    message: String!
  }

  input RegisterInput {
    email: EmailAddress!
    password: String
  }

  input ResetPasswordInput {
    email: EmailAddress!
    password: String!
    code: String!
  }

  input ResetCodeInput {
    email: EmailAddress!
  }

  input UpdateEmailInput {
    email: EmailAddress!
    account: ObjectID!
  }

  input LoginInput {
    email: EmailAddress!
    password: String!
  }

  input VerifyEmailInput {
    email: EmailAddress!
    code: String!
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
