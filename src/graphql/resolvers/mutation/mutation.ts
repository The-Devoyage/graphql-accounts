import { Account } from "@src/models";
import { Validate } from "@src/validate";
import { UserInputError } from "apollo-server";
import { MutationResolvers, Account as IAccount } from "types/generated";
import bcrypt from "bcryptjs";
import { mailer } from "@src/helpers";
import { Helpers } from "@the-devoyage/micro-auth-helpers";

export const Mutation: MutationResolvers = {
  login: async (_, args) => {
    const { errors, isValid } = Validate.Accounts.Login(args.loginInput);

    try {
      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      const account = await Account.findOne<IAccount>({
        email: args.loginInput.email,
      });

      if (!account) {
        throw new Error("Something went wrong when logging in.");
      }

      if (!account?.activation?.verified) {
        throw new Error("Verify your email before logging in.");
      }

      if (!account.password) {
        throw new Error("Reset your password to continue.");
      }

      const authenticated = await bcrypt.compare(
        args.loginInput.password,
        account.password
      );

      if (authenticated) {
        if (process.env.JWT_ENCRYPTION_KEY) {
          const token = Helpers.Resolver.GenerateToken({
            secretOrPublicKey: process.env.JWT_ENCRYPTION_KEY,
            payload: {
              account: { _id: account._id, email: account.email },
              user: null,
            },
            options: { expiresIn: "10h" },
          });

          if (token) {
            const accountResponse = await Account.findOne<IAccount>({
              _id: account._id,
            }).select("-password -activation.code");
            if (!accountResponse) {
              throw new Error("Something went wrong when logging in.");
            }
            return { token: token, account: accountResponse };
          } else {
            throw new Error("Something went wrong when logging in.");
          }
        } else {
          throw new Error("Something went wrong when logging in.");
        }
      } else {
        throw new Error("Something went wrong when logging in.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  register: async (_parent, args) => {
    const { errors, isValid } = Validate.Accounts.Register(args.registerInput);
    try {
      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      const exists = await Account.exists({
        email: args.registerInput?.email,
      });

      if (exists) {
        throw new Error("Account already exists");
      }

      const activation = Helpers.Resolver.CreateActivationCode({
        codeLength: 6,
        codeLimit: { unit: "h", value: 4 },
      });

      const hashed = await bcrypt.hash(args.registerInput.password, 12);

      const newAccount = new Account({
        ...args.registerInput,
        activation: activation,
        password: hashed,
      });

      await newAccount.save();

      const account = await Account.findById<IAccount>(newAccount._id).select(
        "-password -activation.code"
      );

      if (!account) {
        throw new Error("Can't find account.");
      }

      if (mailer) {
        mailer.send({
          triggeredContent: {
            trigger: "REGISTER",
            to: account.email,
            variables: account,
          },
          defaultContent: {
            to: account.email,
            html: `<h3>Welcome!</h3><p>Your code is ${activation.code}</p>`,
            plainText: `Welcome! Your activation code is ${activation.code}`,
            subject: "Thanks for signing up!",
          },
        });
      }

      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  verifyEmail: async (_parent, args) => {
    const { errors, isValid } = Validate.Accounts.VerifyEmail(
      args.verifyEmailInput
    );
    if (!isValid) {
      throw new UserInputError("Invalid data.", { errors });
    }
    try {
      if (!args.verifyEmailInput.email || !args.verifyEmailInput.code) {
        throw new Error("Incomplete data");
      }

      const account = await Account.findOne<IAccount>({
        email: args.verifyEmailInput.email,
      });

      if (!account) {
        throw new Error("Account does not exist");
      }

      if (
        account.activation?.limit &&
        args.verifyEmailInput.code === account.activation.code &&
        account.activation.limit > Date.now()
      ) {
        const updatedAccount = await Account.findByIdAndUpdate<IAccount>(
          { _id: account._id },
          { $set: { "activation.verified": true } },
          { new: true }
        ).select("-password -activation.code");

        if (!updatedAccount) {
          throw new Error("Could not update account.");
        }

        if (mailer) {
          mailer.send({
            triggeredContent: {
              to: account.email,
              trigger: "VERIFY_EMAIL",
              variables: account,
            },
            defaultContent: {
              to: account.email,
              subject: "Email Verified",
              plainText: "Your email has been verified!",
              html: "<h3>Success!</h3><p>Your email has been verified!</p>",
            },
          });
        }

        return updatedAccount;
      } else {
        throw new Error(
          "Could not verifiy, please reset your activation code."
        );
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  resetPassword: async (_parent, args) => {
    const { errors, isValid } = Validate.Accounts.ResetPassword(
      args.resetInput
    );
    if (!isValid) {
      throw new UserInputError("Invalid data.", { errors });
    }
    try {
      const account = await Account.findOne<IAccount>({
        email: args.resetInput.email,
      });

      if (!account) {
        throw new Error("Something went wrong when resetting password.");
      }

      if (
        account?.activation?.limit &&
        account.activation.code === args.resetInput.code &&
        account.activation.limit > Date.now()
      ) {
        const hashed = await bcrypt.hash(args.resetInput.password, 12);

        const updatedAccount = await Account.findByIdAndUpdate<IAccount>(
          { _id: account._id },
          { $set: { password: hashed } },
          { new: true }
        ).select("-password -activation.code");

        if (!updatedAccount) {
          throw new Error("Something went wrong when saving the changes.");
        }

        if (mailer) {
          mailer.send({
            triggeredContent: {
              to: updatedAccount.email,
              trigger: "PASSWORD_RESET",
              variables: account,
            },
            defaultContent: {
              to: updatedAccount.email,
              html: "<h3>Success!</h3><p>Your password has been reset.</p>",
              plainText: "Success! Your password has been reset!",
              subject: "Password Reset",
            },
          });
        }

        return updatedAccount;
      } else if (
        account?.activation?.limit &&
        account?.activation.limit < Date.now()
      ) {
        throw new Error(
          "The activation code expired - please request a new code and try again."
        );
      } else if (
        account?.activation?.limit &&
        account.activation.limit > Date.now() &&
        account.activation.code !== args.resetInput.code
      ) {
        throw new Error("Incorrect activation code.");
      } else {
        throw new Error("Something went wrong when resetting your password.");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  resetActivationCode: async (_parent, args) => {
    const { errors, isValid } = Validate.Accounts.ResetActivationCode(
      args.resetCodeInput
    );
    if (!isValid) {
      throw new UserInputError("Invalid data.", { errors });
    }
    try {
      if (!args.resetCodeInput.email) {
        throw new Error("Please provide a valid email.");
      }
      const account = await Account.findOne<IAccount>({
        email: args.resetCodeInput.email,
      });

      if (!account) {
        throw new Error(
          "Something went wrong when resetting the activation code."
        );
      }

      const activation = Helpers.Resolver.CreateActivationCode({
        codeLimit: { unit: "h", value: 4 },
        codeLength: 6,
      });

      const updatedAccount = await Account.findOneAndUpdate<IAccount>(
        { _id: account._id },
        { $set: { activation } },
        { new: true }
      ).select("-password -activation.code");

      if (!updatedAccount) {
        throw new Error("Soemthing went wrong when saving new updates.");
      }

      if (mailer) {
        mailer.send({
          triggeredContent: {
            trigger: "RESET_ACTIVATION",
            to: account.email,
            variables: { ...account, activation },
          },
          defaultContent: {
            to: account.email,
            html: `<h3>Success!</h3><p>Your new code is ${activation.code}</p>`,
            plainText: `Welcome! Your activation code is ${activation.code}`,
            subject: "New Activation Code!",
          },
        });
      }

      return updatedAccount;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateEmail: async (_parent, args, context) => {
    const { isValid, errors } = Validate.Accounts.UpdateEmail(
      args.updateEmailInput
    );

    try {
      Helpers.Resolver.CheckAuth({ context });
      if (!isValid) {
        throw new UserInputError("Invalid data.", { errors });
      }

      const account = await Account.findByIdAndUpdate<IAccount>(
        { _id: context.auth.payload?.account?._id },
        { email: args.updateEmailInput.email, activation: { verified: false } },
        { new: true }
      ).select("-password -activation.code");

      if (!account) {
        throw new Error("Something went wrong when updating your account.");
      }

      if (mailer) {
        mailer.send({
          triggeredContent: {
            trigger: "UPDATE_EMAIL",
            to: account.email,
            variables: account,
          },
          defaultContent: {
            subject: "Email Updated",
            to: account.email,
            plainText:
              "Your email has been updated. Please re-verify your account.",
            html: "<h3>Success!</h3><p>Your email has been updated. Please re-verify your account.</p>",
          },
        });
      }

      return account;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
