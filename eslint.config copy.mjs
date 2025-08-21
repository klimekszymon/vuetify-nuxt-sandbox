// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Your custom configs here
  rules: {
    'vue/valid-v-slot': ['error', { allowModifiers: true }], // allow vuetify slot modifier
    'vue/html-self-closing': ['error', { html: { void: 'any' } }], // not conflict with prettier
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
)
