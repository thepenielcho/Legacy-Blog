export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PENIELog',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This is PENIELog: Peniel Blog.' },
      { name: 'format-detection', content: 'telephone=no' },
      // Twitter
      // Test on: https://cards-dev.twitter.com/validator
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@ChoPeniel' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.blog.penielcho.com/'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'PENIELog'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'This is PENIELog: Peniel Blog.'
      },
      // {
      //   hid: 'twitter:image',
      //   name: 'twitter:image',
      //   content: 'https://www.blog.penielcho.com/tc-image.png'
      // },

      // Open Graph
      // Test on: https://developers.facebook.com/tools/debug/
      // { hid: 'og:site_name', property: 'og:site_name', content: 'PENIELog' },
      // { hid: 'og:type', property: 'og:type', content: 'Blog' },
      // {
      //   hid: 'og:url',
      //   property: 'og:url',
      //   content: 'https://www.blog.penielcho.com/'
      // },
      // {
      //   hid: 'og:title',
      //   property: 'og:title',
      //   content: 'PENIELog'
      // },
      // {
      //   hid: 'og:description',
      //   property: 'og:description',
      //   content:
      //     'This is PENIELog: Peniel Blog.'
      // },
      // {
      //   hid: 'og:image',
      //   property: 'og:image',
      //   content: 'https://www.blog.penielcho.com/og-image.png'
      // },
      // {
      //   hid: 'og:image:secure_url',
      //   property: 'og:image:secure_url',
      //   content: 'https://www.blog.penielcho.com/og-image.png'
      // },
      // {
      //   hid: 'og:image:alt',
      //   property: 'og:image:alt',
      //   content: 'PENIELog Logo Image'
      // }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
