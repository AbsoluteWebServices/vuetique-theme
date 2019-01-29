<template>
  <button
    type="button"
    class="bg-transparent border-0 inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#sandwich"/>
    </svg>
  </button>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [HamburgerIcon]
}
</script>
