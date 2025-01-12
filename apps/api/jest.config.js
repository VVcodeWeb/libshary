const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.base.json'); // Adjust the path to your root `tsconfig.base.json`

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage/apps/api',
  testEnvironment: 'node',
  modulePaths: [
    '<rootDir>/apps/api',
    '<rootDir>/libs/shared-types',
    '<rootDir>/libs/prisma',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../../',
  }),
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'apps/api/tsconfig.spec.json', // Use the path to your test-specific tsconfig file
        diagnostics: true, // Optional: Enable diagnostics for debugging
      },
    ],
  },
};
