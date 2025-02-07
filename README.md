# react-compinators

Functional utilities for composing React components: `compinators = Component Combinators`.

## Synopsis

## Quick Start

```sh
> pnpm add react-compinators
```

In your component:

```tsx
import {} from 'react-compinators'
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

Using the `assume` combinator from this library, we have lighter alternative that avoids JSX:

```tsx
import {assume} from 'react-compinators'
import type {FC} from 'react'
// Note correct computed type for YellowLabel props.
const YellowLabel: FC<{text: string}> = assume(Label, {color: 'yellow'})
// Using:
<YellowLabel text='Hello World!' />
```

The result is exactly the same. The style of HOCs you will find here is
supported by [React Dev Tools](https://react.dev/learn/react-developer-tools)
so the debug experience of the `<YellowLabel>` should similar, except it will
appear under the name `<Yellow(Label)>`.
