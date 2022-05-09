import config from './src/configs'

const { locale, availableLocales, fallbackLocale } = config.locales
const { gaId } = config.analytics

export default {
    ssr: true,
    target: 'static',
    srcDir: 'src/',
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s ',
        title: 'Biznet',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' },
            ...config.icons.map((href) => ({ rel: 'stylesheet', href }))
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/scss/theme.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        // plugins
        { src: '~/plugins/persistedState.client.js', ssr: 'false' },
        { src: '~/plugins/animate.js', mode: 'client' },
        { src: '~/plugins/apexcharts.js', mode: 'client' },
        { src: '~/plugins/clipboard.js', mode: 'client' },
        { src: '~/plugins/vue-shortkey.js', mode: 'client' },
        { src: '~/plugins/vue-horizontal-list.js', mode: 'client' },
        { src: '~/plugins/vuetify-mask.js', mode: 'client' },
        { src: '~/plugins/draggable.js', mode: 'client' },
        { src: '~/plugins/vuelidate.js', mode: 'client' },

        // filters
        { src: '~/filters/capitalize.js' },
        { src: '~/filters/lowercase.js' },
        { src: '~/filters/uppercase.js' },
        { src: '~/filters/formatCurrency.js' },
        { src: '~/filters/readMore.js' },
        { src: '~/filters/formatDate.js' }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    // components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        ['@nuxtjs/vuetify', {
            customVariables: ['~/assets/scss/vuetify/variables/_index.scss'],
            optionsPath: '~/configs/vuetify.js',
            treeShake: true,
            defaultAssets: {
                font: false
            }
        }],
        ['nuxt-i18n', {
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: 'i18n_redirected'
            },
            locales: availableLocales,
            lazy: true,
            langDir: 'translations/',
            defaultLocale: locale,
            vueI18n: {
                fallbackLocale
            }
        }]
    ],

    // global middleware on routes
    router: {
        middleware: ['auth']
    },

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        'nuxt-logrocket',
        '@nuxtjs/google-gtag',
        // Simple usage
        'dropzone-nuxt',
        // With options
        ['dropzone-nuxt', { /* module options */ }],
        // Nuxt firebase with configs
        [
            '@nuxtjs/firebase',
            {
                config: {
                    apiKey: 'AIzaSyAfuxuq0ddfvL_Sckxfkwqui94ixrgW4uQ',
                    authDomain: 'rnet-auth.firebaseapp.com',
                    projectId: 'rnet-auth',
                    storageBucket: 'rnet-auth.appspot.com',
                    messagingSenderId: '1056295783741',
                    appId: '1:1056295783741:web:6bc04686c62ab5ef570954',
                    measurementId: '<measurementId>',
                    databaseURL: 'https://rnet-auth.firebaseio.com'
                },
                services: {
                    auth: {
                        persistence: 'local', // default
                        initialize: {
                            onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
                            subscribeManually: false
                        },
                        ssr: false,
                    }, // Just as example. Can be any other service.
                    database: true,
                    firestore: true,
                    functions: true,
                }
            }
        ],
        '@nuxtjs/axios', // Axios for Http
        '@nuxtjs/apollo', // Apollo for GraphQL
    ],

    transpile: ['vue-cli-plugin-apollo/graphql-client/src'],

    // Apollo GraphQL Options this is client for making http calls for GraphQL
    apollo: {
        cookieAttributes: {
            expires: 7 // optional, default: 7 (days)
        },
        includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
        authenticationType: 'Bearer', // optional, default: 'Bearer'
        // optional
        // errorHandler: '~/plugins/apollo-error-handler.js',
        // required
        clientConfigs: {
            default: '~/graphql/clientConfig.js'
        }
    },

    // logRocket: {
    //     // configure LogRocket
    //     logRocketId: 'r9osph/rnetnuxtcrm',
    //     devModeAllowed: true,
    //     config: {
    //         //
    //     }
    // },

    'google-gtag': {
        id: gaId,
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: false // disable if you don't want to track each page route with router.afterEach(...).
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {
            if (ctx.isDev) {
                config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
            }
        }
    },

}