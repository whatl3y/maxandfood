export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/public/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css',
      },
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/7d95a048cb.js',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/app.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/dayjs.js',
    '@/plugins/draggable.js',
    '@/plugins/dropzone.js',
    '@/plugins/toast.js',
    '@/plugins/vue-select.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},

  serverMiddleware: ['~/../server/routes/index'],
  srcDir: 'client/',

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.URL || 'http://localhost:3000',
      debug: process.env.DEBUG,
    },

    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
}
