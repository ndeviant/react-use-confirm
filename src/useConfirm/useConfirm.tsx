import React, {
  useCallback,
  useState,
  useContext,
  createContext,
  memo,
  useRef
} from 'react'

interface ProviderProps {
  children: React.ReactNode
  ConfirmComponent: React.ComponentType<any>
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
    value.options.ConfirmComponent || ConfirmComponentProp

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
  const promiseFunctionsRef = useRef<null | {
    resolve: Function
    reject: Function
  }>(null)

  /**
   * Result comes from call, and passed to
   * return value of openConfirm
   */
  const closeConfirm = useCallback(
    (result: any): void => {
      setOptions((o) => ({ ...o, open: false }))

      promiseFunctionsRef.current?.resolve?.(result)
    },
    [defaultOptions]
  )

  const openConfirm = useCallback(
    async (arg): Promise<any> => {
      const isArgFunc = typeof arg === 'function'
      const optionsFromCall = isArgFunc ? arg(closeConfirm) || {} : arg

      setOptions({
        ...defaultOptions,
        ...optionsFromCall,
        open: true
      })

      // Resolve previous promise, before creating new one
      promiseFunctionsRef.current?.resolve?.()
      const promise = new Promise((resolve, reject) => {
        promiseFunctionsRef.current = { resolve, reject }
      })

      // Wait until closeConfirm is called
      return await promise
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
