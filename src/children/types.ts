import type {ReactNode} from 'react'

export type ChildrenTransform = (
  children: ReactNode | undefined,
) => ReactNode | undefined
