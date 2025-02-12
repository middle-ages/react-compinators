import {Array, pipe} from 'effect'
import {Simplify} from 'effect/Types'
import {FC} from 'react'
import {displayNameFor, wrapDisplayName} from './displayName.ts'
import {String} from './util.ts'
import {assume} from './assume.tsx'

/**
 * Unfold the given component into a component per member of the given union,
 * where the given prop of each component is partially applied to a different
 * member of the union.
 */
export const unionVariants =
  <Props extends object>(Base: FC<Props>) =>
  <Prop extends keyof Props, const Union extends Props[Prop]>(
    propName: string,
    members: Union[],
    buildDisplayName?: (value: Props[Prop]) => string,
  ) => {
    const assumed = assume(Base)

    pipe(
      members,
      Array.map(member => assume()),
    )
  }
