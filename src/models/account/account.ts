import mongoose, { CallbackError } from "mongoose";
import { Account } from "types/generated";
import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";
import { ApolloError } from "apollo-server";

const Schema = mongoose.Schema;

const AccountSchema = new Schema<Account, FindAndPaginateModel>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    activation: {
      verified: { type: Boolean, required: true, default: false },
      code: { type: String, required: true },
      limit: { type: Date, required: true },
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

type NextFunction = (err?: CallbackError) => void;
interface Error {
  code: number;
  name: string;
}

AccountSchema.post(
  "save",
  function (error: Partial<Error>, _: Account, next: NextFunction) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      next(
        new ApolloError(
          "A account with this email already exists.",
          "DUPLICATE_ACCOUNT"
        )
      );
    } else {
      next();
    }
  }
);

AccountSchema.post(
  "findOneAndUpdate",
  function (error: Partial<Error>, _: Account, next: NextFunction) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      next(
        new ApolloError(
          "A account with this email already exists.",
          "DUPLICATE_ACCOUNT"
        )
      );
    } else {
      next();
    }
  }
);

const Account = mongoose.model<Account, FindAndPaginateModel>(
  "Account",
  AccountSchema
);

export { Account };
