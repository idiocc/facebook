import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import facebook from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await facebook({
      text: input,
    })
    return res
  },
  context: Context,
})

export default ts