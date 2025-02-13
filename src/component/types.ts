import type {TypeLambda} from 'effect/HKT'
import type {FC, ReactNode} from 'react'

export interface FcTypeLambda extends TypeLambda {
  readonly type: SyncFC<this['Target']>
}

export interface ComponentTransform<
  FromProps extends object,
  ToProps extends object,
> {
  (component: FC<FromProps>): FC<ToProps>
}

export type AnyComponent = FC<any>

/** Just like `React.FC` except cannot be a Promise. */
export type SyncFC<Props> = (props: Props) => ReactNode
