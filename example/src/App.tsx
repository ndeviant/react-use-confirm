import React, { useState } from 'react'
import { useConfirm } from 'react-use-confirm'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Typography
} from '@material-ui/core'

import MuiDialogConfirm from './MuiDialogConfirm'

const App = () => {
  const { openConfirm } = useConfirm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Container>
      <CssBaseline></CssBaseline>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Button
          variant='outlined'
          onClick={async () => {
            setIsSubmitting(true)

            try {
              await openConfirm()
            } catch (error) {
              console.log(
                'We can catch custom errors from "closeConfirm" if needed.'
              )
              console.log(error.message)
            }

            setIsSubmitting(false)
          }}
        >
          {isSubmitting ? 'Waiting for decision' : 'Open confirm'}
        </Button>

        <Button
          variant='outlined'
          onClick={async () => {
            setIsSubmitting(true)

            await openConfirm((closeConfirm: Function) => ({
              ConfirmComponent: MuiDialogConfirm,
              title: 'This is MUI confirm',
              content: (
                <>
                  <Typography>Wow, so amazing!</Typography>
                </>
              ),
              actions: (
                <>
                  <Button
                    onClick={() => {
                      closeConfirm()
                    }}
                  >
                    No
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      closeConfirm()
                    }}
                  >
                    Yes, indeed
                  </Button>
                </>
              )
            }))

            setIsSubmitting(false)
          }}
        >
          {isSubmitting ? 'Waiting for decision' : 'Open MUI confirm'}
        </Button>
      </Box>
    </Container>
  )
}

export default App
