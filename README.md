# λ⚛ React Compinators

A tiny library of functional utilities for composing React components: `compinators = Component Combinators`.

- [λ⚛ React Compinators](#λ-react-compinators)
  - [Synopsis](#synopsis)
  - [Quick Start](#quick-start)
  - [Why?](#why)
  - [Features](#features)
    - [The Combinators](#the-combinators)
  - [Roadmap](#roadmap)
  - [See Also](#see-also)

## Synopsis

Create _three_ new components by partially applying the `<Label>` component `color` prop, one for each member of the `COLORS` union:

```tsx
import {String} from 'effect'
import {unionVariants} from 'react-compinators'

const [ GreenLabel, YellowLabel, RedLabel ] = unfoldProp(
  Label,             // Component that we will wrap three times.
  'color',           // Prop that we will partially apply.
)(
  COLORS,            // Array of union members.
  String.capitalize, // Optional function will be used to compute variant
                     // displayName from its `color` prop.
) 
```

See [the tutorial](https://middle-ages.github.io/react-compinators-docs/iframe.html?viewMode=docs&id=tutorial--docs) for more info.

## Quick Start

```sh
> pnpm add react-compinators
```

You can then import any of the exported functions from the package `react-compinators`. For example to import the `assume` function in your component:

```tsx
import {assume} from 'react-compinators'
```

## Why?

React offers [_Far More Than One Way_](https://wiki.c2.com/?ThereIsMoreThanOneWayToDoIt) to compose and repurpose components. For example, you can fiddle with their props and wrap them in various ways. Whatever you do, eventually you will end up with a _new_ component.

The functions here provide a lighter alternative, via functions that React calls Higher Order Components (HOCs).

Consider a colored `<Label>` component with props of type:

```ts
interface LabelProps {
  text: string
  color: 'red' | 'yellow' | 'green'
}
```

If we find ten _yellow_ labels in our code, we could create a _new_ `<YellowLabel>` component, where the color is fixed on `yellow`:

```tsx
const YellowLabel = ({text: string}) => (
  <Label {...{text}} color='yellow' />
)
// Using:
<YellowLabel text='Hello World!' />
```

Using the `assumeProp` combinator from this library, we have lighter alternative that avoids JSX:

```tsx
import {assumeProp} from 'react-compinators'
import type {FC} from 'react'
// Note correct computed type for YellowLabel props.
const YellowLabel: FC<{text: string}> = assumeProp(Label, {color: 'yellow'})
// Using:
<YellowLabel text='Hello World!' />
```

The result is exactly the same. The style of HOCs you will find here is supported by [React Dev Tools](https://react.dev/learn/react-developer-tools) so the debug experience of the `<YellowLabel>` should similar, except it will appear under the name `<Yellow(Label)>`.

I have found these functions helpful in all kinds of situations:

1. [Cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern).
   - For example when different parts of an application require functionality
     such as:
     1. Authentication guards.
     2. Memoizing component props in local storage, lest they be lost on browser refresh.
     3. Logging
   - But you would rather not touch the source code of components involved.
2. When _more components but fewer props_ is preferable to _fewer components but more props_.
     - For example, when writing components for a design-system driven library, it is common to create a highly configurable component, for example a `<Button>`, and then derive various _variants_ from it, for example: `<PrimaryButton>` or `<SecondaryButton>`.
       - These variants are often just different combinations of values for the props of the `<Button>`.
       - Functions like `withVariants` reduce boilerplate and clarify intent for such tasks.
     - Describing changes to components as _plain old data_ lets you manipulate definitions as _data_, for example to customize a _color_, or to add a debug panel overlay to all `children` of a component.
3. The functions here are all well-known higher-order functions, for example `curry`, that have been specialized for React components.
   - This helps you take pieces of components out of JSX, and into your regular functional programming pipelines. When a simple function would suffice, these combinators help your stay in a single “world”, and leave the JSX more focused on its UI concerns.
   - Just as a `curry` combinator for _functions_ is useful enough to deserve its own name, so too for `assumeProps` when dealing with React components.

## Features

A [Contravariant](https://github.com/Effect-TS/effect/blob/main/packages/typeclass/src/Contravariant.ts) instance for [Effect](https://effect.website/) and a bunch of combinators.

If you squint hard you will see they are all just specializations of `mapProps`.

### The Combinators

1. **Currying**
    1. [assumeProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/assumeProp.html) ([src](./src/assume.tsx#L47))
    1. [unfoldProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/unfoldProp.html) ([src](./src/assume.tsx#L11))
    1. [assumeProps](https://middle-ages.github.io/react-compinators-docs/docs/functions/assumeProps.html) ([src](./src/assume.tsx#L76))
1. **Children**
    1. [modChildren](https://middle-ages.github.io/react-compinators-docs/docs/functions/modChildren.html) [src](./src/children.ts#L14))
    1. [appendChildren](https://middle-ages.github.io/react-compinators-docs/docs/functions/appendChildren.html) ([src](./src/children.ts#L24))
    1. [prependChildren](https://middle-ages.github.io/react-compinators-docs/docs/functions/prependChildren.html) ([src](./src/children.ts#L28))
1. **Mapping**
    1. [mapProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/mapProp.html) ([src](./src/map.tsx#L196))
    1. [mapProps](https://middle-ages.github.io/react-compinators-docs/docs/functions/mapProps.html) ([src](./src/map.tsx#L174))
    1. [modProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/modProp.html) ([src](./src/map.tsx#L224))
    1. [modOptionalProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/modOptionalProps.html) ([src](./src/map.tsx#L245))
    1. [withDefault](https://middle-ages.github.io/react-compinators-docs/docs/functions/withDefault.html) ([src](./src/map.tsx#L45))
    1. [requireProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/requireProp.html) ([src](./src/map.tsx#L26))
    1. [renameProps](https://middle-ages.github.io/react-compinators-docs/docs/functions/renameProps.html) ([src](./src/map.tsx#L64))
    1. [renameProp](https://middle-ages.github.io/react-compinators-docs/docs/functions/renameProp.html) ([src](./src/map.tsx#L102))
    1. [omitProps](https://middle-ages.github.io/react-compinators-docs/docs/functions/omitProps.html) ([src](./src/map.tsx#L122))
1. **Styles**
    1. [modStyle](https://middle-ages.github.io/react-compinators-docs/docs/functions/modStyle.html) ([src](./src/style.tsx#L10))
    1. [withStyle](https://middle-ages.github.io/react-compinators-docs/docs/functions/withStyle.html) ([src](./src/style.tsx#L16))
    1. [withDefaultStyle](https://middle-ages.github.io/react-compinators-docs/docs/functions/withDefaultStyle.html) ([src](./src/style.tsx#L23))
    1. [modCssVar](https://middle-ages.github.io/react-compinators-docs/docs/functions/modCssVar.html) ([src](./src/style.tsx#L31))
1. **Variants**
    1. [withVariants](https://middle-ages.github.io/react-compinators-docs/docs/functions/withVariants.html) ([src](./src/variants/index.ts#L11))

## Roadmap

1. Guards and branches
2. Layout and children
3. Debug and pointcuts

## See Also

1. [Tutorial](https://middle-ages.github.io/react-compinators-docs/iframe.html?viewMode=docs&id=tutorial--docs)
2. [API Reference](https://middle-ages.github.io/react-compinators-docs/docs)
3. [recompose](https://www.npmjs.com/package/recompose)
