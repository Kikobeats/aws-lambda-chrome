# @browserless/aws-lambda-chrome

![Last version](https://img.shields.io/github/tag/@browserless/aws-lambda-chrome.svg?style=flat-square)
[![Dependency status](https://img.shields.io/david/@browserless/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/@browserless/aws-lambda-chrome)
[![Dev Dependencies Status](https://img.shields.io/david/dev/@browserless/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/@browserless/aws-lambda-chrome#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/@browserless/aws-lambda-chrome.svg?style=flat-square)](https://www.npmjs.org/package/aws-lambda-chrome)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/microlinkhq)

> Chrome binary compatible with AWS Lambda.

## Install

```bash
$ npm install @browserless/aws-lambda-chrome --save
```

This package content a binary compressed version of Chrome compatible with AWS Lambda.

It has been designed to be used with [puppeteer](https://github.com/GoogleChrome/puppeteer) without pain.

First of all, initialize the package providing a temporal folder for decompressing the file. 

On AWS Lambda, this path is `/tmp`:


```js
const getChromePath = require('@browserless/aws-lambda-chrome')({
  path: '/tmp'
})
```

Then use it when you call [puppeteer.launch](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions):

```js
const puppeteer = require('puppeteer')

const getChromePath = require('@browserless/aws-lambda-chrome')({
  path: '/tmp'
})

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: await getExecutablePath()
  })
})()
```

The first time it will be used it will decompress the file. After that, the decompress version will be reused at next successive calls.

This scenario is based on `production`. If you need a way to detect if you are or not on lambda, consider the following code:

```js
const isLambda = !!process.env.LAMBDA_TASK_ROOT
const getExecutablePath = async () => (isLambda ? getChromePath() : undefined)

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: await getExecutablePath()
  })
})()
```

## API

### constructor([options])

#### options

##### path

Type: `string`<br>
Default: `'dist'`

Where extract the binary.

## Build

The idea behind the project is to ship a production-ready last chrome version available.

For do that, is necessary compile Chromium into a AWS Lambda compatible machine, normally a EC2.

These instructions are related with generate the binary for the last (or older) version.

### Create EC2 instance

- **AMI**: `amzn-ami-hvm-2017.09.0.20170930-x86_64-gp2` (Latest community Amazon Linux).
- **Instance type**: c4.4xlarge.
- **Storage**: 30GB.

### Execute build script


```sh
curl https://rawgit.com/Kikobeats/aws-lambda-chrome/master/build.sh | bash
```

### Make a tarball and download


```bash
cd out
export VERSION=<put chrome version here>
tar -zcvf chrome-headless-aws-lambda-$VERSION-x64.tgz ./headless_shell

scp -i path/to/your/key-pair.pem ec2-user@<instance-hostname>:path/to/tarball ./
```

## Related

- [browserless](https://github.com/Kikobeats/browserless) – Chrome Headless API made easy.

## License

**aws-lambda-chrome** © [Kiko Beats](https://kikobeats.com), Released under the [MIT](https://github.com/microlinkhq/@aws-lambda-chrome/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/microlinkhq/@aws-lambda-chrome/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/kikobeats) · Twitter [@kikobeats](https://twitter.com/kikobeats)
