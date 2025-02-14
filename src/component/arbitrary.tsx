import {unary} from 'effect-ts-laws'
import type {Arbitrary} from 'fast-check'
import fc from 'fast-check'
import {type ReactNode} from 'react'
import type {SyncFC} from './types.js'

/** Arbitrary `ReactNode` encoding a random string in a `<div>` element. */
export const reactNode: Arbitrary<ReactNode> = fc
  .string({minLength: 0, maxLength: 40})
  .map(s => <div key={s}>{s}</div>)

/** Arbitrary component with given prop type. */
export const component = <Props extends object>(): Arbitrary<SyncFC<Props>> =>
  unary<Props>()(reactNode)
