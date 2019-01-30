<template>
  <div>
    <template v-if="items && items.length">
      <h2 class="mb-4 text-center">{{ $t('Recently viewed') }}</h2>
      <product-listing columns="4" :products="items" />
    </template>
  </div>
</template>

<script>
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed'
import ProductListing from 'theme/components/core/ProductListing.vue'

export default {
  mixins: [RecentlyViewed],
  components: {
    ProductListing
  }
}
</script>
