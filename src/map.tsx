import {pipe, String, Struct, type Types} from 'effect'
import type {FC} from 'react'
import {wrapDisplayName} from './displayName.js'
import {
  type RenameProps,
  type RenameRestProps,
  type WithDefaultProp,
  type WithRequiredProp,
} from './map/types.js'
import {cloneComponent} from './util/react.js'

export type {
  RenameProps,
  RenameRestProps,
  WithDefaultProp,
  WithRequiredProp,
} from './map/types.js'

/**
 * Convert a component that takes an optional prop `prop` into a component where
 * the prop is required. The opposite of {@link withDefault}.
 * @typeParam Prop - Type of prop name. Must exist as optional field on `Base`
 * props.
 * @param prop - Name of optional prop to convert.
 */
export const requireProp =
  <Prop extends string>(prop: Prop) =>
  <BaseProps extends {[key in Prop]?: unknown}>(Base: FC<BaseProps>) =>
    cloneComponent(
      Base,
      `requireProp${String.capitalize(prop)}(${Base.displayName ?? Base.name})`,
    ) as FC<Types.Simplify<WithRequiredProp<Prop, BaseProps>>>

/**
 * Convert a component that takes a required prop `prop` into a component where
 * the prop is optional by providing a default value. The opposite of {@link requireProp}.
 * When the returned component receives the prop, it will use it, but when none
 * is given it will use the default given here.
 * @typeParam Prop - Type of prop name. Must exist as a required field on `Base`
 * props.
 * @typeParam Value - Prop type.
 * @param prop - Name of required prop to convert.
 * @param value - Default value for prop.
 */
export const withDefault =
  <Prop extends string, Value>(prop: Prop, value: Value) =>
  <BaseProps extends Record<Prop, Value>>(Base: FC<BaseProps>) =>
    pipe(
      Base,
      mapProps(
        (props: BaseProps) => ({
          ...props,
          [prop]: prop in props ? (props[prop] ?? value) : value,
        }),
        `withDefault${String.capitalize(prop)}`,
      ),
    ) as FC<Types.Simplify<WithDefaultProp<Prop, Value, BaseProps>>>

/**
 * @typeParam Map - Type of new prop name ⇒ base component prop name map.
 * @param map - Map of new prop names to mapped base component prop name.
 * @param displayName - Optional `displayName` wrapper. Defaults to `renameProps`.
 */
export const renameProps =
  <const Map extends Record<string, string>>(
    map: Map,
    displayName = 'renameProps',
  ) =>
  /* Base component will be given renamed props. */
  <BaseProps extends Record<Map[string & keyof Map], unknown>>(
    Base: FC<BaseProps>,
  ) => {
    type Props = RenameProps<Map, BaseProps>

    const rename = (props: Props): BaseProps => {
      const result = {} as BaseProps
      for (const [key, value] of Object.entries(props)) {
        if (key in map) {
          result[map[key as string & keyof Map]] = value as never
        } else {
          result[key as keyof RenameRestProps<Map, BaseProps>] = props[
            key as keyof Props
          ] as never
        }
      }
      return result
    }

    return pipe(Base, mapProps(rename, displayName)) as FC<
      Types.Simplify<RenameProps<Map, BaseProps>>
    >
  }

/**
 * Rename a single named prop.
 * @param oldName - Old prop name. Must be present in the given props.
 * @param newName - New prop name. Must be present in the props of the given component.
 * @param displayName - Optional `displayName` wrapper. Defaults to
 * `renameProp[OLD_NAME][NEW_NAME]`.
 * @returns
 */
export const renameProp =
  <const O extends string, const N extends string>(
    oldName: O,
    newName: N,
    displayName = `renameProp${String.capitalize(oldName)}${String.capitalize(newName)}`,
  ) =>
  /* Base component will be given renamed prop. */
  <Props extends Record<N, unknown>>(
    Base: FC<Props>,
  ): FC<Omit<Props, N> & Record<O, unknown>> => {
    const Component = (oldProps: Omit<Props, N> & Record<O, unknown>) => {
      const value = oldProps[oldName]
      const rest = Struct.omit(oldName)(oldProps) as Omit<Props, O>
      const props = {[newName]: value, ...rest} as Props
      return <Base {...props} />
    }
    return pipe(displayName, wrapDisplayName(Component, Base))
  }

/** Omit the given prop names from for the given component. */
export const omitProps =
  <Props extends object>(Base: FC<Props>, displayName = 'omitProps') =>
  <const Names extends readonly [string, ...string[]]>(...names: Names) => {
    const Component = (props: Props) => (
      <Base {...(Struct.omit(...names)(props) as Props)} />
    )
    return pipe(displayName, wrapDisplayName(Component, Base))
  }

