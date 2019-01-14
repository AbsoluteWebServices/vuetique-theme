<template>
  <button
    type="button"
    class="relative inline-flex"
    @click="openMicrocart"
    data-testid="openMicrocart"
    :aria-label="$t('Open microcart')"
  >
    <i class="material-icons">shopping_cart</i>
    <span
      class="minicart-count absolute flex justify-center items-center text-xs font-bold text-white bg-primary"
      v-cloak
      v-if="totalQuantity"
      data-testid="minicartCount"
    >
      {{ totalQuantity }}
    </span>
  </button>
</template>

<script>
import MicrocartIcon from '@vue-storefront/core/compatibility/components/blocks/Header/MicrocartIcon'

export default {
  mixins: [MicrocartIcon]
}
</script>

<style scoped>
  .minicart-count {
    top: 2px;
    left: 50%;
    min-width: 18px;
    min-height: 18px;
    border-radius: 10px;
  }
</style>
