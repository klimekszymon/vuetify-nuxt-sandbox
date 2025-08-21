<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="d-flex align-center">
            Clients
            <v-spacer />
            <v-btn color="primary" @click="openDialog('create')">Create Client</v-btn>
          </v-card-title>
          <v-list>
            <v-list-item v-for="client in clients" :key="client.id">
              <v-list-item-title>{{ client.name }}</v-list-item-title>
              <template #append>
                <v-btn icon="mdi-pencil" variant="text" @click="openDialog('edit', client.id)" />
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <CrudDialog
      v-model="isDialogOpen"
      :title="dialogTitle"
      @save="onSave"
    >
      <!-- Form for creating/editing a client -->
      <v-form ref="form">
        <v-text-field
          v-model="editableClient.name"
          label="Client Name"
          :rules="[v => !!v || 'Name is required']"
          required
        />
      </v-form>
    </CrudDialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useDialog } from '~/composables/useDialog'

// --- Page-specific data and logic ---
const clients = ref([
  { id: 1, name: 'Client A' },
  { id: 2, name: 'Client B' },
  { id: 3, name: 'Client C' },
])

const editableClient = reactive<{ id: number | null; name: string }>({ id: null, name: '' })

const onSave = () => {
  // In a real app, you'd validate the form and save the data
  console.log('Saving client:', editableClient)
  if (action.value === 'create') {
    // Add to list
    clients.value.push({ id: Date.now(), name: editableClient.name })
  } else {
    // Update in list
    const index = clients.value.findIndex(c => c.id === editableClient.id)
    if (index !== -1) {
      clients.value[index] = { ...editableClient }
    }
  }
  closeDialog()
}

// --- Dialog integration ---
const { isDialogOpen, action, itemId, openDialog, closeDialog } = useDialog()

const dialogTitle = computed(() => {
  return action.value === 'create' ? 'Create Client' : 'Edit Client'
})

// Watch for changes in the action or item ID to load the correct data into the form.
// This runs on component setup and whenever the dependencies change.
watchEffect(() => {
  if (action.value === 'edit' && itemId.value) {
    const client = clients.value.find(c => c.id === Number(itemId.value))
    if (client) {
      Object.assign(editableClient, client)
    } else {
      // If client not found (e.g., bad ID in URL), close the dialog
      closeDialog()
    }
  } else {
    // Reset form for 'create' action or when dialog is not active
    editableClient.id = null
    editableClient.name = ''
  }
})

// When the dialog is closed via UI (e.g., clicking outside), ensure the URL is cleaned up.
watch(isDialogOpen, (isOpen, wasOpen) => {
  const route = useRoute() // Get fresh route state
  if (!isOpen && wasOpen && route.query.action) {
    closeDialog()
  }
})
</script>
