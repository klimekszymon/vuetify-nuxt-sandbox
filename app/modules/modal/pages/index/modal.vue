<template>
    <v-dialog :model-value="true" @update:model-value="onDialogUpdate" width="400">
        <v-card>
            <v-card-title>Modal</v-card-title>
            <v-card-text>Modal content</v-card-text>
            <v-card-actions>
                <v-btn @click="closeModal">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref,useRouter  } from '#imports'
const showModal = ref(true)
const router = useRouter()
function closeModal() {
  router.back() // or use router.replace({ path: '/page' }) if you prefer
}
function onDialogUpdate(val: boolean) {
  if (!val) closeModal()
}
</script>