/**
 * Lifts a function that maps the prop type `B` into the prop type `A`, into a
 * function the maps a component of type `FC<A>` into a component of type
 * `FC<B>`.
 *
 * This is the opposite of how `map` works. For example, `Array.map` lifts:
 *
 * ```ts
 * (A ⇒ B) -into→ (Array<A> ⇒ Array<B>)
 * ```
 *
 * While `mapProps`, called`mapInput` in
 * [`effect`](https://github.com/Effect-TS/effect/blob/c407726f79df4a567a9631cddd8effaa16b3535d/packages/effect/src/Predicate.ts#L92),
 * and [`contramap` in `@effect/typeclass`](https://github.com/Effect-TS/effect/blob/main/packages/typeclass/src/Contravariant.ts#L13),
 * (“contra” means “counter to” in greek), is of type:
 *
 * ```ts
 * (B ⇒ A) -into→ (FC<A> ⇒ FC<B>)
 * ```
 *
 * Useful when:
 *
 * 1. You have a component that takes props of type `A`.
 * 2. But you want a component that takes props of type `B`.
 * 3. And the props you have are of type `B`.
 * 4. But you do have some way of converting `B` ⇒ `A`.
 *
 * For example:
 *
 * ```tsx
 * import {mapProps} from 'react-compinators'
 * interface B { foo: string }
 * interface A { bar: number }
 *
 * const ComponentA: FC<A> = ({ bar }) => <div>{bar + 1}</div>;
 *
 * // The function mapping B ⇒ A
 * const mapper = (a: B): A => ({ bar: a.foo.length })
 *
 * // We now have a component of B
 * const ComponentB: FC<B> = pipe(ComponentA, mapProps(mapper));
 * ```
 */
export const mapProps =
  <B extends object, A extends object>(
    f: (props: B) => A,
    displayName = 'mapProps',
  ) =>
  (Base: FC<A>): FC<B> => {
    const Component = (props: B) => <Base {...f(props)} />
    return pipe(displayName, wrapDisplayName(Component, Base))
  }

/**
 * Just like `mapProps` but for a single prop. The component will be given its
 * props unmodified, except for a single prop where the value will be the result
 * of the given function. The given function is given the original prop value.
 * @typeParam Prop - Type of prop name.
 * @typeParam B - Type of given prop value.
 * @typeParam A - Type of prop value as expected by the base component.
 * @typeParam Props - Prop type of the base component.
 * @param f - The function that will be run over the prop value.
 * @param prop - The prop name to be mapped over.
 * @param displayName - Optional `displayName` wrapper. Defaults to `mapProp`.
 */
export const mapProp =
  <Prop extends string, B, A>(
    f: (b: B) => A,
    prop: Prop,
    displayName = `mapProp${String.capitalize(prop)}`,
  ) =>
  <Props extends Record<Prop, A>>(
    /** Base component that accepts a prop of type `Props`. */
    Base: FC<Props>,
  ): FC<Omit<Props, Prop> & Record<Prop, B>> => {
    type NewProps = Omit<Props, Prop> & Record<Prop, B>
    const mapper = (props: NewProps) =>
      Object.assign({[prop]: f(props[prop])}, Struct.omit(props, prop)) as Props
    return mapProps<NewProps, Props>(mapper, displayName)(Base)
  }

/**
 * Modify the props input of the given component by applying a function of type
 * `<A>(a: A) => A` over a named prop value. Useful when you can compute the new
 * value from the old one and nothing else, and you do not need to change the
 * prop type.
 * @typeParam Prop - Type of modified prop name.
 * @typeParam Value - Modified prop value type.
 * @param propName - Name of prop to modify.
 * @param modify - The mapping function will be applied to the prop value.
 * @param maybeNameWrapper - Optional `displayName` wrapper will be added to
 * base component `displayName`. Default is computed modified given prop name.
 */
export const modProp =
  <Prop extends string, Value>(
    propName: Prop,
    modify: (value: Value) => Value,
    maybeNameWrapper?: string,
  ) =>
  <Props extends Record<Prop, Value>>(
    /** Component to modify. */
    Base: FC<Props>,
  ): typeof Base => {
    const Component = (props: Props) => (
      <Base {...({...props, [propName]: modify(props[propName])} as Props)} />
    )

    return wrapDisplayName(
      Component,
      Base,
    )(maybeNameWrapper ?? `modProp${String.capitalize(propName)}`)
  }

/** Just like `modProp` but for _optional_ props. */
export const modOptionalProp =
  <Prop extends string>(propName: Prop) =>
  <Value,>(modify: (value?: Value) => Value, maybeNameWrapper?: string) =>
  <Props extends Partial<Record<Prop, Value>>>(
    /** Component to modify. */
    Base: FC<Props>,
  ): typeof Base => {
    const Component = (props: Props) => (
      <Base {...({...props, [propName]: modify(props[propName])} as Props)} />
    )

    return wrapDisplayName(
      Component,
      Base,
    )(maybeNameWrapper ?? `modProp${String.capitalize(propName)}`)
  }
