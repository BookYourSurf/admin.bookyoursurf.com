// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts'
  ],

  components: [
    {
      path: '~/components/common',
      pathPrefix: false
    },
    {
      path: '~/components/business',
      pathPrefix: false
    },
    {
      path: '~/components/dashboard',
      pathPrefix: false
    },
    {
      path: '~/components/customers',
      pathPrefix: false
    },
    {
      path: '~/components/inbox',
      pathPrefix: false
    },
    {
      path: '~/components/sessions',
      pathPrefix: false
    },
    {
      path: '~/components/settings',
      pathPrefix: false
    },
    {
      path: '~/components/surfboards',
      pathPrefix: false
    },
    {
      path: '~/components/templates',
      pathPrefix: false
    },
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  srcDir: 'app/',

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  googleFonts: {
    families: {
      Lato: [300, 400, 700, 900]
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-GB',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'nl',
        language: 'nl-NL',
        name: 'Nederlands',
        file: 'nl.json'
      }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    langDir: '../i18n/locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})
