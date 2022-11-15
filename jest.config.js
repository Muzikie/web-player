const { resolve } = require('path');

module.exports = {
  rootDir: './app',
  resetModules: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^~(.*)$': resolve(__dirname, './app/$1'),
  },
};
