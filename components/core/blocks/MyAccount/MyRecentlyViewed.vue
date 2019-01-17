<template>
  <div class="mb-8">
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('My Recently viewed products') }}
        </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="items && items.length > 0">
        <product-listing columns="3" :products="items"/>
      </div>
      <div class="col-12 text-h4" v-else>
        <p>{{ $t('No products yet') }}</p>
      </div>
    </div>
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
