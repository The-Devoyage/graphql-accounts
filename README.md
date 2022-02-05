# @The-Devoyage/graphql-accounts

An easy to spin up accounts microservice that can be used as a ready to go service or a starting point to customize your own accounts service.

## Features

### Account

Each account is referenced by a unique `_id` and unique `email`. The `activation` property stores a unique code used with 2fa verification, and an activation status. The code is also only valid 24 hours.

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

### Get Accounts

Logged in account holders can `getMyAccount` or check their `isAuthenticated` status. To fetch a list of accounts, you must have a User Property (Separate Service) with an Admin Level Role (1). When requesting accounts you will receive a paginated and filterable list of accounts.

### Register

Any source may create/register an account with email and password. Emails must be unique in the database.

### Account Login

Account Holders can use an email and password combination to receive an encoded JSON Web Token. The JWT can then be passed to a Gateway, such as our [@The-Devoyage/graphql-gateway](https://basetools.io/checkout/XGUVNNGr) repo, to handle authentication and authorization.

Passwords are hashed and salted before being saved to a mongo database. Provide the mongo URI in the Environment Variables to connect the database.

### Password Reset - Activation Codes - 2fa Verification

All new accounts are saved with a status of `activation.verified: false` for security.

To verify, users receive a code by email that can be used to verify their account. The code will not send unless a mailer service is connected. The default mailer service, pre-configured, uses our repo, [@The-Devoyage/graphql-mailer](https://basetools.io/checkout/8G2fCyXe).

Password resets function similarly. Account holder request a new code, which is sent to their email. They can then use the new code to reset their password and re-verify their account.

## Usage

### Purchase Access and Clone Repo

The `@The-Devoyage/accounts` repo is a private repository. To gain instant access to the code base, complete the [Basetools Checkout](https://basetools.io/checkout/v0cv56df) process. Once completed, you will be instantly added as a collaborator to the project allowing you to clone the repo.

### Install Dependencies

1. Required External Dependencies

- `@The-Devoyage/graphql-gateway` - An Apollo Gateway Server pre-configured to handle the authentication and authorization for this service. [Purchase Access](https://basetools.io/checkout/XGUVNNGr)
- `@The-Devoyage/mongo-filter-generator` - Adds the pagination and filtering abilities to the service. [Purchase Access](https://basetools.io/checkout/vyOL9ATx)
- `@The-Devoyage/graphql-mailer` - A mailer microservice to handle 2fa emailing. [Purchase Access](https://basetools.io/checkout/8G2fCyXe)
- `@The-Devoyage/mailer-connect` - A simple package to streamline connecting to the mailer service. [Purchase Access](https://basetools.io/checkout/wp7QYNNO)

2. Once you have access to the required repos above, be sure to login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

3. Install Dependencies

```
npm install
```

4. Configure Environment Variables

All environment variables are saved in the root of this repo in a file called `.env.example`. Move this file to `.env` and fill in the variables.

5. Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

### Query the server

Use the graphql sandbox/playground to view available calls and query the server. By default this is at port 5001, `http://localhost:5001`

## Docker Notes

When building, you will need to pass a Github Token as an ARG to the build process, so that it can pull the required packages from private repos.

Simply set an environment variable on your system and it will pass automatically. Be sure to expire the token after building, as some docker processes can leak the plain text value.

```
export GITHUB_TOKEN=my_generated_token
```
