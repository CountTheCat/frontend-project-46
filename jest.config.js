/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  // Тестовые файлы
  testMatch: ['**/__tests__/**/*.test.js'],
  // Генерация покрытия кода
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  // Какие файлы включать в покрытие
  collectCoverageFrom: [
    'src/**/*.js',
    'index.js',
    '!**/__tests__/**',
    '!**/__fixtures__/**',
    '!**/node_modules/**',
    '!**/bin/**'
  ],
  transform: {}
}