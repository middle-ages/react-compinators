import {type FC} from 'react'
import {assumeProps} from '../assume.js'
import {cloneComponent} from '../util/react.js'
import type {VariantDefs, VariantFc, VariantMap} from './types.js'

/**
 * Build and inject variants into a component.
 * @typeParam Props - Props type for base component with no props fixed.
 * @param component - Base component to inject variants into.
 */
export const withVariants =
  <const Props extends object>(component: FC<Props>) =>
  <
    const Names extends readonly string[],
    const Defs extends VariantDefs<Names, Props>,
  >(
    defs: Defs,
  ): VariantFc<Props, Defs> =>
    Object.assign(
      ('default' in defs
        ? assumeProps(component)(defs.default as Partial<Props>)
        : cloneComponent(component)) as VariantFc<Props, Defs>,
      buildMap(component, defs),
    )

const buildMap = <
  Props extends object,
  Names extends readonly string[],
  Defs extends VariantDefs<Names, Props>,
>(
  component: FC<Props>,
  defs: Defs,
): VariantMap<Props, Defs> => {
  const names = filterDefault(defs) as Names
  const variantMap = {} as VariantMap<Props, Defs>
  for (const stringName of names) {
    const name = stringName as keyof Defs
    variantMap[name] = ownProps =>
      component({...(ownProps as Props), ...defs[name]})
  }
  return {...variantMap, variantNames: names}
}

const filterDefault = <
  Props extends object,
  Defs extends VariantDefs<readonly string[], Props>,
>(
  defs: Defs,
) =>
  Object.keys(defs).filter(key => key !== 'default') as readonly (keyof Defs)[]
