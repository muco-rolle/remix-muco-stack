# Remix Muco Stack

## 💿 Features

This Stack has been created with two main purposes: **simplicity and solidity.** Aiming for those who loves to build their stuff from the ground, with a solid and well tested template, to start coding right away.

- [Fly app Deployment](https://fly.io) with [Docker.](https://www.docker.com/products/docker-desktop/)
- Database ORM with [Prisma.](https://www.prisma.io/)
- Production-Ready with [PostgreSQL Database](https://www.postgresql.org/)
- [GitHub Actions](https://github.com/features/actions) for Deploy on merge to Production and Staging environments.
- Healthcheck Endpoint for [Fly backups Region Fallbacks.](https://fly.io/docs/reference/configuration/#services-http_checks)
- Styling with [Chakra UI](https://chakra-ui.com/)
- Unit Testing with [Vitest](https://vitest.dev) and [Testing Library.](https://testing-library.com)
- Linting with [ESLint.](https://eslint.org/)
- Code formatting with [Prettier.](https://prettier.io/)
- Static Types with [TypeScript.](https://www.typescriptlang.org/)

Learn more about [Remix Stacks](https://remix.run/stacks).

## 🔋 Quickstart

```sh
# Initialize the following template into your workspace:
npx create-remix --template muco-rolle/remix-muco-stack

# Setup database:
Manually set your Postgres database keys into the .env file.
```

```sh
# Seed your database:
npm run setup

# Build your server:
npm run build

# Start dev server:
npm run dev
```

Done! This starts your app in development mode, rebuilding assets on file changes.

## 🚀 Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly:

```sh
fly auth signup
```

- Create two apps on Fly, one for staging and one for production:

```sh
fly apps create remix-muco-stack
fly apps create remix-muco-stack-staging
```

> Make sure this name matches the `app` set in your `fly.toml` file. Otherwise, you will not be able to deploy.

- Initialize Git:

```sh
git init --initial-branch=main
```

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

```sh
git remote add origin <ORIGIN_URL>
```

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

```sh
fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app remix-muco-stack
fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app remix-muco-stack-staging
```

> **Note:** If you don't have openssl installed, you can also use [1password](https://1password.com/password-generator/) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

- Create a database for both your staging and production environments. Run the following:

```sh
fly postgres create --name remix-muco-stack-db
fly postgres attach remix-muco-stack-db

fly postgres create --name remix-muco-stack-staging-db
fly postgres attach remix-muco-stack-staging-db
```

> Fly will take care of setting the `DATABASE_URL` secret for you.

- Now that everything is set up you can **commit and push** your changes to your repo.

> Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

## ⚙️ GitHub Actions

We use GitHub Actions for continuous integration and deployment.<br/><br/>
Anything that gets into the `main` branch will be deployed to production after running tests / build / etc.<br/>
Anything in the `dev` branch will be deployed to staging.

## 🧩 Testing

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

Also feel free to update prettier settings from `.package-json` with your preferred configuration.
