import {Contravariant as CT} from '@effect/typeclass'
import {pipe, String} from 'effect'
import {dual} from 'effect/Function'
import type {FC} from 'react'
import type {FcTypeLambda} from './component'
import {wrapDisplayName} from './displayName'

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
 * Modify the props input of the given component by applying a function of type
 * `<A>(a: A) => A` over a named prop value. Useful when you can compute the new
 * value from the old one and nothing else, and you do not need to change the
 * prop type.
 * @typeParam Props - Props type of base component.
 * @typeParam Prop - Name of prop that will be modified.
 * @param Base - Base component that will get the modified props.
 * @param propName - Name of prop to modify.
 */
export const modProp =
  <Props extends object, Prop extends string & keyof Props>(
    Base: FC<Props>,
    propName: Prop,
  ) =>
  (
    /** The mapping function will be applied to the prop value. */
    modify: (value: Props[Prop]) => typeof value,
    /**
     * Optional `displayName` wrapper will be added to base component
     * `displayName`. Default is computed modified given prop name.
     */
    maybeNameWrapper?: string,
  ): FC<Props> => {
    const Component = (props: Props) => (
      <Base {...({...props, [propName]: modify(props[propName])} as Props)} />
    )

    return wrapDisplayName(
      Component,
      Base,
    )(maybeNameWrapper ?? `modProp${String.capitalize(propName)}`)
  }

export const contramap: CT.Contravariant<FcTypeLambda>['contramap'] = dual(
  2,
  <A, B>(Base: FC<A>, f: (b: B) => A): FC<B> => {
    const Component = (props: B) => <Base {...(f(props) as A & object)} />
    return wrapDisplayName(Component, Base)('contramap')
  },
)

/**
 * [Contravariant](https://github.com/Effect-TS/effect/blob/main/packages/typeclass/src/Contravariant.ts)
 * instance for React components.
 */
export const Contravariant: CT.Contravariant<FcTypeLambda> = {
  contramap,
  imap: CT.imap<FcTypeLambda>(contramap),
}
