import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const buildPath = (path, key) => {
  return path ? `${path}.${key}` : key
}

const formatValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
}

export default function plain(tree, parentPath = '') {
  const lines = []
  
  for (const node of tree) {
    const fullPath = buildPath(parentPath, node.key)
    
    switch (node.type) {
    case 'nested':
      lines.push(plain(node.children, fullPath))
      break
      
    case 'added':
      lines.push(`Property '${fullPath}' was added with value: ${stringify(node.value)}`)
      break
      
    case 'removed':
      lines.push(`Property '${fullPath}' was removed`)
      break
      
    case 'changed':
      lines.push(`Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`)
      break
      
    default:
      // unchanged — пропускаем
      break
    }
  }
  
  return lines.filter(line => line !== '').join('\n')
}