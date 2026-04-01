import _ from 'lodash'

export default function buildTree(obj1, obj2) {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort()
  
  return keys.map(key => {
    const value1 = obj1[key]
    const value2 = obj2[key]
    const hasKey1 = Object.hasOwn(obj1, key)
    const hasKey2 = Object.hasOwn(obj2, key)
    
    if (!hasKey2) {
      return {
        key,
        type: 'removed',
        value: value1
      }
    }
    
    if (!hasKey1) {
      return {
        key,
        type: 'added',
        value: value2
      }
    }
    
    if (_.isObject(value1) && _.isObject(value2) && value1 !== null && value2 !== null) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2)
      }
    }
    
    if (value1 !== value2) {
      return {
        key,
        type: 'changed',
        oldValue: value1,
        newValue: value2
      }
    }
    
    return {
      key,
      type: 'unchanged',
      value: value1
    }
  })
}