import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { describe, test, expect } from '@jest/globals'
import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('compares flat json files', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

    expect(result).toBe(expected)
  })

  test('compares flat yaml files', () => {
    const filepath1 = getFixturePath('file1.yml')
    const filepath2 = getFixturePath('file2.yml')

    const result = genDiff(filepath1, filepath2)

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

    expect(result).toBe(expected)
  })

  test('compares nested json files', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')

    const result = genDiff(filepath1, filepath2)

    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`

    expect(result).toBe(expected)
  })

  test('compares nested json files in plain format', () => {
    const filepath1 = getFixturePath('file1_nested.json')
    const filepath2 = getFixturePath('file2_nested.json')

    const result = genDiff(filepath1, filepath2, 'plain')

    const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`

    expect(result).toBe(expected)
  })

  test('compares flat json files in plain format', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2, 'plain')

    const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`

    expect(result).toBe(expected)
  })
})

test('compares nested json files in json format', () => {
  const filepath1 = getFixturePath('file1_nested.json')
  const filepath2 = getFixturePath('file2_nested.json')

  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result)

  // Проверяем структуру и ключи
  expect(Array.isArray(parsed)).toBe(true)

  // Проверяем несколько конкретных узлов
  const addedNode = parsed.find(node => node.key === 'common.follow')
  expect(addedNode).toEqual({
    key: 'common.follow',
    type: 'added',
    value: false
  })

  const removedNode = parsed.find(node => node.key === 'common.setting2')
  expect(removedNode).toEqual({
    key: 'common.setting2',
    type: 'removed',
    value: 200
  })

  const changedNode = parsed.find(node => node.key === 'common.setting3')
  expect(changedNode).toEqual({
    key: 'common.setting3',
    type: 'changed',
    oldValue: true,
    newValue: null
  })

  const nestedChangedNode = parsed.find(node => node.key === 'common.setting6.doge.wow')
  expect(nestedChangedNode).toEqual({
    key: 'common.setting6.doge.wow',
    type: 'changed',
    oldValue: '',
    newValue: 'so much'
  })
})

test('compares flat json files in json format', () => {
  const filepath1 = getFixturePath('file1.json')
  const filepath2 = getFixturePath('file2.json')

  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result)

  expect(Array.isArray(parsed)).toBe(true)
  expect(parsed).toHaveLength(4)

  const removedKeys = parsed.filter(n => n.type === 'removed').map(n => n.key)
  expect(removedKeys).toEqual(['follow', 'proxy'])

  const addedKeys = parsed.filter(n => n.type === 'added').map(n => n.key)
  expect(addedKeys).toEqual(['verbose'])

  const changedNode = parsed.find(n => n.key === 'timeout')
  expect(changedNode).toEqual({
    key: 'timeout',
    type: 'changed',
    oldValue: 50,
    newValue: 20
  })
})

test('compares flat yaml files in json format', () => {
  const filepath1 = getFixturePath('file1.yml')
  const filepath2 = getFixturePath('file2.yml')

  const result = genDiff(filepath1, filepath2, 'json')
  const parsed = JSON.parse(result)

  expect(Array.isArray(parsed)).toBe(true)
  expect(parsed).toHaveLength(4)

  const removedKeys = parsed.filter(n => n.type === 'removed').map(n => n.key)
  expect(removedKeys).toEqual(['follow', 'proxy'])

  const addedKeys = parsed.filter(n => n.type === 'added').map(n => n.key)
  expect(addedKeys).toEqual(['verbose'])
})
