import { useState, useLayoutEffect } from "react"
import { useDebouncedCallback } from "./useDebouncedCallback"

export const useScrollTop = (
  ref: React.RefObject<HTMLElement> | null,
  prevScrollTop: number
) => {
  const [scrollTop, setScrollTop] = useState(prevScrollTop || 0)

  const debouncedScrollTop = useDebouncedCallback(
    (e: React.UIEvent<HTMLElement>) => {
      setScrollTop((e.target as HTMLElement).scrollTop)
    },
    40
  )

  useLayoutEffect(() => {
    if (ref?.current) {
      if (prevScrollTop) ref.current.scrollTo(0, prevScrollTop)
      ref.current.addEventListener("scroll", debouncedScrollTop)
    }
    return () => {
      if (ref?.current)
        ref.current.removeEventListener("scroll", debouncedScrollTop)
    }
  }, [ref])

  return scrollTop
}
