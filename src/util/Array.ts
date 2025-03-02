import {Array} from 'effect'

export * from 'effect/Array'

export const appendF =
    <A>(self: A[]): ((last: A) => A[]) =>
    last =>
      Array.append(self, last),
  prependF =
    <A>(self: A[]): ((last: A) => A[]) =>
    head =>
      Array.prepend(self, head)

export const appendAllF =
    <A>(self: A[]): ((tail: A[]) => A[]) =>
    tail =>
      Array.appendAll(self, tail),
  prependAllF =
    <A>(self: A[]): ((head: A[]) => A[]) =>
    init =>
      Array.prependAll(self, init)
