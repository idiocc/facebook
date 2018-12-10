/* yarn example/ */
import { aqt } from 'rqt'
/* start example */
import facebook from '../src'
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

/* end example */

(async () => {
  const { app, url } = await Server()
  console.log(url, '')
  const res = await aqt(`${url}/auth/facebook`)
  console.log(res)
  const { headers: { location } } = res
  console.log('\n > Redirect to Dialog %s', location)
  await app.destroy()
})()