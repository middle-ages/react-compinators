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
  BaseProps extends object,
  Props extends Partial<BaseProps>,
> = Omit<BaseProps, keyof Props>

/**
 * Partially apply a subset of given component props.
 * @typeParam BaseProps - Props type of base component.
 * @param Base - Base component that will be partially applied.
 */
export const assume =
  <BaseProps extends object>(Base: FC<BaseProps>) =>
  <const Props extends Partial<BaseProps>>(
    /**
     * Props that will be partially applied to the base component in the
     * returned variant.
     */
    partialProps: Props,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ): FC<Simplify<Assumed<BaseProps, Props>>> => {
    const Component = (remaining: Simplify<Assumed<BaseProps, Props>>) => {
      const allProps = {
        ...partialProps,
        ...(remaining as Omit<BaseProps, keyof Props> | BaseProps),
      } as BaseProps
      return <Base {...allProps} />
    }
    return pipe(
      maybeNameWrapper ??
        pipe(partialProps, displayNameFor, String.prefix('assume')),
      wrapDisplayName(Component, Base),
    )
  }
