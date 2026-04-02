import _ from 'lodash'

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) {
    return String(value)
  }
  
  const indent = ' '.repeat(depth * 4 + 4)
  const lines = Object.entries(value).map(([key, val]) => {
    return `${indent}${key}: ${stringify(val, depth + 1)}`
  })
  
  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4)}}`
}

export default function stylish(tree, depth = 0) {
  const indent = ' '.repeat(depth * 4)
  const lines = []
  
  for (const node of tree) {
    const key = node.key
    
    switch (node.type) {
    case 'nested':
      lines.push(`${indent}    ${key}: {`)
      lines.push(stylish(node.children, depth + 1))
      lines.push(`${indent}    }`)
      break
      
    case 'added':
      lines.push(`${indent}  + ${key}: ${stringify(node.value, depth + 1)}`)
      break
      
    case 'removed':
      lines.push(`${indent}  - ${key}: ${stringify(node.value, depth + 1)}`)
      break
      
    case 'changed':
      lines.push(`${indent}  - ${key}: ${stringify(node.oldValue, depth + 1)}`)
      lines.push(`${indent}  + ${key}: ${stringify(node.newValue, depth + 1)}`)
      break
      
    default: // unchanged
      lines.push(`${indent}    ${key}: ${stringify(node.value, depth + 1)}`)
      break
    }
  }
  
  if (depth === 0) {
    return `{\n${lines.join('\n')}\n}`
  }
  
  return lines.join('\n')
}