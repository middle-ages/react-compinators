import {Equivalence as EQ, Equal} from 'effect'
import {testUnaryEquivalence} from 'effect-ts-laws'
import type {Arbitrary} from 'fast-check'
import {type ReactNode} from 'react'
import type {SyncFC} from './types.ts'

/** Equivalence for `ReactNode`. */
export const reactNode: EQ.Equivalence<ReactNode> =
  Equal.equivalence<ReactNode>()

/** Equivalence for sync components from an arbitrary of their props. */
export const component = <Props extends object>(
  propsArbitrary: Arbitrary<Props>,
): EQ.Equivalence<SyncFC<Props>> =>
  testUnaryEquivalence<Props, ReactNode>(propsArbitrary, reactNode)
