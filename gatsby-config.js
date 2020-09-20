module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'ymmmtym&apos;s Blog',
    description: 'ymmmtym\'s Technical Blog',
    siteUrl: 'https://blog.ymmmtym.com',
    author: 'ymmmtym',
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
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
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
        name: "ymmmtym's Blog",
        short_name: 'ymmmtym',
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
