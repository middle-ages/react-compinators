import {pipe} from 'effect'
import type {PropsWithChildren, ReactNode} from 'react'
import type {ChildrenTransform} from './children/types.js'
import {modOptionalProp} from './map.js'
import {Array} from './util.js'
import type {FcEndoOf} from './util.js'
export type * from './children/types.js'

/**
 * Modify the `children` prop, of type `ReactNode | undefined` of a component.
 * @param transform - Function that will be run over the `children` prop.
 * @param maybeNameWrapper - Optional `displayName` of the wrapper component.
 */
export const modChildren = (
  transform: ChildrenTransform,
  maybeNameWrapper?: string,
): FcEndoOf<PropsWithChildren> =>
  modOptionalProp('children')<ReactNode | undefined>(
    transform,
    maybeNameWrapper,
  )

/** Prepend to the `children` prop of a component. */
export const prependChildren = (
  ...prefix: ReactNode[]
): FcEndoOf<PropsWithChildren> => pipe(prefix, Array.appendF, modChildren)

/** Append to the `children` prop of a component. */
export const appendChildren = (
  ...prefix: ReactNode[]
): FcEndoOf<PropsWithChildren> => pipe(prefix, Array.prependF, modChildren)
