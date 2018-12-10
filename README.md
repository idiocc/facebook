# @idio/facebook

[![npm version](https://badge.fury.io/js/%40idio%2Ffacebook.svg)](https://npmjs.org/package/@idio/facebook)

`@idio/facebook` is The Facebook OAth Login Routes For The Idio Web Server.

```sh
yarn add -E @idio/facebook
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`facebook(arg1: string, arg2?: boolean)`](#facebookarg1-stringarg2-boolean-void)
  * [`Config`](#type-config)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import facebook from '@idio/facebook'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `facebook(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

__<a name="type-config">`Config`</a>__: Options for the program.

|        Name        |             Type              |                                                                         Description                                                                          |         Default         |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| __client_id*__     | _string_                      | The app's client id.                                                                                                                                         | -                       |
| __client_secret*__ | _string_                      | The app's client secret.                                                                                                                                     | -                       |
| path               | _string_                      | The server path to start the login flaw and use for redirect (`${path}/redirect`).                                                                           | `/auth/facebook`        |
| scope              | _string_                      | The scope to ask permissions for.                                                                                                                            | -                       |
| finish             | _(ctx, token, data) =&gt; {}_ | The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. | `setSession; redirect;` |

```js
/* yarn example/ */
import facebook from '@idio/facebook'

(async () => {
  const res = await facebook({
    text: 'example',
  })
  console.log(res)
})()
```
```

```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2018

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>