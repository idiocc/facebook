/* yarn example/ */
import facebook from '../src'

(async () => {
  const res = await facebook({
    text: 'example',
  })
  console.log(res)
})()