import {Array, pipe, Types} from 'effect'
import {type FC} from 'react'
import {displayNameFor, wrapDisplayName} from './displayName.js'
import {String} from './util.js'

/**
 * Unfold the given component into a component per member of the given union,
 * where the given prop of each component is partially applied to a different
 * member of the union.
 *
 * This code:
 *
 * ```tsx
 * const [GreenLabel, YellowLabel, RedLabel] = [
 *   assumeProp(BaseLabel, 'color')('green'),
 *   assumeProp(BaseLabel, 'color')('yellow'),
 *   assumeProp(BaseLabel, 'color')('red'),
 * ]
 * ```
 *
 * Can be rewritten using `unfoldProp` as:
 *
 * ```tsx
 * import {String} from 'effect'
 * import {unfoldProp} from 'react-compinators'
 *
 * const [ GreenLabel, YellowLabel, RedLabel ] = unfoldProp(
 *   BaseLabel,                  // Base component.
 *   'color',                    // Prop that we will be setting.
 * )(
 *   ['green', 'yellow', 'red'], // Array of union members.
 *   String.capitalize,          // Optional function will be used to compute
 *                               // variant displayName from its `color` prop.
 * )
 * ```
 */
export const unfoldProp =
  <Props extends object, Prop extends string & keyof Props>(
    Base: FC<Props>,
    propName: Prop,
  ) =>
  <const Union extends readonly Props[Prop][]>(
    members: Union,
    buildDisplayName?: (value: Props[Prop]) => string,
  ) => {
    const buildName: (value: Props[Prop]) => string =
      buildDisplayName === undefined
        ? () => `unfoldProp${String.capitalize(propName)}`
        : buildDisplayName

    const results = pipe(
      members,
      Array.map(member =>
        assumeProp(Base, propName)(
          member as Props[Prop],
          buildName(member as Props[Prop]),
        ),
      ),
    ) as unknown as Types.TupleOf<
      Union['length'],
      FC<Types.Simplify<Omit<Props, Prop>>>
    >

    return results
  }

/**
 * Just like {@link assumeProps} but for a single prop.
 * @typeParam BaseProps - Props type of base component.
 * @param Base - Base component that will be partially applied.
 * @param prop - prop name from `Base` props that be fixed to the given value.
 */
export const assumeProp =
  <Props extends object, const Prop extends string & keyof Props>(
    Base: FC<Props>,
    prop: Prop,
  ) =>
  (
    /** Prop value that will be partially applied to the variant. */
    value: Props[Prop],
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ) => {
    const Component = (remaining: Omit<Props, Prop>) => (
      <Base {...({...remaining, [prop]: value} as Props)} />
    )

    return pipe(
      maybeNameWrapper ?? `assumeProp${String.capitalize(prop)}`,
      wrapDisplayName(Component, Base),
    ) as FC<Types.Simplify<Omit<Props, Prop>>>
  }

/**
 * Partially apply a subset of given component props.
 * @typeParam BaseProps - Props type of base component.
 * @param Base - Base component that will be partially applied.
 */
export const assumeProps =
  <BaseProps extends object>(Base: FC<BaseProps>) =>
  <const Props extends Partial<BaseProps>>(
    /**
     * Props that will be partially applied to the base component in the
     * returned variant.
     */
    partialProperties: Props,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ): FC<Types.Simplify<Assumed<BaseProps, Props>>> => {
    const Component = (
      remaining: Types.Simplify<Assumed<BaseProps, Props>>,
    ) => {
      const allProps = {
        ...partialProperties,
        ...(remaining as Omit<BaseProps, keyof Props> | BaseProps),
      } as BaseProps
      return <Base {...allProps} />
    }
    return pipe(
      maybeNameWrapper ??
        pipe(partialProperties, displayNameFor, String.prefix('assumeProps')),
      wrapDisplayName(Component, Base),
    )
  }

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
