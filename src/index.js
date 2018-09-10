'use strict'

const { decompressStream } = require('iltorb')
const existsFile = require('exists-file')
const { promisify } = require('util')
const pump = require('pump')
const path = require('path')
const fs = require('fs')

const pipe = promisify(pump)

const CHROME_ORIGIN_PATH = path.join(__dirname, '../dist/headless_shell.br')

module.exports = ({
  path: tempPath = path.join(__dirname, '../dist')
} = {}) => {
  if (!path) throw new TypeError('Need to provide a `path` for extracting.')
  const extractPath = path.join(tempPath, 'headless_shell')

  return async () => {
    if (await existsFile(extractPath)) return extractPath
    await pipe(
      fs.createReadStream(CHROME_ORIGIN_PATH),
      decompressStream(),
      fs.createWriteStream(extractPath)
    )
    return extractPath
  }
}
