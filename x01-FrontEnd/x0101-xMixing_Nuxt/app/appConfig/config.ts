/**
 * Application Configuration and Utilities
 * Refactored for Nuxt 4 & TypeScript
 */

export const appConfig = {
  // Base URL for API calls - defaults to port 8001 on the same host
  get apiBaseUrl(): string {
    if (import.meta.server) return 'http://localhost:8001'
    return `http://${window.location.hostname}:8001`
  }
}


