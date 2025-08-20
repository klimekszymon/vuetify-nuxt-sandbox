import { createResolver, defineNuxtModule, extendPages } from 'nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'module-modal',
        configKey: 'moduleModal',
    },
  setup() {
    const resolver = createResolver(import.meta.url)
    extendPages((pages) => {
      // @ts-ignore
      pages[0]?.children.push({
        name: 'Modal',
        path: 'modal',
        file: resolver.resolve('./pages/index/modal.vue'),
        children: []
      })
      console.log('log pages ', pages[0])
    })
  },
})


