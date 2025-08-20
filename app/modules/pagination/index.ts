import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export interface ModuleOptions {
 activateObserver: boolean 
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'module-pagination',
        configKey: 'modulePagination',
    },
    defaults: {
        activateObserver: true,
    },
  setup (options, nuxt) {
   const { resolve } = createResolver(import.meta.url)

//    nuxt.hook('pages:extend', (pages) => {})

   extendPages((pages) => {
    pages.push({
        name: 'courses-pagination',
        file: resolve('./pages/pagination.vue'),
        // file: resolve('./runtime/pages/pagination.vue'),
        path: '/courses/:page',
        })
   })
  },
})

// https://nuxt.com/docs/4.x/api/kit/pages
// https://nuxt.com/docs/4.x/api/kit/modules