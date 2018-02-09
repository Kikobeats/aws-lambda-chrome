'use strict'

const existsFile = require('exists-file')
const decompress = require('decompress')
const path = require('path')

const CHROME_ORIGIN_PATH = path.resolve('dist/headless_shell.zip')

module.exports = ({
  path: tempPath = path.join(__dirname, '../dist')
} = {}) => {
  if (!path) throw new TypeError('Need to provide a `path` for extracting.')
  const binaryPath = path.join(tempPath, 'headless_shell', 'headless_shell')
  const extractPath = path.join(tempPath, 'headless_shell')
  const distPath = path.join(tempPath)

  return async () => {
    const isExtracted = await existsFile(extractPath)
    if (isExtracted) return binaryPath
    await decompress(CHROME_ORIGIN_PATH, distPath)
    return binaryPath
  }
}
