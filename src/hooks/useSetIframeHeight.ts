import { useEffect } from "react"

export const useSetIframeHeight = ref => {
  useEffect(() => {
    const iframes = ref.current.querySelectorAll(
      "iframe"
    ) as HTMLIFrameElement[]

    const enhancedIframes = [...iframes].map(el => ({
      onLoad: e => {
        e.currentTarget.contentWindow.postMessage("getDocumentHeight", "*")
      },
      onMessage: e => {
        if (e.data.documentHeight)
          el.style.height = `${e.data.documentHeight}px`
      },
      el,
    }))

    enhancedIframes.forEach(enhancedIframe => {
      window.addEventListener("message", enhancedIframe.onMessage)
      enhancedIframe.el.addEventListener("load", enhancedIframe.onLoad)
    })

    return () => {
      enhancedIframes.forEach(enhancedIframe => {
        window.removeEventListener("message", enhancedIframe.onMessage)
        enhancedIframe.el.removeEventListener("load", enhancedIframe.onLoad)
      })
    }
  }, [])
}
