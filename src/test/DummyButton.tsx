import {FC} from 'react'

/**
 * Props interface.
 */
export interface Props {
  /**
   * Should be shown in storybook.
   */
  text: string
  color: 'red' | 'yellow' | 'green'
  /**
   * Should be shown in storybook.
   */
  onClick: () => void
}

/**
 * A dummy button useful in tests and stories.
 * @param props Component props
 */
export const DummyButton: FC<Props> = ({text, color: background, onClick}) => {
  return (
    <button {...{onClick}} style={{background}}>
      {text}
    </button>
  )
}
