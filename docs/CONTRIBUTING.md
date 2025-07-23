# Contributing to Bridges

A guide for contributing to the Bridges project including code, documentation, feature suggestion and raising issues.

## Feature Suggestions and Issues

If you have any features you would like to see or any issues you have experienced as a user of this project, please do not hesitate to create an issue on the [Github Repository](https://github.com/devsoc-unsw/bridges/issues). Please use the appropriate template.

## Code Setup

To setup the project and contribute to the codebase please follow the guides written at [server/README.md](../server/README.md) and [client/README.md](../client/README.md). Note that you will need both directories set up in order to effectively contribute to the project.

### Conventions

#### Branch Naming Guidelines

As a best practice to keep your development environment as organised as possible, create local branches to work within. These should also be created directly off of the upstream default branch. It is suggested to follow the conventional name branching format. E.g.

```sh
git checkout -b <type>/<ISSUE-KEY>-<DESCRIPTION>
```

or `<type>/<short-description>`.

#### Commit Naming Guidelines

A good commit message should describe what changed and why.

Your commit message should:

- contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
- be entirely in lowercase with the exception of proper nouns, acronyms and the words that refer to code, like function/variable names
- be prefixed with the type of change and the scope.

To view more documentation and examples on good commit naming see [Conventional Commit Messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13).

## Docker Tips

If you are rebuilding images frequently, Docker may consume a significant amount of storage. Here are some methods to clean and manage memory used by Docker.

To remove all containers and the Docker network, use `docker compose down`. Add `-v` to also remove persistent volumes, like Postgres data. Run this before rebuilding to keep things tidy.

To stop a docker containers that is running, run `docker compose stop <containerName>` or use the interactive GUI. This will not remove the container.

Every once in a while, you will want to clean up docker. To do this, use `docker system prune - a`.
