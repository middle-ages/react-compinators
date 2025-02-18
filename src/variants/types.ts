import type {Types} from 'effect'
import type {FC, ReactNode} from 'react'

/**
 * A base type for type-level maps of variant name to variant definition.
 * @example
 * type MyVariantDefs =  VariantDefs<
 *   ['primary', 'secondary'],
 *   {color: string}
 * >
 * const myVariantDefs: MyVariantDefs = {
 *   primary: {color: 'red'},
 *   secondary: {color: 'blue'},
 * }
 * @typeParam Names - Readonly array of variant names.
 * @typeParam Props - Props type for base component.
 */
export type VariantDefs<
  Names extends readonly string[],
  Props extends object,
> = Record<Names[number], Partial<Props>>

/**
 * A type-level map of variant name to variant props, after the props given in
 * its definition are omitted.
 * @example
 * VariantMap<
 *   {color: string; text: string},
 *   VariantDefs<['primary', 'secondary'], {color: string}>
 * > = {primary: FC<{text: string}>; secondary: FC<{text: string}>}
 * @typeParam Props - Props type for base component.
 * @typeParam Defs - Type of variant definitions.
 */
export type VariantMap<
  Props extends object,
  Defs extends VariantDefs<readonly string[], Props>,
> = {
  [N in keyof Defs]: FC<Types.Simplify<Omit<Props, keyof Defs[N]>>>
}

/**
 * A component loaded with all its variants. The variant named `default`
 * is treated as if it describes changes to the base component.
 * @example
 * // No prop changes on base component, two variants fix “color” prop:
 * VariantFc<
 *   {color: string; text: string},
 *   ['primary', 'secondary'],
 *   VariantDefs<['primary', 'secondary'], {color: string}>
 * > = {
 *   (props: {color: string; text: string}) => Node
 *   primary: FC<{text: string}>
 *   secondary: FC<{text: string}>
 *   variantNames: ("primary" | "secondary")[]
 * }
 *
 * // When fixing the “text” prop on the “default” variant, target
 * // component no longer takes this prop.
 * VariantFc<
 *   {color: string; text: string}
 *   {
 *     (props: {color: string}) => Node // No “text” prop.
 *     primary: {color: 'red'}
 *     secondary: {color: 'yellow'}
 *     default: {text: 'Hello World!'}
 *   }
 * >
 * @typeParam Props - Props type for base component.
 * @typeParam Defs - Type of variant definitions.
 */
export type VariantFc<
  Props extends object,
  Defs extends VariantDefs<readonly string[], Props>,
> = {
  (
    props: Defs extends {default: Partial<Props>}
      ? Omit<Props, keyof Defs['default']>
      : Props,
  ): ReactNode
  variantNames: Exclude<keyof Defs, 'default'>[]
} & Types.Simplify<Omit<VariantMap<Props, Defs>, 'default'>>
