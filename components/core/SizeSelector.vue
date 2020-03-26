<template>
  <button
    class="mr-3 mb-3 size-selector"
    :class="{ active: isActive }"
    @click="$emit('change', variant)"
    :aria-label="$t('Select size {variant}', { variant: variant.label })"
  >
    {{ variant.label }}
  </button>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin]
}
</script>

<style lang="scss" scoped>
  .size-selector {
    @apply bg-white border border-grey-light font-medium text-xs text-grey-dark;
    height: 40px;
    min-width: 40px;

    &.active {
      @apply border-grey-dark text-black;
    }

    &:disabled {
      @apply text-disabled border-disabled cursor-not-allowed;
    }
  }
</style>
