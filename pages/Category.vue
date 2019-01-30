<template>
  <div id="category">
    <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
    <header class="pb-16 row bg-grey-lightest mb-6">
      <div class="container">
        <div class="row items-center mt-2">
          <h1 class="col-10"> {{ category.name }} </h1>
          <div class="col-2 hidden lg:block"><sort-by /></div>
        </div>
      </div>
      <div class="container lg:hidden">
        <div class="row gutter-md mt-6">
          <div class="col-6">
            <button-full class="w-full" @click.native="openFilters">{{ $t('Filters') }}</button-full>
          </div>
          <div class="col-6"><sort-by /></div>
        </div>
      </div>
    </header>
    <div class="mobile-filters lg:hidden" v-show="mobileFilters">
      <button
        type="button"
        :aria-label="$t('Close')"
        class="absolute pin-t pin-r m-4 h-4"
        @click="closeFilters"
      >
        <svg viewBox="0 0 25 25" class="vt-icon--sm">
          <use xlink:href="#close"/>
        </svg>
      </button>
      <sidebar :filters="filters.available" @closeFilters="closeFilters"/>
    </div>
    <div class="container pb-16">
      <div class="row gutter-md">
        <div class="col-3 hidden lg:block">
          <sidebar :filters="filters.available"/>
        </div>
        <div class="col-12 lg:col-9">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h3 data-testid="noProductsInfo" class="mb-2">{{ $t('No products found!') }}</h3>
            <p class="text-grey-dark">{{ $t('Please change Your search criteria and try again. If you still can\'t find what you\'re looking for, try visiting our homepage to check out our bestsellers!') }}</p>
          </div>
          <product-listing columns="3" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@vue-storefront/core/pages/Category'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import SortBy from '../components/core/SortBy.vue'
// import builder from 'bodybuilder'

import ButtonFull from '../components/theme/ButtonFull.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy,
    ButtonFull
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    },
    notify () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Please select the field which You like to sort by'),
        action1: { label: this.$t('OK') }
      })
    }
  },
  mixins: [Category]
}
</script>

<style lang="scss" scoped>
.mobile-filters {
  @apply fixed overflow-auto bg-white z-modal pin-l w-screen p-4;

  padding-top: 52px;
  top: 70px;
  height: calc(100vh - 70px);

  @screen md {
    top: 73px;
  }
}
</style>
