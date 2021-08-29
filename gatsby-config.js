require('dotenv').config();

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'yumenotamayume&apos;s Blog',
    description: 'yumenotamayume\'s Technical Blog',
    siteUrl: 'https://blog.ymmmtym.com',
    author: 'yumenomatayume',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-webpack-bundle-analyzer',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-code-titles`,
          },
          'gatsby-remark-autolink-headers',
          // `gatsby-remark-code-titles`,
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: "language-",
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout/layout.js'),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://fe988b5e96fc4634babe220e23464e15@sentry.io/1274827',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "yumenomatayume's Blog",
        short_name: 'yumenomatayume',
        start_url: '/',
        background_color: '#ededed',
        theme_color: '#384f7c',
        display: 'standalone',
        icons: [
          {
            src: '/favicons/ymmmtym-192x192.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/ymmmtym-512x512.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline', // put this after gatsby-plugin-manifest
    'gatsby-plugin-netlify', // make sure to put last in the array
  ],
};
