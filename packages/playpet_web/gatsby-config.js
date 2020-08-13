/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "playpet(플레이펫)",
    titleTemplate: "%s · The Real Hero",
    description: "플레이펫 - 반려동물이 더 나은 세상을 위해 노력합니다",
    author: "playpet",
    siteUrl: "https://plapet.me",
    image: "/appicon.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [`gatsby-plugin-react-helmet`],
}
