import {String} from 'effect'
import type {Pair} from './Pair.ts'

export * from 'effect/String'

/** Replace given string if it is empty. */
export const replaceEmpty =
  (replace: string) =>
  (s: string): string =>
    s === '' ? replace : s

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
