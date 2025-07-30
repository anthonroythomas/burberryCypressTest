import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
        // Set default viewport to 1920x1080
    viewportWidth: 1920,
    viewportHeight: 1080,
    specPattern: 'cypress/e2e/**/*.cy.ts', // Only .ts files
    supportFile: 'cypress/support/e2e.ts'
  },
})