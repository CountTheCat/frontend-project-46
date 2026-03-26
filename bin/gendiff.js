#!/usr/bin/env node

import { program } from 'commander'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

program
  .version(packageJson.version)
  .description('Compares two configuration files and shows a difference.')
  .parse()