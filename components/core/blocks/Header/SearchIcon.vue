<template>
  <button
    type="button"
    :aria-label="$t('Open search panel')"
    class="bg-transparent border-0"
    @click="toggleSearchpanel"
    data-testid="openSearchPanel"
  >
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#search"/>
    </svg>
  </button>
</template>

<script>
import SearchIcon from '@vue-storefront/core/compatibility/components/blocks/Header/SearchIcon'

export default {
  mixins: [SearchIcon]
}
</script>
