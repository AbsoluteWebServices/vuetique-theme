<template>
  <router-link :to="localizedRoute('/compare')" class="compare-icon no-underline text-black" v-if="isActive">
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#compare_header"/>
    </svg>
  </router-link>
</template>

<script>
import CompareIcon from '@vue-storefront/core/compatibility/components/blocks/Header/CompareIcon'

export default {
  mixins: [CompareIcon]
}
</script>
