import {render} from '@testing-library/react'
import {FC, type ReactNode} from 'react'
import {withVariants} from 'react-compinators'

interface BaseProps {
  foo: string
  bar?: number
  baz: boolean
}

// Our base component simply prints JSON of its props. We will build three
// variants of this component, one of which is the main variant.
//
// Rendering our props in JSON lets us test props by looking at the rendered
// component.
export const Base: FC<BaseProps> = props => (
  <>
    {
      // Serialize props for comparison
      JSON.stringify(props)
    }
  </>
)

// Build three variants:
// 1. Target - fixes bar prop, this is the base component with one prop fixed.
// 2. Target.Foo - fixes foo prop.
// 3. Target.BarBaz - fixes bar and baz props.
const Target = withVariants(Base)({
  // Our variant spec: definitions of props fixed by each variant.
  Foo: {foo: 'bam'},
  BarBaz: {bar: 123, baz: true},

  // Definition of main variant, in our test named “Target”
  default: {bar: 42},
})

const iut = <Props extends object>(actual: ReactNode) =>
  JSON.parse(
    render(actual).baseElement.firstElementChild?.textContent ?? '{}',
  ) as Props

describe('withVariants', () => {
  test('main variant', () => {
    expect(iut(<Target foo="quux" baz />)).toEqual({
      foo: 'quux',
      baz: true,
      bar: 42,
    })
  })

  test('Foo variant', () => {
    expect(iut(<Target.Foo bar={999} baz={false} />)).toEqual({
      foo: 'bam',
      baz: false,
      bar: 999,
    })
  })

  test('BarBaz variant', () => {
    expect(iut(<Target.BarBaz foo="barBaz" />)).toEqual({
      foo: 'barBaz',
      baz: true,
      bar: 123,
    })
  })
})
