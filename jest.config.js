module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest'
  }
}
