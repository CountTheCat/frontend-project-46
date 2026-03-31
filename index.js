import parseFile from './src/readFile.js'
import _ from 'lodash'

export default function genDiff(filepath1, filepath2) {
  const obj1 = parseFile(filepath1)
  const obj2 = parseFile(filepath2)
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  const allKeys = _.union(keys1, keys2)
  const sortedKeys = _.sortBy(allKeys)

  const lines = []
  for (const key of sortedKeys) {
    const hasInObj1 = Object.hasOwn(obj1, key)
    const hasInObj2 = Object.hasOwn(obj2, key)
    const value1 = obj1[key]
    const value2 = obj2[key]
    
    if (!hasInObj2) {
      lines.push(`  - ${key}: ${value1}`)
    } else if (!hasInObj1) {
      lines.push(`  + ${key}: ${value2}`)
    } else if (value1 !== value2) {
      lines.push(`  - ${key}: ${value1}`)
      lines.push(`  + ${key}: ${value2}`)
    } else {
      lines.push(`    ${key}: ${value1}`)
    }
  }
  return `{\n${lines.join('\n')}\n}`
}