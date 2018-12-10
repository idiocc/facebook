## API

The package is available by importing its default function:

```js
import facebook from '@idio/facebook'
```

%~%

```## facebook
[
  ["router", "Router"],
  ["config", "Config"]
]
```

Sets up the `/auth/facebook` and `/auth/facebook/redirect` paths on the router to enable Facebook App Login. The `session` middleware needs to be installed to remember the `state`. The state is destroyed after the redirect.

%TYPEDEF types/index.xml%

%EXAMPLE: example/example.js, ../src => @idio/facebook%
%FORK example example/example%

%~ size="15"%

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

%~%