import React, {
  useCallback,
  useState,
  useContext,
  createContext,
  memo,
  useRef
} from 'react'

// @ts-ignore
import PoorConfirm from './PoorConfirm.jsx'

interface ProviderProps {
  children: React.ReactNode
  ConfirmComponent?: React.ComponentType<any>
}

type HookProps = {
  open?: boolean
  ConfirmComponent?: React.ComponentType<any>
  [key: string]: any
}

interface ConfirmContextValue {
  options: HookProps
  openConfirm: Function
  closeConfirm: Function
}

/**
 * Confirm context's
 */
export const ConfirmContext = createContext<ConfirmContextValue>({
  options: {},
  openConfirm: () => null,
  closeConfirm: () => null
})

export const ConfirmProvider = memo(function ConfirmProvider(
  props: ProviderProps
) {
  const {
    children,
    ConfirmComponent: ConfirmComponentProp,
    ...providerDefaultOptions
  } = props

  const value = useConfirmInternal(providerDefaultOptions)

  const ConfirmComponent =
    value.options.ConfirmComponent || ConfirmComponentProp || PoorConfirm

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmComponent {...value} />
    </ConfirmContext.Provider>
  )
})

/**
 * Intenal implementation of needed methods
 *
 * @param {HookProps} defaultOptions
 * @returns {ConfirmContextValue}
 */
const useConfirmInternal = (defaultOptions: HookProps): ConfirmContextValue => {
  const [options, setOptions] = useState({
    ...defaultOptions,
    open: false
  })

  /**
   * Promise hack, to be able to call openConfirm async
   * and resolve, only on close.
   */
  const promiseResolveRef = useRef<null | Function>(null)

  const closeConfirm = useCallback((): void => {
    setOptions({ ...defaultOptions, open: false })

    promiseResolveRef.current?.()
  }, [defaultOptions])

  const openConfirm = useCallback(
    async (arg): Promise<void> => {
      const isArgFunc = typeof arg === 'function'
      const optionsFromCall = isArgFunc ? arg(closeConfirm) || {} : arg

      setOptions({
        ...defaultOptions,
        ...optionsFromCall,
        open: true
      })

      // Resolve previous promise, before creating new one
      promiseResolveRef.current?.()
      const promise = new Promise((resolve) => {
        promiseResolveRef.current = resolve
      })

      // Wait until closeConfirm is called
      await promise
    },
    [defaultOptions, closeConfirm]
  )

  return {
    options,
    openConfirm,
    closeConfirm
  }
}

/**
 * Access to public methods
 *
 * @returns {ConfirmContextValue}
 */
export const useConfirm = (): ConfirmContextValue => {
  return useContext(ConfirmContext)
}
