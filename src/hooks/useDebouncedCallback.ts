import { useCallback } from "react"
import { debounce } from "lodash-es"

export const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number
) => useCallback(debounce(callback, delay), [])
