import type {FC} from 'react'

/**
 * Clones a component including its fields, for example `displayName` or
 * variant components in expando fields.
 */
export const cloneComponent = <BaseProps extends object, Source>(
  source: Source & FC<BaseProps>,
  displayName?: string,
): Source => {
  const Clone = <Props extends BaseProps>(props: Props) => source(props)
  Object.assign(Clone, source, {displayName})
  return Clone as Source
}

/**
 * A function that modifies a component of props that extend
 * `BaseProps` without changing its type.
 */
export interface FcEndoOf<BaseProps extends object> {
  <Props extends BaseProps>(component: FC<Props>): FC<Props>
}

export type AnyComponent = FC<any>
