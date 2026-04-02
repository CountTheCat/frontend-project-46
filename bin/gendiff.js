#!/usr/bin/env node

import { program } from 'commander'
import { createRequire } from 'module'
import genDiff from '../index.js'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

program
  .version(packageJson.version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options.format)
    console.log(result)
  })
  .parse()
