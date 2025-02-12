import '@testing-library/jest-dom/vitest'
import {cleanup, render} from '@testing-library/react'
import {afterEach} from 'vitest'

afterEach(() => {
  cleanup()
})

// eslint-disable-next-line unicorn/prefer-export-from
export const _ = render
