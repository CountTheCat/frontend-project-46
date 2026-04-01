import parseFile from './src/readFile.js'
import buildTree from './src/buildTree.js'
import stylish from './src/formatters/stylish.js'

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)
  
  const tree = buildTree(obj1, obj2)
  
  if (format === 'stylish') {
    return `{\n${stylish(tree)}\n}`
  }
  
  throw new Error(`Unsupported format: ${format}`)
}