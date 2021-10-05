import React, { useState } from 'react'
import { useConfirm } from 'react-use-confrim'

import MuiDialogConfirm from './MuiDialogConfirm'

const App = () => {
  const { openConfirm } = useConfirm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <>
      <button
        onClick={async () => {
          setIsSubmitting(true)

          await openConfirm()

          setIsSubmitting(false)
        }}
      >
        {isSubmitting ? 'Waiting for decision' : 'Open confirm'}
      </button>

      <button
        onClick={async () => {
          setIsSubmitting(true)

          await openConfirm({
            ConfirmComponent: MuiDialogConfirm,
            title: 'This is MUI confirm',
            content: (
              <>
                <p>Wow, so amazing!</p>
              </>
            )
          })

          setIsSubmitting(false)
        }}
      >
        {isSubmitting ? 'Waiting for decision' : 'Open MUI confirm'}
      </button>
    </>
  )
}

export default App
