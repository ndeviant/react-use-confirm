import React, { useState } from 'react'

import { useConfirm } from 'react-use-confrim'
import 'react-use-confrim/dist/index.css'

const App = () => {
  const { openConfirm } = useConfirm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <button onClick={async () => {
        setIsSubmitting(true);

        await openConfirm();

        setIsSubmitting(false);
      }}>
        {isSubmitting ? 'Waiting for decision' : 'Open confirm'}
      </button>
    </>
  )
}

export default App
