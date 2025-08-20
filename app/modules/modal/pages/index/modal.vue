<template>
    <v-dialog v-model="showModal" width="400">
        <v-card>
            <v-card-title>Modal</v-card-title>
            <v-card-text>Modal content</v-card-text>
            <v-card-actions>
                <v-btn @click="showModal = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from '#imports'
const showModal = ref(true)
</script>