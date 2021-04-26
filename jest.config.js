module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  }
}
