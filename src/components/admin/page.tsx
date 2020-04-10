import React, { useRef, useEffect, useCallback, useState } from "react"
import { getToken, githubAuth, graphqlWithAuth } from "../../services/auth"
import { RouteComponentProps } from "@reach/router"
import { branch, owner, repo } from "../../config.json"
import { Frontmatter } from "../../utils/frontmatter"
import Editor from "./editor"
import Markdown from "../markdown"

export default ({ filePath }: RouteComponentProps & { filePath?: string }) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const [preview, setPreview] = useState(false)
  const [body, setBody] = useState<string>()

  const fetchPage = useCallback(async () => {
    const expression = `${branch}:${filePath}`
    // @ts-ignore
    const { repository } = await graphqlWithAuth(
      `
        query GetFileQuery($name: String!, $owner: String!, $expression: String!) {
          repository(name: $name, owner: $owner) {
            page: object(expression: $expression) {
              oid
              ... on Blob {
                text
              }
            }
          }
        }
      `,
      { owner, name: repo, expression }
    )
    const { body } = Frontmatter.parse(repository.page.text)
    setBody(body)
  }, [filePath])

  useEffect(() => {
    fetchPage()
  }, [filePath])

  const handlePreview = () => {
    setPreview(!preview)
  }

  return (
    <div ref={pageRef}>
      {getToken() ? (
        <div>
          <button onClick={handlePreview}>
            {preview ? "Edit" : "Preview"}
          </button>
          {preview && body && <Markdown source={body} />}
          {!preview && body && <Editor text={body} />}
        </div>
      ) : (
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            githubAuth()
          }}
        >
          <button>Sign in</button>
        </form>
      )}
    </div>
  )
}
