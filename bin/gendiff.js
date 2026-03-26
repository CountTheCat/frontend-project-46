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
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2)
    console.log(result)
  })
  .parse()