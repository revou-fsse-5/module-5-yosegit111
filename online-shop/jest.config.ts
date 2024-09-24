export { };
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/*/.{ts,tsx}', '!src/*/.d.ts',
    '!*/vendor/*'],
  coverageDirectory: 'coverage',
//   testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', ".(ts|tsx)": "ts-jest"
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "setupTests.ts",
    "index.tsx"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts', 'jest-fetch-mock'],
  setupFiles: ['jest-localstorage-mock','jest-fetch-mock'],
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Add the file extensions to be used in tests
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
};
