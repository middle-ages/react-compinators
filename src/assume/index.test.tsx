import {render} from '@testing-library/react'
import {assume} from 'react-compinators'

interface LabelProps {
  text: string
  color: 'red' | 'yellow' | 'green'
}

const Label = ({text, color: background}: LabelProps) => (
  <div style={{background}}>{text}</div>
)

const YellowLabel = assume(Label)({color: 'yellow'})

const App = () => (
  <div>
    <YellowLabel text="Hello World!" />
  </div>
)

const iut = () => render(<App />).getByText('Hello World!')

describe('assume', () => {
  test('readme example', () => {
    expect(iut()).toHaveStyle({background: 'yellow'})
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
