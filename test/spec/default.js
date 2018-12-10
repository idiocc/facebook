import { equal } from 'zoroaster/assert'
import core from '@idio/core'
import { aqt } from 'rqt'
import Context from '../context'
import facebook from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof facebook, 'function')
  },
  async 'redirects to facebook'() {
    const { app, router, url } = await core({
      session: { use: true, keys: ['test'] },
    })
    facebook(router, {
      client_id: 'client-id',
      client_secret: 'client-secret',
    })
    app.use(router.routes())
    const { headers } = await aqt(`${url}/auth/facebook`)
    app.destroy()
    const { location } = headers
    const l = location.replace(/&state=\d+/, '')
    equal(l, 'https://www.facebook.com/dialog/oauth?client_id=client-id&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&scope=')
  },
  async 'redirects to facebook with scope'() {
    const { app, router, url } = await core({
      session: { use: true, keys: ['test'] },
    })
    facebook(router, {
      client_id: 'client-id',
      client_secret: 'client-secret',
      scope: 'manage_pages',
    })
    app.use(router.routes())
    const { headers } = await aqt(`${url}/auth/facebook`)
    app.destroy()
    const { location } = headers
    const l = location.replace(/&state=\d+/, '')
    equal(l, 'https://www.facebook.com/dialog/oauth?client_id=client-id&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fredirect&scope=manage_pages')
  },
}

export default T