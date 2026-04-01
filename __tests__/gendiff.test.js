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