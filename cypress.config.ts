import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.ts', // Only .ts files
    supportFile: 'cypress/support/e2e.ts'
  },
})