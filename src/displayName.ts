import {Array, flow, pipe, Record} from 'effect'
import type {AnyComponent} from './util.js'
import {String} from './util.js'

/**
 * Update the `displayName` of the `component` argument with the result of
 * running `f` on the `displayName` of the optional `source` argument, by
 * default set as `component`.
 *
 * Returns the `component` argument with its display name modified.
 * @param component `displayName` will be _set_ on this component.
 * @param source `displayName` will be _read_ from this component. By default,
 * set as `component` so that you are reading/writing the `displayName` of a
 * single component.
 */
export const modDisplayName =
  <Component extends AnyComponent>(
    component: Component,
    source: AnyComponent = component,
  ) =>
  (f: (previous: string) => string): Component => {
    component.displayName = f(source.displayName ?? source.name)
    return component
  }

/**
 * Returns given component with its `displayName` wrapped by the given string
 * according to React HOC conventions: `HOC_NAME(COMPONENT_NAME)`.
 * If the optional `source` argument is given, then it will be used as the
 * source of the `displayName` to be wrapped instead of the component given
 * in the `component` argument.
 */
export const wrapDisplayName =
  <Component extends AnyComponent>(
    component: Component,
    source: AnyComponent = component,
  ) =>
  (wrapper: string): Component =>
    pipe(
      [`${wrapper}(`, ')'],
      String.surround,
      modDisplayName(component, source),
    )

/** Build a `displayName` from the keys of the given props. */
export const displayNameFor: (props: object) => string = flow(
  Record.keys,
  Array.map(String.capitalize),
  Array.join(''),
)
