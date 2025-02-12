import {render} from '@testing-library/react'
import type {JSX} from 'react'
import {assume, assumeProp, unionVariants} from 'react-compinators'

const COLORS = ['green', 'yellow', 'red'] as const

type Color = (typeof COLORS)[number]

interface LabelProps {
  text: string
  color: Color
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

describe('unionVariants', () => {
  const [GreenLabel, YellowLabel, RedLabel] = unionVariants(
    Label,
    'color',
  )(COLORS)

  test('green', () => {
    expect(iut(<GreenLabel text="Hello World!" />)).toHaveStyle({
      background: 'green',
    })
  })

  test('yellow', () => {
    expect(iut(<YellowLabel text="Hello World!" />)).toHaveStyle({
      background: 'yellow',
    })
  })

  test('red', () => {
    expect(iut(<RedLabel text="Hello World!" />)).toHaveStyle({
      background: 'red',
    })
  })
})
