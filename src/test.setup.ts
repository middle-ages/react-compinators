import '@testing-library/jest-dom/vitest'
import {cleanup, render} from '@testing-library/react'
import {afterEach} from 'vitest'

afterEach(() => {
  cleanup()
})

export const _ = render
