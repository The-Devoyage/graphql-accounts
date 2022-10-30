# @the-devoyage/graphql-accounts

A Federated GraphQL Acccounts Server featuring account creation, management, and authorization.

## Docs

[The Devoyage - GraphQL Accounts](https://www.thedevoyage.com/accounts/intro)

## Quick Start

1. Login to the Github registry with NPM.

```
npm login --registry=https://npm.pkg.github.com
```

2. Install Dependencies

```
npm install
```

With Docker:

```bash
docker build -t --build-arg GTIHUB_TOKEN=${GITHUB_TOKEN} .
```

3. Configure Environment Variables

Use the example environment variables file to create your own environment.

4. Start the server:

In Development:

```
npm run dev
```

In Production:

```
npm start
```

