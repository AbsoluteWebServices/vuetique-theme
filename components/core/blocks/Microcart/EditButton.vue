<template>
  <button
    @click="$emit('click')"
    class="border-0 bg-transparent p-0 inline-flex"
    data-testid="editButton"
  >
    <span class="hidden">
      {{ $t('Edit') }}
    </span>
    <i class="edit-icon material-icons text-h4 text-grey-dark">mode_edit</i>
  </button>
</template>

<style lang="scss" scoped>
.edit-icon {
  font-size: 20px;
}
</style>
