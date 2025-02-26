import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {CSSProperties, FC, JSX} from 'react'
import {modStyle, withStyle} from 'react-compinators'

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
  const RedLabel: FC<LabelProps> = pipe(Label, withStyle({color: 'red'}))

  test('basic', () => {
    expect(iut(<RedLabel text="red label" />, 'red label')).toHaveStyle({
      color: 'red',
    })
  })
})
