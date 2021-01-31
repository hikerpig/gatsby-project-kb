// const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testRegex: `.*/__tests__/.*|\\.(spec)\\.tsx?$`,
};
