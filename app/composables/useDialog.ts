export const useDialog = () => {
  const router = useRouter()
  const route = useRoute()

  const isDialogOpen = ref(false)
  const action = ref<'create' | 'edit' | 'delete' | null>(null)
  const itemId = ref<string | number | null>(null)

  const openDialog = (
    newAction: 'create' | 'edit' | 'delete',
    newId: string | number | null = null,
  ) => {
    action.value = newAction
    itemId.value = newId
    isDialogOpen.value = true

    const query = { ...route.query, action: newAction, id: newId || undefined }
    router.push({ query })
  }

  const closeDialog = () => {
    isDialogOpen.value = false
    action.value = null
    itemId.value = null

    const { action: queryAction, id: queryId, ...rest } = route.query
    router.push({ query: rest })
  }

  watchEffect(() => {
    const { action: queryAction, id: queryId } = route.query
    if (
      queryAction &&
      ['create', 'edit', 'delete'].includes(queryAction as string)
    ) {
      action.value = queryAction as 'create' | 'edit' | 'delete'
      itemId.value = queryId ? String(queryId) : null
      isDialogOpen.value = true
    } else {
      // Only close if it was previously open by the watcher
      if (action.value) {
        isDialogOpen.value = false
        action.value = null
        itemId.value = null
      }
    }
  })

  return {
    isDialogOpen,
    action,
    itemId,
    openDialog,
    closeDialog,
  }
}
