const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
if (environment === 'development') {
  require('dotenv').config()
}

module.exports = {
  mode: 'spa',
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/styles'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui', '@/plugins/firebase'],

  /*
  ** Nuxt.js middleware
  */
  router: {
    middleware: 'authenticated'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL || 'https://stg-sukima-tech.firebaseio.com'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Generate configuration
  */
  generate: {
    dir: 'functions/public'
  },
  env:
    environment === 'staging'
      ? {
          baseUrl: process.env.STG_FIREBASE_BASE_URL,
          firebaseApiKey: process.env.STG_FIREBASE_API_KEY,
          firebaseAuthDomain: process.env.STG_FIREBASE_AUTH_DOMAIN,
          firebaseDatabaseUrl: process.env.STG_FIREBASE_DATABASE_URL,
          firebaseProjectId: process.env.STG_FIREBASE_PROJECT_ID,
          firebaseStorageBucket: process.env.STG_FIREBASE_STORAGE_BUCKET,
          firebaseMessagingSenderId:
            process.env.STG_FIREBASE_MESSAGING_SENDER_ID
        }
      : {
          baseUrl: process.env.FIREBASE_BASE_URL,
          firebaseApiKey: process.env.FIREBASE_API_KEY,
          firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
          firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
          firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
          firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
        }
}
