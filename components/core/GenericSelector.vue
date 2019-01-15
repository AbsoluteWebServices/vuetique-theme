<template>
  <button
    :class="{'active': active}"
    class="border border-grey-light font-medium text-xs text-grey-dark generic-selector"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
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
  .generic-selector {
    height: 40px;
    min-width: 40px;
    padding-left: 8px;
    padding-right: 8px;

    &.active {
      @apply border-grey-dark text-black;
    }

    &:disabled {
      @apply text-disabled border-disabled cursor-not-allowed;
    }
  }
</style>
