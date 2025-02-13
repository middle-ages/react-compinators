import {DummyButton} from '#test'
import {action} from '@storybook/addon-actions'
import type {Meta, StoryObj} from '@storybook/react'
import {pipe} from 'effect'
import type {ComponentProps, FC} from 'react'
import {mapProps} from 'react-compinators'

type NumericProps = Omit<ComponentProps<typeof DummyButton>, 'text'> & {
  number: number
}

const NumericButton: FC<NumericProps> = pipe(
  DummyButton,
  mapProps(({number, ...rest}) => ({
    text: number.toString(),
    ...rest,
  })),
)

type Story = StoryObj<typeof NumericButton>

const meta = {
  component: NumericButton,
  tags: ['!autodocs'],
} satisfies Meta<typeof NumericButton>

export const Story: Story = {
  name: 'map',
  args: {
    number: 42,
    color: 'yellow',
    onClick: action('ButtonClick'),
  },
}

export default meta
