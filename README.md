# aws-lambda-chrome

![Last version](https://img.shields.io/github/tag/microlinkhq/aws-lambda-chrome.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/microlinkhq/aws-lambda-chrome/master.svg?style=flat-square)](https://travis-ci.org/microlinkhq/aws-lambda-chrome)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/aws-lambda-chrome.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/aws-lambda-chrome)
[![Dependency status](https://img.shields.io/david/microlinkhq/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/microlinkhq/aws-lambda-chrome)
[![Dev Dependencies Status](https://img.shields.io/david/dev/microlinkhq/aws-lambda-chrome.svg?style=flat-square)](https://david-dm.org/microlinkhq/aws-lambda-chrome#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/aws-lambda-chrome.svg?style=flat-square)](https://www.npmjs.org/package/aws-lambda-chrome)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/microlinkhq)

> Chrome binary compatible with AWS Lambda.

## Install

```bash
$ npm install aws-lambda-chrome --save
```

## Usage

```js
const awsLambdaChrome = require('aws-lambda-chrome')

awsLambdaChrome('do something')
//=> return something
```

1) Create EC2 instance

- **AMI**: `amzn-ami-hvm-2017.09.0.20170930-x86_64-gp2` (Latest community Amazon Linux).
- **Instance type**: c4.4xlarge.
- **Storage**: 30GB.

2) Execute `src/build.sh` script for generate the binary.

3) Make a tarball and download

```bash
cd out
export VERSION=<put chrome version here>
tar -zcvf chrome-headless-aws-lambda-$VERSION-x64.tgz ./headless_shell

scp -i path/to/your/key-pair.pem ec2-user@<instance-hostname>:path/to/tarball ./
```


## License

**aws-lambda-chrome** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/aws-lambda-chrome/blob/master/LICENSE.md) License.<br>
Authored and maintained by microlink.io with help from [contributors](https://github.com/microlinkhq/aws-lambda-chrome/contributors).

> [microlink.io](https://microlink.io) · GitHub [@microlink.io](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
