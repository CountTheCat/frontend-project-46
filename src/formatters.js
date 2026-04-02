import stylish from './formatters/stylish.js'
import plain from './formatters/plain.js'
import json from './formatters/json.js'

const formatters = {
  stylish,
  plain,
  json,
}

export default (format, tree) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported format: ${format}`)
  }
  return formatters[format](tree)
}
