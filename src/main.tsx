import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

const Demo = () => <div>hello</div>

const root = document.querySelector('#root')

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <Demo />
    </StrictMode>,
  )
}
