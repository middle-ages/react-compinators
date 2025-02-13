import {Array, pipe, Record} from 'effect'
import {constant, flow} from 'effect/Function'
import type {FC} from 'react'
import {type AnyComponent} from './component.ts'
import {String} from './util.ts'

/** Return `displayName` of a React component or `Anonymous` if none found. */
export const getDisplayName = (source: FC): string =>
  pipe(source.displayName ?? source.name, String.replaceEmpty('Anonymous'))

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
    component.displayName = pipe(source, getDisplayName, f)
    return component
  }

/** Returns given component with `displayName` set to the given string. */
export const setDisplayName = <Component extends AnyComponent>(
  component: Component,
  displayName: string,
): Component => pipe(displayName, constant, modDisplayName(component))

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
  (wrapper: string): Component => {
    return pipe(
      [`${wrapper}(`, ')'],
      String.surround,
      modDisplayName(component, source),
    )
  }

/** Copy `displayName` from one component to another. */
export const copyDisplayName = <Component extends AnyComponent>(
  component: Component,
  source: AnyComponent,
): Component =>
  pipe(source, getDisplayName, constant, modDisplayName(component))

/** Build a `displayName` from the keys of the given props. */
export const displayNameFor: (props: object) => string = flow(
  Record.keys,
  Array.map(String.capitalize),
  Array.join(''),
)
