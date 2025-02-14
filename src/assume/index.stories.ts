import {DummyButton} from '#test'
import {action} from '@storybook/addon-actions'
import type {Meta, StoryObj} from '@storybook/react'
import {assumeProps} from 'react-compinators'

const YellowButton = assumeProps(DummyButton)({color: 'yellow'}, 'Yellow')

type Story = StoryObj<typeof YellowButton>

const meta = {
  component: YellowButton,
  tags: ['!autodocs'],
} satisfies Meta<typeof YellowButton>

export const Story: Story = {
  name: 'assumeProps',
  args: {
    text: 'Button',
    onClick: action('ButtonClick'),
  },
}

export default meta
