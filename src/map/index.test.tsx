import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {FC, JSX} from 'react'
import {mapProp, mapProps, modProp, renameProp} from 'react-compinators'

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

{
  interface NumericProps {
    number: number
    color: string
  }

  describe('mapProps', () => {
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
      expect(
        iut(<NumericLabel color="orange" number={42} />, '42'),
      ).toHaveStyle({
        color: 'orange',
      })
    })

    test('displayName', () => {
      expect(NumericLabel.displayName).toBe('Numeric(Label)')
    })
  })

  describe('mapProp', () => {
    const NumericLabel = pipe(
      Label,
      mapProp((n: number) => n.toString(), 'text'),
    )

    test('basic', () => {
      expect(iut(<NumericLabel color="orange" text={42} />, '42')).toHaveStyle({
        color: 'orange',
      })
    })

    test('displayName', () => {
      expect(NumericLabel.displayName).toBe('mapPropText(Label)')
    })
  })

  describe('renameProp', () => {
    const Component = pipe(Label, renameProp('textColor', 'color'))

    test('basic', () => {
      expect(
        iut(<Component textColor="red" text="Hello World!" />, 'Hello World!'),
      ).toHaveStyle({
        color: 'red',
      })
    })

    test('displayName', () => {
      expect(Component.displayName).toBe('renamePropTextColorColor(Label)')
    })
  })
}
