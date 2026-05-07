/**
 * jest.config.ts
 * Jest configuration for Next.js + TypeScript.
 * - Uses ts-jest to compile TypeScript during tests.
 * - Uses jsdom to simulate the browser (needed for React component tests).
 * - Maps the @/* alias to src/* so imports work the same as in the app.
 */
import type { Config } from 'jest';

const config: Config = {
  // ts-jest compiles TypeScript files on-the-fly for Jest
  preset: 'ts-jest',

  // jsdom gives us window, document, etc. in the test environment
  testEnvironment: 'jest-environment-jsdom',

  // This file runs after Jest loads - adds jest-dom custom matchers
  // like toBeInTheDocument(), toHaveTextContent(), toBeDisabled(), etc.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Resolve @/* import alias (same as tsconfig paths)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Collect coverage reports from all TypeScript source files
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};

export default config;
