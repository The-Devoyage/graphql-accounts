# @the-devoyage/graphql-accounts

The Devoyage's GraphQL Accounts Service is a production ready Authentication Application that can be added to any API. Use the code as is, or as a starter for your next web application. Easilly enable features such as Account Registration, Login, Password Reset, and 2fa.

## License

This repository provides a GPL License by default. If you want to use this product in a private commericial setting, you may purchase the MIT Licensed Version [Here!](https://thedevoyage.gumroad.com/l/graphql-gateway)

## Features

### Create Accounts

Accounts are saved to the database with the following shape.

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
  // ...your context
}
```

## Usage

Once started, you may query the server through the parent gateway.

### 1. Register

To register a user, you must send a request containing two copies of the password and an email to the `register` resolver.

### 2. Verify Email

By default, access is not granted until the email that was used to register is verified. Use the `code` sent from the email webhook to verify the user with the `verifyEmail` resolver.

Activation codes have a default lifespan of 24 hours. Use the `resetActivationCode` resolver to request a new code. Codes are stored as plain text in the Database if you need to manually check. Codes are never returned from a request to the API for security reasons.

### 3. Login to the Account

Once verified, you may login using the `login` resolver to request a Signed JSON Web Token. The token is signed with a password set from your environment variables. You may then use the token to authenticate the user throughout the API as you wish. The recommended approach being to authenticate the token with a [GraphQL Gateway](https://thedevoyage.gumroad.com/l/graphql-gateway).
