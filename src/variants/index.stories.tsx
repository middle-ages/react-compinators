import {DummyButton} from '../test.js'
import {action} from 'storybook/actions'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {withVariants} from 'react-compinators'

const Button = withVariants(DummyButton)({
  default: {text: 'main'},
  Red: {color: 'red'},
  Yellow: {color: 'yellow'},
  Green: {color: 'green'},
})

const Component = ({
  mainOnClick,
  redOnClick,
  yellowOnClick,
  greenOnClick,
}: Record<
  'mainOnClick' | 'redOnClick' | 'yellowOnClick' | 'greenOnClick',
  () => void
>) => (
  <>
    <Button color="green" onClick={mainOnClick} />
    <Button.Red text="red" onClick={redOnClick} />
    <Button.Yellow text="yellow" onClick={yellowOnClick} />
    <Button.Green text="green" onClick={greenOnClick} />
  </>
)

type Story = StoryObj<typeof Component>

const meta = {
  component: Component,
  tags: ['!autodocs'],
  args: {
    mainOnClick: action('main'),
    redOnClick: action('red'),
    yellowOnClick: action('yellow'),
    greenOnClick: action('green'),
  },
} satisfies Meta<typeof Component>

export const Story: Story = {name: 'variants'}

export default meta
