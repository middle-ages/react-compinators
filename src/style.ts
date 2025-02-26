import {type CSSProperties, type FC} from 'react'
import type {FcEndoOf} from './component.js'
import {modProp} from './map.js'
import type {CssVarTransform, HasStyle, StyleTransform} from './style/types.js'

/** Apply a transform to the `style` prop of a component. */
export const modStyle =
  (transform: StyleTransform) =>
  <Props extends HasStyle>(Base: FC<Props>): typeof Base =>
    modProp(Base, 'style')(transform)

/** Merge the given styles, overriding the keys given in component props. */
export const withStyle = (overrideStyle: CSSProperties): FcEndoOf<HasStyle> =>
  modStyle(style => ({...style, ...overrideStyle}))

/**
 * Merge the given styles only if styles are not in props, thus providing
 * defaults.
 */
export const withDefaultStyle = (
  overrideStyle: CSSProperties,
): FcEndoOf<HasStyle> => modStyle(style => ({...overrideStyle, ...style}))

/**
 * Apply a transform to the named CSS variable found in the `style` prop of a
 * component.
 */
export const modCssVar = (
  name: keyof CSSProperties,
  transform: CssVarTransform,
): FcEndoOf<HasStyle> =>
  modStyle(style => {
    const key = `--${name}` as keyof CSSProperties
    const value =
      style === undefined ? undefined : key in style ? style[key] : undefined
    return {...style, [key]: transform(value)}
  })
