import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  generate: {
    fallback: true
  },
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap' },
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: ["~/plugins/validator.js"],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCK4-AUNr_TAU734DgsD9-mEHTLIFdSDyw",
          authDomain: "pokerscenarios-afa35.firebaseapp.com",
          databaseURL: "https://pokerscenarios-afa35.firebaseio.com",
          projectId: "pokerscenarios-afa35",
          storageBucket: "pokerscenarios-afa35.appspot.com",
          messagingSenderId: "359147012056",
          appId: "1:359147012056:web:e6c0de4150c3e6b892bcad",
          measurementId: "G-2GGH1QEY9M"
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedMutation: "authentication/SET_AUTH_USER"
            }
          },
          firestore: true
        }
      }
    ],
    ['nuxt-stripe-module', {
      publishableKey: 'pk_test_51H6YZNL1eBkJl2SwbHo5DCFtOtyMcbb5Ry2Z16F07OIJUevBfF9VFJlXZAitunTnPhhGKi9AsaV8TyLnGlXywrFa00BWOLj3H8',
    }],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
