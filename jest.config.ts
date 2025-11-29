// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};
