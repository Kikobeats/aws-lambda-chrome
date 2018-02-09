'use strict'

const existsFile = require('exists-file')
const decompress = require('decompress')
const path = require('path')

const CHROME_ORIGIN_PATH = path.join(__dirname, '../dist/headless_shell.zip')

module.exports = ({
  path: tempPath = path.join(__dirname, '../dist')
} = {}) => {
  if (!path) throw new TypeError('Need to provide a `path` for extracting.')
  const extractPath = path.join(tempPath, 'headless_shell')

  return async () => {
    if (await existsFile(extractPath)) return extractPath
    await decompress(CHROME_ORIGIN_PATH, tempPath)
    return extractPath
  }
}
