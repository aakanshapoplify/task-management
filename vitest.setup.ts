import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock Vue Router
config.global.mocks = {
  $router: {
    push: vi.fn()
  },
  $route: {
    params: {}
  }
}
