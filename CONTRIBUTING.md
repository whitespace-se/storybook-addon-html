# Contributing

## Repository Structure

This repository makes use of [Yarn Workspaces][yarn-workspaces] to install the dependencies for both the library itself _and_ the example applications found in the `examples` directory.

You can find the source code for the library within the `addon` directory.

Example applications -- which are useful for verifying changes -- can be found within `examples`.

## Getting Started

Once you have the repository cloned, you'll want to install the dependencies using

```
yarn install
```

This will take care of setting up everything you need to get started!

## Building the library

The library source is found within `addon`; referenced sub-directories or commands in this section are relative to that directory.

The source-code for the library can be found within the `src` sub-directory. Babel is used to compile the output to the adjacent `out` directory, which is _not_ part of version control. This can be done by running

```
yarn build
```

Additionally, files exist within the root of the library that re-export code from the `out` directory. This allows for nice clean imports for users of the library without them needing to know about the `out` directory.

## Running Example Apps

You can run `yarn start` from within any of the example applications to start Storybook with the library added to it. This can be helpful for checking that changes to the library look correct!

## Publishing Releases

TBD!

[yarn-workspaces]: https://classic.yarnpkg.com/en/docs/workspaces/
