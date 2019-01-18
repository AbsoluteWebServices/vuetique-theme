<template>
  <button
    class="mr-3 mb-3 size-selector"
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'

export default {
  mixins: [GenericSelector]
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
