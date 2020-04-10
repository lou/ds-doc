import React from "react"
import { processor } from "../utils/remark-iframe"

export default ({ source }: { source: string }) => {
  return <>{processor.processSync(source).result}</>
}
