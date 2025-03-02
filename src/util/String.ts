import {String} from 'effect'
import type {Pair} from './types.js'

export * from 'effect/String'

/** Surround a string with the given string pair. */
export const surround =
  ([before, after]: Pair<string>) =>
  (s: string): string =>
    `${before}${s}${after}`

/** Prefix a string. A flipped version of `String.concat`. */
export const prefix =
  (prefix: string) =>
  (s: string): string =>
    String.concat(prefix, s)
