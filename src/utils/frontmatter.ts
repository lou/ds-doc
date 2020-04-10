type FrontmatterType = {
  body: string
  data: object
}

export const Frontmatter = {
  toData: function(text: string) {
    const regex = /\n(.*):\s(.*)/g
    let match
    const data = {}

    while ((match = regex.exec(text)) !== null) {
      // @ts-ignore
      const [_, key, value] = match
      data[key] = value
    }
    return data
  },
  parse: function(text: string): FrontmatterType {
    const regex = text.match(/(^---[\r\n]+.*---[\r\n]+)(.*)/ms)

    return {
      data: this.toData(regex?.[1] || ""),
      body: regex ? regex[2] : text,
    }
  },
  dump: function(data: object) {
    const reducer = (acc: string, key: string) => acc + `${key}: ${data[key]}\n`
    const boundary = "---\n"

    return Object.keys(data)
      .reduce(reducer, boundary)
      .concat(boundary)
  },
}
