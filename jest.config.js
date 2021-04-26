module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest'
  }
}
