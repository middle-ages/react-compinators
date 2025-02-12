import {Array, pipe} from 'effect'
import {constant} from 'effect/Function'
import {Simplify, type TupleOf} from 'effect/Types'
import {FC} from 'react'
import {displayNameFor, wrapDisplayName} from './displayName.ts'
import {String} from './util.ts'

/**
 * Unfold the given component into a component per member of the given union,
 * where the given prop of each component is partially applied to a different
 * member of the union.
 */
export const unionVariants =
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
        ? constant(`unionVariants${String.capitalize(propName)}`)
        : buildDisplayName

    return pipe(
      members,
      Array.map(member =>
        assumeProp(Base, propName)(
          member as Props[Prop],
          buildName(member as Props[Prop]),
        ),
      ),
    ) as unknown as TupleOf<Union['length'], FC<Simplify<Omit<Props, Prop>>>>
  }

/**
 * Just like {@link assume} but for a single prop.
 * @typeParam BaseProps - Props type of base component.
 * @param Base - Base component that will be partially applied.
 * @param prop - prop name from `Base` props that be fixed to the given value.
 */
export const assumeProp =
  <BaseProps extends object, const Prop extends keyof BaseProps>(
    Base: FC<BaseProps>,
    prop: Prop,
  ) =>
  <Value extends BaseProps[Prop]>(
    /** Prop value that will be partially applied to the variant. */
    value: Value,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ): FC<Simplify<Omit<BaseProps, Prop>>> =>
    assume(Base)({[prop]: value} as Partial<BaseProps>, maybeNameWrapper)

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
    partialProperties: Props,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed from given prop names.
     */
    maybeNameWrapper?: string,
  ): FC<Simplify<Assumed<BaseProps, Props>>> => {
    const Component = (remaining: Simplify<Assumed<BaseProps, Props>>) => {
      const allProps = {
        ...partialProperties,
        ...(remaining as Omit<BaseProps, keyof Props> | BaseProps),
      } as BaseProps
      return <Base {...allProps} />
    }
    return pipe(
      maybeNameWrapper ??
        pipe(partialProperties, displayNameFor, String.prefix('assume')),
      wrapDisplayName(Component, Base),
    )
  }
