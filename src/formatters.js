import stylish from './formatters/stylish.js'
import plain from './formatters/plain.js'
import json from './formatters/json.js'

export default (format, tree) => {
  switch (format) {
    case 'stylish':
      return stylish(tree)

    case 'plain':
      return plain(tree)

    case 'json':
      return json(tree)

    default:
      throw new Error(`Unsupported format: ${format}`)
  }
}
