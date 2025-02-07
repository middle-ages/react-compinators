import {action} from '@storybook/addon-actions'
import type {Meta, StoryObj} from '@storybook/react'
import {DummyButton} from './DummyButton.tsx'

type Story = StoryObj<typeof DummyButton>

const meta = {
  component: DummyButton,
} satisfies Meta<typeof DummyButton>

export const Story: Story = {
  args: {
    text: 'Button',
    color: 'green',
    onClick: action('ButtonClick'),
  },
}

export default meta
