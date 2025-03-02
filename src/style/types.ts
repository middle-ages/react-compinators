import type {CSSProperties} from 'react'

/** Type of functions that transform an optional React style object. */
export interface StyleTransform {
  (style?: CSSProperties): CSSProperties
}

/** Type of functions that transform an optional value of a CSS variable. */
export interface CssVarTransform {
  (value?: string | number): string | undefined | number
}

/**
 * Type of props that has an optional `style` prop of the React CSS properties
 * type. For example: `{name: string; style?: CSSProperties}`.
 */
export interface HasStyle {
  style?: CSSProperties
}
