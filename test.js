'use strict'

const getChromePath = require('./src')({
  path: '/tmp'
})
;(async () => {
  const path = await getChromePath()
  console.log(path)
})()
