import { gql } from "apollo-server-express";

export const Account = gql`
  type Account @key(fields: "_id") {
    _id: ObjectID!
    email: EmailAddress! @shareable
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
`;
