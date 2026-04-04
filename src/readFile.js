import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export default function parseFile(filepath) {
  const extension = path.extname(filepath).slice(1).toLowerCase()
  const data = fs.readFileSync(filepath, 'utf-8')

  switch (extension) {
    case 'json':
      return JSON.parse(data)

    case 'yaml':
    case 'yml':
      return yaml.load(data)

    default:
      throw new Error(`Unsupported file format: ${extension}`)
  }
}
