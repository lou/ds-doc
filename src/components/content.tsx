import React, { useRef } from "react"
import { useSetIframeHeight } from "../hooks/useSetIframeHeight"

export default ({ html }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  useSetIframeHeight(contentRef)
  return <div ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
}
