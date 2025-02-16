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
