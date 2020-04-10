import { createTokenAuth } from "@octokit/auth-token"
import { graphql } from "@octokit/graphql"
import { Octokit } from "@octokit/rest"

export const storeToken = (token: string) => {
  localStorage.setItem("token", token)
}

export const getToken = () => localStorage.getItem("token") || undefined

export const githubAuth = async () => {
  if (!getToken()) {
    const auth = createTokenAuth("token")

    // @ts-ignore
    const { token } = await auth()

    storeToken(token)
  }
}

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${getToken()}`,
  },
})

let octokit: any

export const getOctokit = () =>
  octokit || (octokit = new Octokit({ auth: getToken() }))
