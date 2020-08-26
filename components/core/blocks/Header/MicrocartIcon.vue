<template>
  <button
    type="button"
    class="relative"
    @click="openMicrocart"
    data-testid="openMicrocart"
    :aria-label="$t('Open microcart')"
  >
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#cart" />
    </svg>
    <span
      class="minicart-count absolute flex justify-center items-center text-xs font-bold text-white bg-primary"
      v-cloak
      v-show="totalQuantity"
      data-testid="minicartCount"
    >
      {{ totalQuantity }}
    </span>
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { syncCartWhenLocalStorageChange } from '@vue-storefront/core/modules/cart/helpers'

export default {
  mounted () {
    syncCartWhenLocalStorageChange.addEventListener()
    this.$once('hook:beforeDestroy', () => {
      syncCartWhenLocalStorageChange.removeEventListener()
    })
  },
  computed: {
    ...mapGetters({
      totalQuantity: 'cart/getItemsTotalQuantity'
    })
  },
  methods: {
    ...mapActions({
      openMicrocart: 'ui/toggleMicrocart'
    })
  }
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
