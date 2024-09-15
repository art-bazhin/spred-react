# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.2](https://github.com/art-bazhin/spred-react/compare/v0.4.1...v0.4.2) (2024-09-15)


### Build System

* fix umd globals ([6a761ae](https://github.com/art-bazhin/spred-react/commit/6a761ae15389383772f8630e345610d4216eacac))

### [0.4.1](https://github.com/art-bazhin/spred-react/compare/v0.4.0...v0.4.1) (2024-09-15)


### Build System

* fix package lock ([d456eff](https://github.com/art-bazhin/spred-react/commit/d456effc939384083dd44ecdc800a7a40399e352))

## [0.4.0](https://github.com/art-bazhin/spred-react/compare/v0.3.1...v0.4.0) (2024-09-15)


### ⚠ BREAKING CHANGES

* New API with hooks useSubscribe, useSignal, useReactiveState

### Others

* bump version ([3e6c88d](https://github.com/art-bazhin/spred-react/commit/3e6c88df6dd26dbfe153f0b0458fd5f4c3518fc8))

### [0.3.1](https://github.com/art-bazhin/spred-react/compare/v0.3.0...v0.3.1) (2024-09-15)


### Features

* rewrite to new API ([5cf4dde](https://github.com/art-bazhin/spred-react/commit/5cf4dde4724b05577db9bb7f67d4deba8256839b))

## [0.3.0](https://github.com/art-bazhin/spred-react/compare/v0.2.0...v0.3.0) (2024-04-17)


### ⚠ BREAKING CHANGES

* useComputed renamed to useComputation

### Features

* add ability to use getSnapshot with objects containing non-signal properties ([984d929](https://github.com/art-bazhin/spred-react/commit/984d929832575ceddaa0ec4fe68dbfff70a4cbd1))
* add useSignalFactory hook ([185cf59](https://github.com/art-bazhin/spred-react/commit/185cf59c7c9c149a7689321e1472362308636549))

## [0.2.0](https://github.com/art-bazhin/spred-react/compare/v0.1.10...v0.2.0) (2024-01-29)


### ⚠ BREAKING CHANGES

* bump version

### Others

* bump version ([031b2e6](https://github.com/art-bazhin/spred-react/commit/031b2e680d0471e024187888bed0a938cb34ed72))

### [0.1.10](https://github.com/art-bazhin/spred-react/compare/v0.1.9...v0.1.10) (2024-01-29)


### Features

* add getSnapshot helper function ([2b2f1d2](https://github.com/art-bazhin/spred-react/commit/2b2f1d2a6746f16426b8891f1230483f1e069a65))
* add useComputed hook ([f200fee](https://github.com/art-bazhin/spred-react/commit/f200fee1ac3c42a35641b5f3193a5c82f78096ab))


### CI

* update ci script ([bf1f60c](https://github.com/art-bazhin/spred-react/commit/bf1f60c6ba6e6642111c9b515772f89f5457b375))


### Build System

* update dependencies and build scripts ([a0a32de](https://github.com/art-bazhin/spred-react/commit/a0a32de266891a8487e3b0a9d6733978223c39ef))


### Code Refactoring

* refactor useSignal using new spred and react versions ([285d7be](https://github.com/art-bazhin/spred-react/commit/285d7bea9216a57e71f63cc8b71822fccc6907d7))


### Docs

* add docs ([2ee0fbb](https://github.com/art-bazhin/spred-react/commit/2ee0fbb99e4ee9925b9ca7e49f45dce84b8a6ac5))

### [0.1.9](https://github.com/art-bazhin/spred-react/compare/v0.1.8...v0.1.9) (2024-01-29)


### Docs

* add package replacement note ([ed89b8d](https://github.com/art-bazhin/spred-react/commit/ed89b8d2cf55725ab5e4b9d9b39cd112c0c585cb))

### [0.1.8](https://github.com/art-bazhin/spred-react/compare/v0.1.7...v0.1.8) (2022-08-27)


### Features

* make a signal active before cb subscribing ([1702c66](https://github.com/art-bazhin/spred-react/commit/1702c663e0a225e71e6f08a2819d5d8f6286aec5))

### [0.1.7](https://github.com/art-bazhin/spred-react/compare/v0.1.6...v0.1.7) (2022-08-26)


### Bug Fixes

* fix memo deps bug ([f0614dc](https://github.com/art-bazhin/spred-react/commit/f0614dc0c3ce4c5e8473a234573cde77a37e05c9))

### [0.1.6](https://github.com/art-bazhin/spred-react/compare/v0.1.5...v0.1.6) (2022-08-26)


### Performance Improvements

* use just one memo ([1c3e4f2](https://github.com/art-bazhin/spred-react/commit/1c3e4f204439f519f73ac7caa3b22c7202febb41))

### [0.1.5](https://github.com/art-bazhin/spred-react/compare/v0.1.4...v0.1.5) (2022-08-25)


### Bug Fixes

* remove redundant cb call ([c216eba](https://github.com/art-bazhin/spred-react/commit/c216eba9ba9b6a2a99adefb854496e35373188a5))

### [0.1.4](https://github.com/art-bazhin/spred-react/compare/v0.1.3...v0.1.4) (2022-08-25)


### Build System

* fix build ([f6f9cda](https://github.com/art-bazhin/spred-react/commit/f6f9cda4fcc8c9a5b07f5c8cedc93ec173fc4f75))

### [0.1.3](https://github.com/art-bazhin/spred-react/compare/v0.1.2...v0.1.3) (2022-08-25)


### Features

* support react 18 ([531b456](https://github.com/art-bazhin/spred-react/commit/531b456d11a4eb923555f1f9d0098a06caed5797))

### [0.1.2](https://github.com/art-bazhin/spred-react/compare/v0.1.1...v0.1.2) (2022-08-25)


### Bug Fixes

* fix default deps bug ([3b765b5](https://github.com/art-bazhin/spred-react/commit/3b765b54d42c3360228556146f898f01d96ed147))

### [0.1.1](https://github.com/art-bazhin/spred-react/compare/v0.1.0...v0.1.1) (2022-08-25)


### Performance Improvements

* improve memory usage ([d91f6f5](https://github.com/art-bazhin/spred-react/commit/d91f6f58e1fd5b058c4f0f562eb2947c0d07152b))

## [0.1.0](https://github.com/art-bazhin/spred-react/compare/v0.0.3...v0.1.0) (2021-12-23)


### ⚠ BREAKING CHANGES

* useAtom => useSignal

### Code Refactoring

* update spred version ([e6c2d16](https://github.com/art-bazhin/spred-react/commit/e6c2d16b699fa7c09e2d144f043de4a353ef6231))

### [0.0.3](https://github.com/art-bazhin/spred-react/compare/v0.0.2...v0.0.3) (2021-12-13)


### Features

* add ability to use function atoms ([0f415cb](https://github.com/art-bazhin/spred-react/commit/0f415cb2b5adbd0644958eb58eae1984a063100b))

### [0.0.2](https://github.com/art-bazhin/spred-react/compare/v0.0.1...v0.0.2) (2021-12-07)


### Bug Fixes

* fix redundant updates ([72ef156](https://github.com/art-bazhin/spred-react/commit/72ef156ec038586a75997b6e14e7595ac5f9eecd))
