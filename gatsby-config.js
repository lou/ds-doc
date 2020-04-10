/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: "/ds-doc",
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
        ignore: [`*.(ts|tsx)`],
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `test`,
        branch: `master`,
        remote: `https://github.com/lou/test.git`,
        patterns: `pages/**`,
      },
    },
  ],
}
