# Server Reach By Image
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![license](https://img.shields.io/github/license/marinko-peso/shamus.svg)](https://github.com/marinko-peso/shamus/blob/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)
[![package version](https://img.shields.io/npm/v/server-reach-by-image.svg)](https://npm.im/server-reach-by-image)
[![install size](https://packagephobia.now.sh/badge?p=server-reach-by-image)](https://packagephobia.now.sh/result?p=server-reach-by-image)
[![dependecies](https://david-dm.org/marinko-peso/server-reach-by-image.svg)](https://david-dm.org/marinko-peso/server-reach-by-image)

Check can you reach a specific server (address or ip) by using image hosted on that server.

## Why?

Cause sometimes you need to see can you reach some server from Javascript, and things can hurt. How? Well imagine asking for server with http only from https location? Or imagine needing to check for IP but certificate on that page is only valid for specific domain name. Getting some image will work even then, and give you that precious information is the location reachable or not.
For example: checking for internal IP to determine are you on a vpn connection.

## Install

```ssh
npm i server-reach-by-image
```

## Running

```js
import ServerReachByImage, { errors } from 'server-reach-by-image';

const options = {};
const serverByImage = new ServerReachByImage(options);
serverByImage.load()
    .then(data => {})
    .catch({ code: errors.E_LOAD_FAIL }, e => {})
    .catch({ code: errors.E_LOAD_TIMEOUT }, e => {})
    .catch(e => {});
```
Fail method will receive error message as first parameter.

Available options:
- url (address to hit, without following / preferred)
- imgUrl (image to hit on the url, starting with /)
- timeout (integer, time to wait for load before declaring a fail attempt, default ```3000```ms)

## License

MIT
