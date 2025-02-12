import {pipe} from 'effect'
import {Simplify} from 'effect/Types'
import {FC} from 'react'
import {displayNameFor, wrapDisplayName} from './displayName.ts'
import {String} from './util.ts'

/**
 * The type of props remaining from the total props after currying the given
 * partial props.
 * @typeParam BaseProps - Props type of base component.
 * @typeParam Props - Base component props that are fixed in the variant. Must
 * not include any props that are _not_ in the base component.
 */
export type Assumed<
  BaseProperties extends object,
  Properties extends Partial<BaseProperties>,
> = Omit<BaseProperties, keyof Properties>

/**
 * Partially apply a subset of given component props.
 * @typeParam BaseProps - Props type of base component.
 * @param Base - Base component that will be partially applied.
 */
export const assume =
  <BaseProperties extends object>(Base: FC<BaseProperties>) =>
  <const Properties extends Partial<BaseProperties>>(
    /**
     * Props that will be partially applied to the base component in the
     * returned variant.
     */
    partialProperties: Properties,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ): FC<Simplify<Assumed<BaseProperties, Properties>>> => {
    const Component = (
      remaining: Simplify<Assumed<BaseProperties, Properties>>,
    ) => {
      const allProps = {
        ...partialProperties,
        ...(remaining as
          | Omit<BaseProperties, keyof Properties>
          | BaseProperties),
      } as BaseProperties
      return <Base {...allProps} />
    }
    return pipe(
      maybeNameWrapper ??
        pipe(partialProperties, displayNameFor, String.prefix('assume')),
      wrapDisplayName(Component, Base),
    )
  }
