# Plan: URL-Driven CRUD Dialogs in Nuxt

This plan outlines a robust and maintainable solution for managing CRUD dialogs via URL query parameters in a Nuxt 4 / Vuetify 3 application.

The core of this solution is a Vue **composable** (`useDialog`) that encapsulates all the necessary logic, making it easily reusable across any page with a data table.

---

### 1. Requirements

- **URL-Driven:** Dialogs for `create`, `edit`, and `delete` operations are controlled by query parameters (e.g., `?action=edit&id=123`).
- **State Sync:** The URL must update instantly and without a page reload when a dialog is opened or closed.
- **Dynamic Content:** Each page must be able to inject its own specific form/component into the dialog.
- **Direct Access:** Visiting a URL with action parameters must automatically open the corresponding page and dialog.
- **Clean & Reusable:** The implementation must be DRY (Don't Repeat Yourself) and easy to apply to new pages.

---

### 2. Proposed Solution: The `useDialog` Composable

We will create a single composable, `useDialog.ts`, that will be the single source of truth for dialog management.

#### `composables/useDialog.ts`

This file will contain the core logic.

**State:**
- `isDialogOpen`: A reactive boolean to control the `v-dialog`'s `v-model`.
- `action`: A reactive string (`'create'`, `'edit'`, `'delete'`).
- `itemId`: A reactive string or number for the ID of the item being edited/deleted.

**Functionality:**
- **`openDialog(action, id)`:** A function to open the dialog. It will update the reactive state and push the new query parameters to the URL using `useRouter()`.
- **`closeDialog()`:** A function to close the dialog. It will clear the reactive state and remove the query parameters from the URL, again using `useRouter()`.
- **Route Watcher:** A `watchEffect` will monitor `route.query`. If `action` and `id` appear in the URL, it will automatically update the composable's state to open the dialog. This handles direct URL access and browser back/forward buttons.

### 3. Implementation Steps

**Step 1: Create the Composable**
- Create the file `app/composables/useDialog.ts`.
- Implement the state and functions described above.

**Step 2: Create a Reusable Dialog Component**
- Create a new component, `app/components/CrudDialog.vue`.
- This component will contain the `v-dialog` element.
- It will accept the `isDialogOpen` state from `useDialog` as a prop to control its visibility.
- It will use a `<slot>` to allow parent pages to inject their custom forms (for creating/editing users, products, etc.).
- It will emit an `update:modelValue` event on close, which the parent page will use to call `closeDialog()`.

**Step 3: Integrate into a Page**
- On a page with a data table (e.g., `app/pages/products/main-products.vue`):
  1. Call `const { isDialogOpen, action, itemId, openDialog, closeDialog } = useDialog();` to get access to the logic.
  2. Add the `<CrudDialog>` component to the template, binding `v-model="isDialogOpen"`.
  3. Inside the `<CrudDialog>`, use a `v-if` or dynamic component (`<component :is="...">`) to render the correct form based on the `action` and `itemId` values.
  4. Add buttons to the data table (`Edit`, `Create New`) that call `openDialog('edit', product.id)` or `openDialog('create')`.

### 4. Why This Approach is Better

- **Simplicity:** It avoids the overhead of a Nuxt module or the complexity of a layout-based solution.
- **Reusability (DRY):** All the complex logic for URL synchronization and state management is in one place (`useDialog.ts`). Adding dialogs to a new page becomes trivial.
- **Idiomatic:** This is the canonical way to handle shared, reactive logic in Vue 3 and Nuxt 4.
- **Testable:** The composable is a plain TypeScript function, making it easy to unit test in isolation.
- **Decoupled:** The logic (`useDialog`) is completely separate from the UI (`CrudDialog.vue`), following best practices for separation of concerns.
