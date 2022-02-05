import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { schema } from "./graphql";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server";
import { Context, TokenContext } from "types/context";
dotenv.config();

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema),
  context: ({ req }): Context => {
    const { token, isauth } = req.headers;
    let parsedToken: TokenContext = {};
    let parsedAuthStatus: boolean = false;
    if (token !== "undefined" && typeof token === "string") {
      parsedToken = JSON.parse(token);
    }
    if (isauth !== "undefined" && typeof isauth === "string") {
      parsedAuthStatus = JSON.parse(isauth);
    }

    return { token: parsedToken, isAuth: parsedAuthStatus };
  },
});

let DB = process.env.MONGO_URI!;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Accounts DB Connected to Accounts Service!"))
  .catch((err) => console.log(err));

const port = process.env.BACKEND_PORT || 5001;

apolloServer
  .listen({ port })
  .then(({ url }) => console.log(`Accounts service ready at ${url}!`));
