# Muzikie Web Player

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0)

The web player of Muzikie decentralized streaming platform

## Development

#### prerequisite
- [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) (Used to set up the required node version)
- [Node v16.15.0](https://nodejs.org)
- [Muzikie Blockchain](https://github.com/Muzikie/blockchain)
- [Streamer](https://github.com/Muzikie/streamer)


#### Scripts

Run 

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.


## Tests

Unit tests are stored next to their corresponding modules. To run tests, you can use

```
npm test
```

You may pass a file path to run a single file.

### DIY

If you're familiar with deploying express applications you should be right at home just make sure to deploy the output of `remix build`

- `build/`
- `public/build/`


## Contributors

https://github.com/Muzikie/web-player/graphs/contributors

## License

Copyright 2022 Block Made GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[Muzikie site]: https://muzikie.com/
[Block Made GmbH site]: https://block-made.com/
