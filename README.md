# Server Reach By Image
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![license](https://img.shields.io/github/license/marinko-peso/shamus.svg)](https://github.com/marinko-peso/shamus/blob/master/LICENSE)
![package version](https://img.shields.io/npm/v/server-reach-by-image.svg)

Check can you reach a specific server (address or ip) by using image hosted on that server.

## Why?

Cause sometimes you need to see can you reach some server from Javascript, and things can hurt. How? Well imagine asking for server with http only from https location? Or imagine needing to check for IP but certificate on that page is only valid for specific domain name. Getting some image will work even then, and give you that precious information is the location reachable or not.
For example: checking for internal IP to determine are you on a vpn connection.

## Install

```ssh
npm install server-reach-by-image
```

## Running

```js
import ServerReachByImage from 'server-reach-by-image';

const options = {};
const serverByImage = new ServerReachByImage(options);
serverByImage.reach().then(success).catch(fail);
```
Fail method will receive error message as first parameter.

Available options:
- url (address to hit, without following / preferred)
- imgUrl (image to hit on the url, starting with /)
- timeout (integer, time to wait for load before declaring a fail attempt, default ```3000```ms)

## License

MIT.
