import {render} from '@testing-library/react'
import {pipe} from 'effect'
import type {FC, JSX} from 'react'
import {
  mapProp,
  mapProps,
  modProp,
  renameProp,
  renameProps,
} from 'react-compinators'

const iut = (element: JSX.Element, expected: string) =>
  render(<div>{element}</div>).getByText(expected)

{
  interface LabelProps {
    text: string
    color: string
  }
  const Label = ({text, color}: LabelProps) => <div style={{color}}>{text}</div>

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

interface BaseProps {
  foo: number
  bar: string
  baz: boolean
}
const Base = ({foo, bar, baz}: BaseProps) => (
  <div>{[foo, bar, baz].map(v => v.toString()).join(':')}</div>
)

describe('renameProps', () => {
  const Target = pipe(Base, renameProps({FOO: 'foo', BAR: 'bar'}))

  test('basic', () => {
    expect(
      iut(<Target FOO={42} BAR="Hello World!" baz />, '42:Hello World!:true'),
    ).toBeInTheDocument()
  })

  test('displayName', () => {
    expect(Target.displayName).toBe('renameProps(Base)')
  })
})
