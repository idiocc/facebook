# @idio/facebook

[![npm version](https://badge.fury.io/js/%40idio%2Ffacebook.svg)](https://npmjs.org/package/@idio/facebook)

`@idio/facebook` is The Facebook OAth Login Routes For The Idio Web Server.

```sh
yarn add -E @idio/facebook
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`facebook(router: Router, config: Config)`](#facebookrouter-routerconfig-config-void)
  * [`Config`](#type-config)
  * [finish](#finish)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import facebook from '@idio/facebook'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `facebook(`<br/>&nbsp;&nbsp;`router: Router,`<br/>&nbsp;&nbsp;`config: Config,`<br/>`): void`

Sets up the `/auth/facebook` and `/auth/facebook/redirect` paths on the router to enable Facebook App Login. The `session` middleware needs to be installed to remember the `state`. The state is destroyed after the redirect.

__<a name="type-config">`Config`</a>__: Options for the program.

|        Name        |             Type              |                                                                         Description                                                                          |         Default         |
| ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| __client_id*__     | _string_                      | The app's client id.                                                                                                                                         | -                       |
| __client_secret*__ | _string_                      | The app's client secret.                                                                                                                                     | -                       |
| path               | _string_                      | The server path to start the login flaw and use for redirect (`${path}/redirect`).                                                                           | `/auth/facebook`        |
| scope              | _string_                      | The scope to ask permissions for.                                                                                                                            | -                       |
| finish             | _(ctx, token, data) =&gt; {}_ | The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. | `setSession; redirect;` |

```js
import facebook from '@idio/facebook'
import idioCore from '@idio/core'

const Server = async () => {
  const { url, router, app } = await idioCore({
    session: { use: true, keys: [process.env.SESSION_KEY || 'dev'] },
    logger: { use: true },
  }, { port: 5000 })
  router.get('/', (ctx) => {
    ctx.body = 'hello world'
  })
  facebook(router, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.SECRET,
    scope: 'manage_pages',

  })
  app.use(router.routes())
  return { app, url }
}
```
```
http://localhost:5000 
  <-- GET /auth/facebook
  --> GET /auth/facebook 302 18ms 379b
{ body: 'Redirecting to <a href="https://www.facebook.com/dialog/oauth?client_id=273790443337044&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&amp;state=3&amp;scope=manage_pages">https://www.facebook.com/dialog/oauth?client_id=273790443337044&amp;redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&amp;state=3&amp;scope=manage_pages</a>.',
  headers: 
   { location: 'https://www.facebook.com/dialog/oauth?client_id=273790443337044&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&state=3&scope=manage_pages',
     'content-type': 'text/html; charset=utf-8',
     'content-length': '379',
     'set-cookie': 
      [ 'koa:sess=eyJzdGF0ZSI6MywiX2V4cGlyZSI6MTU0NDUyNTA4MTk5MywiX21heEFnZSI6ODY0MDAwMDB9; path=/; httponly',
        'koa:sess.sig=OUHuNLlA16CFU5nXF-uiZxSJkmk; path=/; httponly' ],
     date: 'Mon, 10 Dec 2018 10:44:41 GMT',
     connection: 'close' },
  statusCode: 302,
  statusMessage: 'Found' }

 > Redirect to Dialog https://www.facebook.com/dialog/oauth?client_id=273790443337044&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&state=3&scope=manage_pages
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="15"></a></p>

### finish

The config allows to set the `finish` function that can be used to alter the logic of setting the token on the session or performing additional operations such as storing a new user in the database. The default sets the token on the `ctx.session` and also sets the user data such as name and id in the `ctx.session.user` property.

```js
    finish = /* async */ (ctx, token, user, /* next */) => {
      ctx.session.token = token
      ctx.session.user = user
      ctx.redirect('/')
      // await storeInDb(token, user)
      // await next()
    },
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2018

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>