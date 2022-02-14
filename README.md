# @the-devoyage/graphql-accounts

An easy to spin up accounts microservice that can be used as a ready to go service for managing authentication or a starting point to customize your own accounts service.

## Features

Use this service as a primary authentication method, allowing each user to create their own `Account`.

```graphql
type Account {
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
```

### Resolvers

- Register - Creates a new unverified account.

- Login - If valid credentials, returns a JSON Web Token along with Account Details. Requires verified account.

- Get My Account - Returns the account of the authenticated account-holder.

- Get Accounts - Requires User Role equal to 1, admin level. Returns a paginated and filterable list of all accounts in the database.

- Reset Password - Resets an account holders password - requires email to be re-verified if reset.

- Update Email - Updates a user's email. Requires email to be re-verified after the update is complete.

- Verify Email - If credentials are valid, the state of the Account Verified Status is updated to true, allowing user to login.

- Reset Activation Code - Updates a time sensitive activation code, and un-verifies the requested account.

### Security

**Running The Server**

You should never expose the accounts service directly to the public. Instead it should sit behind a gateway, which handles authorization parsing.

If you need a quick and easy gateway to add to your API, the `@The-Devoyage/graphql-gateway` is an Apollo Gateway Server pre-configured to handle the authorization for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr) to clone this gateway repository.

**Passwords in the Database**

Passwords are hashed and salted before being saved to a mongo database. Provide the mongo URI in the Environment Variables to connect the database.

All new accounts are saved with a status of `activation.verified: false` for security.

### Automated Emails Webhooks

Email webhooks are triggered when an request is completed, allowing you to connect your own external Mailer service.

Webhooks are posted with the `@the-devoyage/mailer-connect` package, to a URI that is set within the environment variables.

The following functions will trigger the mailer webhook:

- Register - Account holder receives email with verification code.
- Password Reset - Account holder receives email with verification code.
- Verify Email - Account holder receives notification of success.
- Reset Activation Code - Account holder receives email with verification code.

If you need a easy to start up Mailer Service, the [@The-Devoyage/graphql-mailer](https://basetools.io/checkout/8G2fCyXe) service is configured to work with this service and with the mailer-connect package out of the box.

## Usage

### Purchase Access and Clone Repo

The `@the-devoyage/accounts` repo is a private repository. To gain instant access to the code base, complete the [Basetools Checkout](https://basetools.io/checkout/v0cv56df) process. Once completed, you will be instantly added as a collaborator, allowing you to clone the repository.

### Install Dependencies

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

If you are using docker to build and run this server, you will need to pass the github token along to the build process.

Assign an environment variable to the Github Token locally as the Dockerfile is built to look for the token within env vars. Be sure to expire the token after use.

```bash
export GITHUB_TOKEN=mytoken
```

For docker, you can run:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

### Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

### Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

## Querying the Server

The server should sit behind a federated gateway. Query the gateway to query the server. Use the Apollo Sandbox for generated documentation on available resolvers and queries.

**Required Headers**

All routes within this service require a `context` header to be passed with the request. The `context` header should be stringified JSON of the type Context. Be sure to include the `auth` property.

```ts
interface Context extends Record<string, any> {
  auth: {
    account: { _id: string; email: string } | null;
    user: {
      _id: string;
      role: number;
      email: string;
    } | null;
    isAuth: boolean;
  };
  // ...context
}
```

## Recommended Services

- `@the-devoyage/graphql-users` - A Users Microservice to manage the members of accounts. While the `@the-devoyage/graphql-accounts` service does handle account authentication, it does not handle user authentication, meaning you will need to provide the user property to the request headers of this service. The recommended users service is compatible with this service. [Purchase Access](https://basetools.io/checkout/dQe81uv0)

- `@the-devoyage/graphql-gateway` - An apollo gateway server with pre-configured features such as user authorization, file routing/file upload routing, and supergraph configuration. This repo is compatible with this service and can act as the gateway for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)

- `@the-devoyage/graphql-mailer` - An automated mailer micro-service (GMAIL/GOOGLE) that allows templated and dynamic content to be sent to the users of your system. This repo is compatible with this service and the `mailer-connect` package that this service uses. [Purchase Access](https://basetools.io/checkout/8G2fCyXe)
