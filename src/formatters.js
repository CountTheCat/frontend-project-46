import stylish from './formatters/stylish.js'
import plain from './formatters/plain.js'

const formatters = {
  stylish,
  plain
}

export default (format, tree) => {
  if (!formatters[format]) {
    throw new Error(`Unsupported format: ${format}`)
  }
  return formatters[format](tree)
}