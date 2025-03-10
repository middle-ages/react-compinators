import type {FC, ReactNode} from 'react'

/**
 * A function that modifies a component of props that extend
 * `BaseProps` without changing its type.
 */
export interface FcEndoOf<BaseProps extends object> {
  <Props extends BaseProps>(component: FC<Props>): FC<Props>
}

export type AnyComponent = FC<any>

/** Just like `React.FC` except cannot be a Promise. */
export type SyncFC<Props> = (props: Props) => ReactNode
