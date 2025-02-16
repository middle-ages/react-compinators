import {render} from '@testing-library/react'
import type {JSX} from 'react'
import {assumeProp, assumeProps, unfoldProp} from 'react-compinators'

const COLORS = ['green', 'yellow', 'red'] as const

type Color = (typeof COLORS)[number]

interface LabelProps {
  text: string
  color: Color
}

const Label = ({text, color: background}: LabelProps) => (
  <div style={{background}}>{text}</div>
)

const iut = (element: JSX.Element) => render(element).getByText('Hello World!')

describe('assumeProps', () => {
  const YellowLabel = assumeProps(Label)({color: 'yellow'})

  test('readme example', () => {
    expect(iut(<YellowLabel text="Hello World!" />)).toHaveStyle({
      background: 'yellow',
    })
  })

  describe('display name', () => {
    test('default', () => {
      expect(YellowLabel.displayName).toBe('assumePropsColor(Label)')
    })

    test('with suffix', () => {
      expect(
        assumeProps<LabelProps>(Label)({color: 'yellow'}, 'Yellow').displayName,
      ).toBe('Yellow(Label)')
    })
  })
})

test('assumeProp', () => {
  const YellowLabel = assumeProp<LabelProps, 'color'>(Label, 'color')('yellow')
  expect(iut(<YellowLabel text="Hello World!" />)).toHaveStyle({
    background: 'yellow',
  })
})

describe('unfoldProp', () => {
  const components = unfoldProp(Label, 'color')(COLORS)
  const [GreenLabel, YellowLabel, RedLabel] = components

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
