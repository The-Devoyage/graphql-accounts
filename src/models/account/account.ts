import mongoose from "mongoose";
import { Account } from "types/generated";
import { FindAndPaginateModel } from "@the-devoyage/mongo-filter-generator";

const Schema = mongoose.Schema;

const AccountSchema = new Schema<Account, FindAndPaginateModel>(
  {
    email: {
      type: String,
      required: true,
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

const Account = mongoose.model<Account, FindAndPaginateModel>(
  "Account",
  AccountSchema
);

export { Account };
