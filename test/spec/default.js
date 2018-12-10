import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import facebook from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof facebook, 'function')
  },
  async 'calls package without error'() {
    await facebook()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await facebook({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T