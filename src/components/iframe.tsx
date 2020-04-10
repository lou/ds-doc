import React, { useEffect, useRef, SyntheticEvent } from "react"

type IframePropsType = {
  src: string
}

const Iframe = ({ src }: IframePropsType) => {
  const el = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    window.addEventListener("message", handleMessage)
  }, [])

  const handleLoad = (e: SyntheticEvent<HTMLIFrameElement, UIEvent>) => {
    if (e.currentTarget?.contentWindow)
      e.currentTarget.contentWindow.postMessage("getDocumentHeight", "*")
  }

  const handleMessage = (e: MessageEvent) => {
    if (el.current && e.data.documentHeight) {
      el.current.style.height = `${e.data.documentHeight}px`
    }
  }

  return <iframe src={src} onLoad={handleLoad} ref={el} />
}

export default Iframe
