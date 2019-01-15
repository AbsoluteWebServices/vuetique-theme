<template>
  <div id="category">
    <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
    <header class="pb-16">
      <div class="container">
        <div class="row items-center mt-2">
          <h1 class="col-10 category-title"> {{ category.name }} </h1>
          <div class="sorting col-2"><sort-by /></div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <button
            class="col-5 mt-6 p-4 mobile-filters-button"
            @click="openFilters"
          >
            {{ $t('Filters') }}
          </button>
          <div class="mobile-sorting col-6 mt-6"><sort-by /></div>
        </div>
      </div>
    </header>
    <div class="container pb-16">
      <div class="row gutter-md">
        <div class="col-3 category-filters">
          <sidebar :filters="filters.available"/>
        </div>
        <div class="col-3 mobile-filters" v-show="mobileFilters">
          <div class="close-container absolute w-full">
            <i class="material-icons p-4 close" @click="closeFilters">close</i>
          </div>
          <sidebar class="mobile-filters-body" :filters="filters.available"/>
        </div>
        <div class="col-9 products-list">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h3 data-testid="noProductsInfo" class="mb-2">{{ $t('No products found!') }}</h3>
            <p class="text-grey-dark">{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
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

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    return new Promise((resolve, reject) => {
      store.state.category.current_product_query = Object.assign(store.state.category.current_product_query, { // this is just an example how can you modify the search criteria in child components
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
  .category-filters {
    width: 242px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
  }

  .mobile-filters-button {
    display: none;
  }

  .mobile-sorting {
    display: none;
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      font-size: 36px;
      line-height: 40px;
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: block;
      height: 45px;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      position: fixed;
      background-color: #F2F2F2;
      z-index: 5;
      padding: 0 40px;
      left: 0;
      width: 100vw;
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }
  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }
</style>
