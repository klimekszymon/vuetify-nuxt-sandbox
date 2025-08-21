I have nuxt 4 + vuetify 3 project which will have infinite number of pages
with data tables with products, users, dictionaries, clients etc.
For some collections there is nested structure:
/products/main-products
/products/product-parameters
/dictionaries/departments
/dictionaries/country-codes
/dictionaries/currency-codes

For some pages there is flat structure:
/clients

I want to have system which provide url params to control dialog CRUD operations for pages with data tables.

/products/main-products?action=edit&id=1
/products/main-products?action=create
/products/product-parameters?action=edit&id=2
/products/product-parameters?action=create
/clients?action=edit&id=2
/clients?action=delete&id=2 - confirm delete dialog to add later
/clients?action=create

Dialog will contain form with custom set of fields for each page
so I want to keep dialog content in some clean structure.

Dialog must be opened on top of the page with data table.
When I send url to user with action param /products/product-parameters?action=edit&id=2
user will be redirected to /products/product-parameters page and dialog will be opened with edit form for id=2

Closing dialog, clicking outside or pressing escape key should close dialog
then remove action param from url and without reload user can continue working on the page with data table.

So user can open and close dialog multiple times without reload page and the url params will change in real-time.

Ideas to validate:

Solution 1: Create local module to separate logic and keep it clean.
Links to nuxt 4 documentation on how to create modules:
https://nuxt.com/docs/4.x/api/kit/modules

Utilities to manipulate pages and routes from module using extendPAges and other utilities from NuxtKit:
https://nuxt.com/docs/4.x/api/kit/pages

Solution 2: Plugin-based approach - automatically detects modal routes and manages the modal stack globally.
Solution 3: Layout-based system - uses Nuxt's layout system to create modal pages with background rendering.
Solution 4: Vuetify Dialog Manager - Component-based approach using Vuetify's dialog system directly.

Link on how to use teleport in nuxt 4:
https://nuxt.com/docs/4.x/api/components/teleports

Link to v-dialog component:
https://vuetifyjs.com/en/components/dialogs
