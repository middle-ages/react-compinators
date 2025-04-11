import {DummyButton} from '../test.js'
import {action} from 'storybook/actions'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {assumeProps} from 'react-compinators'

const YellowButton = assumeProps(DummyButton)({color: 'yellow'}, 'Yellow')

type Story = StoryObj<typeof YellowButton>

const meta = {
  component: YellowButton,
  tags: ['!autodocs'],
} satisfies Meta<typeof YellowButton>

export const Story: Story = {
  name: 'assume',
  args: {
    text: 'Button',
    onClick: action('ButtonClick'),
  },
}

export default meta
