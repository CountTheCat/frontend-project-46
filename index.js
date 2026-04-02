import parseFile from './src/readFile.js'
import buildTree from './src/buildTree.js'
import format from './src/formatters.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)

  const tree = buildTree(obj1, obj2)

  return format(formatName, tree)
}
