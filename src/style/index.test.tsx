import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {CSSProperties, FC, JSX} from 'react'
import {
  modCssVar,
  modStyle,
  withDefaultStyle,
  withStyle,
} from 'react-compinators'

const iut = (element: JSX.Element, text: string) =>
  render(<div>{element}</div>).getByText(text)

interface LabelProps {
  text: string
  style?: CSSProperties
}

const Label = ({text, style}: LabelProps) => <div {...{style}}>{text}</div>

describe('modStyle', () => {
  const RedLabel: FC<LabelProps> = pipe(
    Label,
    modStyle(style => ({...style, color: 'red'})),
  )

  test('basic', () => {
    expect(
      iut(
        <RedLabel text="red label" style={{background: 'green'}} />,
        'red label',
      ),
    ).toHaveStyle({
      color: 'red',
      background: 'green',
    })
  })

  test('displayName', () => {
    expect(RedLabel.displayName).toBe('modPropStyle(Label)')
  })
})

describe('withStyle', () => {
  const RedLabel: FC<LabelProps> = pipe(Label, withStyle({color: 'red'}))

  test('basic', () => {
    expect(
      iut(<RedLabel text="red label" style={{color: 'green'}} />, 'red label'),
    ).toHaveStyle({
      color: 'red',
    })
  })
})

describe('withDefaultStyle', () => {
  const RedLabel: FC<LabelProps> = pipe(Label, withDefaultStyle({color: 'red'}))

  test('basic', () => {
    expect(
      iut(<RedLabel text="red label" style={{color: 'green'}} />, 'red label'),
    ).toHaveStyle({
      color: 'green',
    })
  })
})

describe('modCssVar', () => {
  const VarLabel: FC<LabelProps> = pipe(
    Label,
    modCssVar('variant', variant =>
      variant === 'primary' ? 'secondary' : 'primary',
    ),
  )

  test('basic', () => {
    expect(
      iut(
        <VarLabel
          text="secondary"
          style={{'--variant': 'primary'} as CSSProperties}
        />,
        'secondary',
      ),
    ).toHaveStyle({'--variant': 'secondary'})
  })

  test('var not present in props', () => {
    expect(
      iut(<VarLabel text="secondary" style={{color: 'green'}} />, 'secondary'),
    ).toHaveStyle({
      color: 'green',
      '--variant': 'primary',
    })
  })

  test('var present but undefined', () => {
    expect(
      iut(
        <VarLabel
          text="secondary"
          style={{'--variant': undefined} as CSSProperties}
        />,
        'secondary',
      ),
    ).toHaveStyle({
      '--variant': 'primary',
    })
  })
})
