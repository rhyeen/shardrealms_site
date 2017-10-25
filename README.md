# Shardrealsm Web Landing

Basic server for serving the web landing page for Shardrealms

***

## Prereqs
- Docker needs to be running wherever you try to run this locally

## Setup
- Run `make build`
- Run `make run-enter`
- Run `npm install`
    - You can now run commands like `npm run dev`

## Linting
- Run `npm run lint` to get a linting report of all code in your `src` directory
- Run `npm run lint-fix` to fix all linting errors. Any errors that cannot be fixed will be reported to the console.
- Coding standards and styling for the project is based on [ESLint](http://eslint.org/docs/rules/) rules defined in `.eslintrc.json` file

## Testing
- Run `npm test` to compile and test.
- Check out `coverage/lcov-report/index.html` to view coverage report after running tests.
- If you want to have a non-zero return if coverage is not high enough, run `npm test-coverage`.  Default is 75% or higher.
- `npm test-integration` is specifically useful for testing actually hitting against the the database.  This should not be a standard for normal unit tests, but is useful for verifying Node Starter does indeed correctly connect to a database.

***

## Developing

### Makefile

> This project is set up with a [Makefile](Makefile). Please review it to become familiar with the commands that are available to you
> Run `make run-local` to start the local (dev) container
> Run `make run-prod` to start the prod container
> Go to `http://localhost:8080/shardrealms/healthcheck` to validate that things are set up and running

### Shrinkwrapping

> Run `npm shrinkwrap` to before each commit to lock node module versions.
> This ensures the versions of dependencies remain constant for all developers on the project and for the app in production.

### Logs

> Access logs are saved to `/var/log/access.log`
> Error logs are saved to `/var/log/error.log`

> Use the `server/lib/logger.js` for your logging needs. This is your bunyan singleton and will direct the correct log levels to the correct output spots

> TODO ^^ log rotate
