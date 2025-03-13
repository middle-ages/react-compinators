import * as CT from '@effect/typeclass/Contravariant'
import {Function, HKT} from 'effect'
import type {FC, ReactNode} from 'react'
import {mapProps} from './map.js'

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

export interface FcTypeLambda extends HKT.TypeLambda {
  readonly type: SyncFC<this['Target']>
}

const contramap: CT.Contravariant<FcTypeLambda>['contramap'] = Function.dual(
  2,
  <A extends object, B extends object>(Base: FC<A>, f: (b: B) => A): FC<B> =>
    mapProps<B, A>(f, 'contramap')(Base),
)

/**
 * [Contravariant](https://github.com/Effect-TS/effect/blob/main/packages/typeclass/src/Contravariant.ts)
 * instance for React components using {@link mapProps}.
 */
export const Contravariant: CT.Contravariant<FcTypeLambda> = {
  contramap,
  imap: CT.imap<FcTypeLambda>(contramap),
}
