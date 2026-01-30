import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-quasar-ui'
  ],
  quasar: {
    sassVariables: fileURLToPath(new URL('./app/assets/quasar-variables.sass', import.meta.url)),
    plugins: [
      'Notify',
      'Dialog'
    ],
    extras: {
      fontIcons: ['material-icons']
    }
  },
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
})
