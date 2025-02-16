# λ⚛ React Compinators

A tiny library of functional utilities for composing React components:
`compinators = Component Combinators`.

## Synopsis

Create _three_ new components by partially applying the `<Label>` component
`color` prop, one for each member of the `COLORS` union:

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

You can then import any of the exported functions from the package
`react-compinators`. For example to import the `assume` function in your
component:

```tsx
import {assume} from 'react-compinators'
```

## Why?

React offers
[_Far More Than One Way_](https://wiki.c2.com/?ThereIsMoreThanOneWayToDoIt)
to compose and repurpose components. For example, you can fiddle with their
props and wrap them in various ways. Whatever you do, eventually you will end up
with a _new_ component. The functions here provide a lighter alternative, via
functions that React calls Higher Order Components (HOCs).

Consider a colored `<Label>` component with props of type:

```ts
interface LabelProps {
  text: string
  color: 'red' | 'yellow' | 'green'
}
```

If we find ten _yellow_ labels in our code, we could create a _new_
`<YellowLabel>` component, where the color is fixed on `yellow`:

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

The result is exactly the same. The style of HOCs you will find here is
supported by [React Dev Tools](https://react.dev/learn/react-developer-tools)
so the debug experience of the `<YellowLabel>` should similar, except it will
appear under the name `<Yellow(Label)>`.

These types of functions can be helpful in all kinds of situations:

1. [Cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern).
   For example adding authentication guards to components from different parts of
   an application.
2. When _more components but fewer props_ is preferable to
   _fewer components but more props_. For example, when writing components
   for a design system driven library, it is common to create a highly
   configurable component, for example a `<Button>`, and then derive various
   _variants_ from it, for example: `<PrimaryButton>` or `<SecondaryButton>`.
   Functions like `withVariants` reduces boilerplate and clarifies intent for
   such tasks.
3. The functions here are all well known higher-order functions, for example
   `curry`, that have been specialized for React components. This helps you take
   pieces of components out of JSX and into your regular functional programming
   pipelines. When a simple function would suffice, these combinators help your
   stay in a single “world”, and leave the JSX handing the pure UI concerns.
   Just like a `curry` combinator for _functions_ is useful enough to get a
   name, even though you could manually curry any function, so too for
   `assumeProps`.

## The Combinators

1. [`assumeProp`](https://middle-ages.github.io/react-compinators-docs/docs/functions/assumeProp.html)
2. [`assumeProps`](https://middle-ages.github.io/react-compinators-docs/docs/functions/assumeProps.html)
3. [`mapProp`](https://middle-ages.github.io/react-compinators-docs/docs/functions/mapProp.html)
4. [`mapProps`](https://middle-ages.github.io/react-compinators-docs/docs/functions/mapProps.html)
5. [`modProp`](https://middle-ages.github.io/react-compinators-docs/docs/functions/modProp.html)
6. [`omitProps`](https://middle-ages.github.io/react-compinators-docs/docs/functions/omitProps.html)
7. [`renameProp`](https://middle-ages.github.io/react-compinators-docs/docs/functions/renameProp.html)
8. [`renameProps`](https://middle-ages.github.io/react-compinators-docs/docs/functions/renameProps.html)
9. [`unfoldProp`](https://middle-ages.github.io/react-compinators-docs/docs/functions/unfoldProp.html)
10. [`withVariants`](https://middle-ages.github.io/react-compinators-docs/docs/functions/withVariants.html)

## Roadmap

1. Guards and branches
2. Layout and children
3. Debug and pointcuts

## See Also

1. [Tutorial](https://middle-ages.github.io/react-compinators-docs/iframe.html?viewMode=docs&id=tutorial--docs)
2. [API Reference](https://middle-ages.github.io/react-compinators-docs/docs)
3. [recompose](https://www.npmjs.com/package/recompose)
