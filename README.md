# @browserless/aws-lambda-chrome

![Last version](https://img.shields.io/github/tag/Kikobeats/aws-lambda-chrome.svg?style=flat-square)
[![Dependency status](https://img.shields.io/david/Kikobeats/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/@browserless/aws-lambda-chrome)
[![Dev Dependencies Status](https://img.shields.io/david/dev/Kikobeats/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/@browserless/aws-lambda-chrome#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/@browserless/aws-lambda-chrome.svg?style=flat-square)](https://www.npmjs.org/package/aws-lambda-chrome)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/microlinkhq)

> Chrome (v67.0.3372.0) binary compatible with AWS Lambda.

## Install

```bash
$ npm install @browserless/aws-lambda-chrome --save
```

This package content a binary compressed version of Chrome compatible with AWS Lambda.

## Usage

> **Note**: Ensure to use `--disable-dev-shm-usage` flag.

It has been designed to be used with [puppeteer](https://github.com/GoogleChrome/puppeteer), specially using [browserless](https://github.com/Kikobeats/browserless).

For example, let create a `get-browserless.js` file with the follow content:

```js
const browserless = require('browserless')

const getChromePath = require('@browserless/aws-lambda-chrome')({
  path: '/tmp'
})

const isLambda = !!process.env.LAMBDA_TASK_ROOT
const getExecutablePath = async () => (isLambda ? getChromePath() : undefined)

module.exports = async () =>
  browserless({
    ignoreHTTPSErrors: true,
    args: [
      '--disable-gpu',
      '--single-process',
      '--no-zygote',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--hide-scrollbars'
    ],
    executablePath: await getExecutablePath()
  })
```

Then in your code just call the snippet, like:

```js
;(async () => {
  const getBrowserless = require('./get-browserless')
  const { screenshot } = await getBrowserless() // serverless!
})()
```

The first time it will be used it will decompress the file. After that, the decompress version will be reused at next successive calls.

## API

### constructor([options])

#### options

##### path

Type: `string`<br>
Default: `'dist'`

Where extract the binary.

## FAQ

**Q: How to use a newer version of Node on AWS Lambda?**

AWS Lambda runs a old version of Node.js that doesn't support async/await, spread operator, etc.

You need to ship your fresh Node.js version with your lambda function.

This is an shell bash script to get the last node version available:


```bash
#!/bin/bash

NODE_BIN=`curl -sL https://semver.io/node/resolve/8`-linux-x64

echo "Downloading $NODE_BIN binary file"

curl -sL https://nodejs.org/dist/latest-v8.x/node-v$NODE_BIN.tar.gz | tar -xz
mkdir -p bin
mv node-v$NODE_BIN/bin/node bin/node
rm -rf node-v$NODE_BIN

echo "Added \`bin/node\` as node-v$NODE_BIN"
```

You can run the script as postinstall and then user the binary created for run your microservice:

```
{
  "scripts": {
  "postinstall": "./scripts/download_node.sh",
  "start": "NODE_ENV=production ./bin/node ./node_modules/micro/bin/micro.js --host localhost --port $PORT index.js"
  }
}
```

**Q: How Can I create my own Headless Chrome binary?**

The idea behind the project is to ship a production-ready last chrome version available.

For do that, is necessary compile Chromium into a AWS Lambda compatible machine, normally a EC2.

These instructions are related with generate the binary for the last (or older) version.

You need to create a EC2 instance:

- **AMI**: `amzn-ami-hvm-2017.09.0.20170930-x86_64-gp2` (Latest community Amazon Linux).
- **Instance type**: c4.4xlarge.
- **Storage**: 30GB.

Then execute the script for build the binary:


```sh
curl https://rawgit.com/Kikobeats/aws-lambda-chrome/master/build.sh | bash
```

After the process finished, copy the result (and create a PR with the new binary!)


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
