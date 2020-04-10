import unified from "unified"
import parse from "remark-parse"
import remark2react from "remark-react"
import Iframe from "../../components/iframe"
import { schema } from "./schema"

function iframe() {
  const Parser = this.Parser

  const blockTokenizer = (eat, value, silent) => {
    const match = value.match(/^!\((http.*)\)/)

    if (!match?.[1]) return

    if (silent) return true

    if (match[0])
      eat(match[0])({
        type: "iframe",
        src: match[1],
      })
  }

  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods
  blockTokenizers.iframes = blockTokenizer
  blockMethods.splice(blockMethods.indexOf("blockquote") + 1, 0, "iframes")
}

export const processor = unified()
  .use(parse)
  .use(iframe)
  .use(remark2react, {
    sanitize: schema,
    remarkReactComponents: {
      iframe: Iframe,
    },
    toHast: {
      handlers: {
        iframe: (h, node) => h(node, "iframe", { src: node.src }),
      },
    },
  })
