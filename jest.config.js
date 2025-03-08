export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'], // Look for test files ending with .test.ts
    moduleFileExtensions: ['ts', 'js'], // Support TypeScript and JavaScript
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transform TypeScript files with ts-jest
    },
  };