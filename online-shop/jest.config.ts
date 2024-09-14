export { };
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', // Correct the path for collecting coverage
    '!<rootDir>/src/**/*.d.ts',
    '!**/vendor/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Adjust path to setupTests.ts
  setupFiles: ['jest-localstorage-mock'], // Only setup localStorage here
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // For mocking CSS modules
  },
};
