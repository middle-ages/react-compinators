import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {FC, JSX} from 'react'
import {mapProps, modProp} from 'react-compinators'

interface LabelProps {
  text: string
  color: string
}

const Label = ({text, color}: LabelProps) => <div style={{color}}>{text}</div>

const iut = (element: JSX.Element, expected: string) =>
  render(<div>{element}</div>).getByText(expected)

describe('modProp', () => {
  const QuestionLabel = modProp(Label, 'text')(s => `${s}?`)

  test('basic', () => {
    expect(
      iut(<QuestionLabel color="blue" text="Hello World" />, 'Hello World?'),
    ).toHaveStyle({
      color: 'blue',
    })
  })

  test('displayName', () => {
    expect(QuestionLabel.displayName).toBe('modPropText(Label)')
  })
})

describe('mapProps', () => {
  interface NumericProps {
    number: number
    color: string
  }

  const NumericLabel: FC<NumericProps> = pipe(
    Label,
    mapProps(
      ({number, ...rest}) => ({
        text: number.toString(),
        ...rest,
      }),
      'Numeric',
    ),
  )

  test('basic', () => {
    expect(iut(<NumericLabel color="orange" number={42} />, '42')).toHaveStyle({
      color: 'orange',
    })
  })

  test('displayName', () => {
    expect(NumericLabel.displayName).toBe('Numeric(Label)')
  })
})
