import svgLoader from 'vite-svg-loader'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css','~/assets/css/overlay-scrollbars.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    vite: {
        plugins: [
            svgLoader(),
        ],
        server: {
            proxy: {
                "/public/expert/api/v1/": {
                    target: "http://localhost:80",
                    changeOrigin: false,
                },
                '/ws': {
                    target: 'ws://localhost:8001',
                    changeOrigin: true,
                    ws: true
                }
            },
        }
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },
    components: true,
    experimental: {
        reactivityTransform: false,
    },
    i18n: {
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',  // recommended
        },
        locales: [
            {
                code: 'en',
                file: 'en.json',
                name: 'English'
            },
            {
                code: 'ru',
                file: 'ru.json',
                name: 'Русский'
            },
        ],
        lazy: false,
        langDir: 'lang',
        defaultLocale: 'ru',
    }

})
