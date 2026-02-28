/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/utils/index.ts",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/blog/$1",
  },
};

export default config;
