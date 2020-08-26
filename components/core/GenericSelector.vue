<template>
  <button
    :class="{'active': isActive}"
    class="border border-grey-light font-medium text-xs text-grey-dark generic-selector"
    @click="$emit('change', variant)"
    :aria-label="$t('Select ' + variant.label)"
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
