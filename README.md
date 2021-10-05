# react-use-confrim

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-use-confrim.svg)](https://www.npmjs.com/package/react-use-confrim) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-confrim
```

## Usage

```tsx
import { ConfirmProvider } from 'react-use-confrim';
// You can check how to implement you own component here:
// https://github.com/ndeviant/react-use-confirm/blob/master/src/PoorConfirm.jsx
import YourCustomConfirmComponent from './YourCustomConfirmComponent';

function App() {
  return (
    <ConfirmProvider
      ConfirmComponent={YourCustomConfirmComponent}
      anyDefaultProp="couldBeRewrited"
      byOpenConfirmFunction
      variant="success"
    >
      {children}
    </ConfirmProvider>
)

```

```tsx
import React from 'react'

import { useConfirm } from 'react-use-confrim';

function Example {
  const { openConfirm, closeConfirm } = useConfirm();

  return (
    <button onClick={async () => {
        await openConfirm({
          title: 'Are you sure?',
          actions: <button onClick={closeConfirm}>Ok</button>
        });

        alert('I will be called only after closing of confirm!')
      }}
    >
      Open confirm
    </button>)
}
```

## License

MIT © [ndeviant](https://github.com/ndeviant)
