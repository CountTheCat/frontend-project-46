const processNode = (node, path = '') => {
  const currentPath = path ? `${path}.${node.key}` : node.key

  switch (node.type) {
    case 'nested':
      return node.children.flatMap(child => processNode(child, currentPath))

    case 'added':
      return [{
        key: currentPath,
        type: 'added',
        value: node.value
      }]

    case 'removed':
      return [{
        key: currentPath,
        type: 'removed',
        value: node.value
      }]

    case 'changed':
      return [{
        key: currentPath,
        type: 'changed',
        oldValue: node.oldValue,
        newValue: node.newValue
      }]

    default:
      return []
  }
}

export default function json(tree) {
  const result = tree.flatMap(node => processNode(node))
  return JSON.stringify(result, null, 2)
}
