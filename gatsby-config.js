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
    `gatsby-plugin-typescript`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/pages/`,
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
