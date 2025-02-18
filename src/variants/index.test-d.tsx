import type {ComponentProps} from 'react'
import type {VariantFc} from './types.js'

describe('VariantFc type', () => {
  describe('basic', () => {
    interface Props {
      foo: string
      bar: number
      baz: boolean
    }

    describe('no default', () => {
      type Defs = {
        Foo: {foo: 'FOO'}
        Bar: {bar: 42; baz: true}
        Baz: {foo: 'Baz'; bar: 123; baz: true}
      }
      type Component = VariantFc<Props, Defs>

      type FooProps = ComponentProps<Component['Foo']>
      type BarProps = ComponentProps<Component['Bar']>
      type BazProps = ComponentProps<Component['Baz']>

      test('Foo', () => {
        expectTypeOf<FooProps>().toEqualTypeOf<{
          bar: number
          baz: boolean
        }>()
      })

      test('Bar', () => {
        expectTypeOf<BarProps>().toEqualTypeOf<{foo: string}>()
      })

      test('Baz', () => {
        expectTypeOf<BazProps>().toEqualTypeOf<{}>()
      })
    })

    describe('with default', () => {
      type Defs = {
        Foo: {foo: 'FOO'}
        Bar: {bar: 42; baz: true}
        Baz: {foo: 'Baz'; bar: 123; baz: true}
        default: {baz: true}
      }
      type Target = VariantFc<Props, Defs>
      type TargetProps = ComponentProps<Target>

      type FooProps = ComponentProps<Target['Foo']>
      type BarProps = ComponentProps<Target['Bar']>
      type BazProps = ComponentProps<Target['Baz']>

      test('Target', () => {
        expectTypeOf<TargetProps>().toEqualTypeOf<{
          foo: string
          bar: number
        }>()
      })

      test('Foo', () => {
        expectTypeOf<FooProps>().toEqualTypeOf<{
          bar: number
          baz: boolean
        }>()
      })

      test('Bar', () => {
        expectTypeOf<BarProps>().toEqualTypeOf<{foo: string}>()
      })

      test('Baz', () => {
        expectTypeOf<BazProps>().toEqualTypeOf<{}>()
      })
    })
  })
})
