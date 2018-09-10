'use strict'

const path = require('path')

const decompressPath = path.resolve('tmp')

const getChromePath = require('./src')({
  path: decompressPath
})
;(async () => {
  const path = await getChromePath()
  console.log(path)
})()
