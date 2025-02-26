/**
 * The type of props accepted by the target component when wrapping a component
 * with props `BaseProps` and a type-level record mapping target component prop
 * names to base component prop names, for any prop names that are renamed.
 */
export type RenameProps<
  Map extends Record<string, string>,
  BaseProps extends Record<Map[string & keyof Map], unknown>,
> = {
  [K in keyof Map]: BaseProps[Map[string & K]]
} & RenameRestProps<Map, BaseProps>

/**
 * The props left over when omitting from `BaseProps` the props that will be
 * renamed according to `Map`.
 */
export type RenameRestProps<
  Map extends Record<string, string>,
  BaseProps extends Record<Map[string & keyof Map], unknown>,
> = Omit<BaseProps, Map[keyof Map]>

/**
 * The type of props where `Prop` is optional, after it has been converted into
 * a required prop.
 */
export type WithRequiredProp<
  Prop extends string,
  BaseProps extends {[key in Prop]?: unknown},
> = Omit<BaseProps, Prop> & Record<Prop, Required<BaseProps[Prop]>>

/**
 * The type of props where `Prop` is required, after it has been made optional
 * by providing a default.
 */
export type WithDefaultProp<
  Prop extends string,
  Value,
  BaseProps extends Record<Prop, Value>,
> = Omit<BaseProps, Prop> & {[key in Prop]?: unknown}
