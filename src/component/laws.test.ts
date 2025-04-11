import {pipe} from 'effect'
import {
  contravariantLaws,
  type ContravariantTypeLambda,
  unfoldPropsGiven,
} from 'effect-ts-laws'
import {testLawSets} from 'effect-ts-laws/vitest'
import {Contravariant, type FcTypeLambda} from '../component.js'

describe('component', () => {
  test('laws', () => {
    pipe(
      Contravariant,
      unfoldPropsGiven.contravariant<ContravariantTypeLambda, FcTypeLambda>,
      contravariantLaws,
      testLawSets(),
    )
  })
})
