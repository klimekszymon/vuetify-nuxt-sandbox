<template>
  <v-list-item
    v-if="item"
    :to="item.to"
    active-class="text-primary"
    :title="item.label"
  />
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
const { item } = defineProps<{
  item: any
}>()
</script>

<style></style>
