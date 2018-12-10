const { facebookDialogUrl, exchange, graphGet } = require('@demimonde/graph');

const getRedirect = ({ protocol, host }, path) => {
  const parts = [
    protocol,
    '://',
    host,
    path,
    '/redirect',
  ]
  const p = parts.join('')
  return p
}

/**
 * The Facebook OAth Login Routes For The Idio Web Server. Requires the session middleware to be installed. The default path is `/auth/facebook` but can be changed.
 * @param {string} [router] The router instance.
 * @param {Config} [config] Options for the program.
 * @param {string} config.client_id The app's client id.
 * @param {string} config.client_secret The app's client secret.
 * @param {string} [config.path="/auth/facebook"] The server path to start the login flaw and use for redirect (`${path}/redirect`). Default `/auth/facebook`.
 * @param {string} [config.scope] The scope to ask permissions for.
 * @param {(ctx, token, data) => {}} [config.finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 */
               async function facebook(router, config = {}) {
  const {
    client_id,
    client_secret,
    path = '/auth/facebook',
    scope,
    finish = /* async */ (ctx, token, user, /* next */) => {
      ctx.session.token = token
      ctx.session.user = user
      ctx.redirect('/')
      // await next()
    },
  } = config
  if (!client_id) {
    console.warn('No client id - the dialog won\'t work.')
  }
  if (!client_secret) {
    console.warn('No client secret - the redirect won\'t work.')
  }

  router.get(path, async (ctx) => {
    const state = Math.floor(Math.random() * 10000)
    ctx.session.state = state
    const redirect_uri = getRedirect(ctx, path)
    const u = facebookDialogUrl({
      redirect_uri,
      client_id,
      scope,
      state,
    })
    ctx.redirect(u)
  })
  router.get(`${path}/redirect`, async (ctx, next) => {
    const redirect_uri = getRedirect(ctx, path)
    const state = ctx.query.state
    if (state != ctx.session.state) {
      throw new Error('The state is incorrect.')
    }
    ctx.session.state = null
    if (!ctx.query.code) throw new Error('Code Not Found.')

    const token = await exchange({
      client_id,
      client_secret,
      redirect_uri,
      code: ctx.query.code,
    })
    const data = await graphGet('/me', token, {}, true)
    await finish(ctx, token, data, next)
  })
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Options for the program.
 * @prop {string} client_id The app's client id.
 * @prop {string} client_secret The app's client secret.
 * @prop {string} [path="/auth/facebook"] The server path to start the login flaw and use for redirect (`${path}/redirect`). Default `/auth/facebook`.
 * @prop {string} [scope] The scope to ask permissions for.
 * @prop {(ctx, token, data) => {}} [finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 */


module.exports = facebook