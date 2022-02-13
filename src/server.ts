import "module-alias/register";
import "source-map-support/register";
import dotenv from "dotenv";
import { findAndPaginatePlugin } from "@the-devoyage/mongo-filter-generator";
import mongoose from "mongoose";
mongoose.plugin(findAndPaginatePlugin);
import { schema } from "./graphql";
import { ApolloServer } from "apollo-server";
import { Helpers } from "@the-devoyage/micro-auth-helpers";
dotenv.config();

const apolloServer = new ApolloServer({
  schema: schema,
  context: ({ req }) => {
    console.log(req.headers.context);
    const context = Helpers.Subgraph.GenerateContext({ req });
    return context;
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
