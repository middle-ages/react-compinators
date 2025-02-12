import {render} from '@testing-library/react'
import type {JSX} from 'react'
import {assume, assumeProp} from 'react-compinators'

interface LabelProps {
  text: string
  color: 'red' | 'yellow' | 'green'
}

const Label = ({text, color: background}: LabelProps) => (
  <div style={{background}}>{text}</div>
)

const iut = (element: JSX.Element) =>
  render(<div>{element}</div>).getByText('Hello World!')

describe('assume', () => {
  const YellowLabel = assume(Label)({color: 'yellow'})

  test('readme example', () => {
    expect(iut(<YellowLabel text="Hello World!" />)).toHaveStyle({
      background: 'yellow',
    })
  })

  describe('display name', () => {
    test('default', () => {
      expect(YellowLabel.displayName).toBe('assumeColor(Label)')
    })

    test('with suffix', () => {
      expect(
        assume<LabelProps>(Label)({color: 'yellow'}, 'Yellow').displayName,
      ).toBe('Yellow(Label)')
    })
  })
})

test('assumeProp', () => {
  const YellowLabel = assumeProp(Label, 'color')('yellow')
  expect(iut(<YellowLabel text="Hello World!" />)).toHaveStyle({
    background: 'yellow',
  })
})
