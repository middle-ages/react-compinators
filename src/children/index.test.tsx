import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {FC, PropsWithChildren} from 'react'
import {prependChildren} from 'react-compinators'

describe('children', () => {
  interface ContainerProps extends PropsWithChildren {
    text: string
  }

  const Container: FC<ContainerProps> = ({text, children}) => (
    <div>
      <div>{text}</div>
      {children}
    </div>
  )

  test('prependChildren', () => {
    const Prepended = pipe(Container, prependChildren('[child-1]', '[child-2]'))
    expect(
      render(<Prepended text="prepend">[child-3]</Prepended>).baseElement
        .firstChild,
    ).toHaveTextContent('prepend[child-1][child-2][child-3]')
  })
})
