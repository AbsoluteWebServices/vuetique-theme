<template>
  <div id="home">
    <no-ssr>
      <main-slider />
    </no-ssr>

    <promoted-offers collection="smallBanners" :limit="2" :columns="2" class="mt-2 mb-16 sm:my-8" />

    <section class="new-collection container mb-16">
      <div>
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">{{ $t('Shop new arrivals') }}</h2>
        </header>
      </div>
      <div class="row center-xs">
        <div class="col-12">
          <product-listing :columns="defaultColumn" :products="getEverythingNewCollection" />
        </div>
      </div>
    </section>

    <promoted-offers collection="smallBanners" :limit="2" :offset="2" :columns="2" class="mt-2 mb-16 sm:my-8" />

    <no-ssr>
      <products-slider class="mb-16" :title="$t('Sale and discount')" :products="salesCollection" :config="sliderConfig" />
    </no-ssr>

    <section class="container mb-16">
      <div class="justify-center">
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">{{ $t('Get inspired') }}</h2>
        </header>
      </div>
      <tile-links />
    </section>
    <Onboard/>

  </div>
</template>

<script>
// 3rd party dependecies
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import ProductsSlider from 'theme/components/core/ProductsSlider'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'

import NoSSR from 'vue-no-ssr'
import {mapGetters} from 'vuex'
import {isServer} from '@vue-storefront/core/helpers'

export default {
  mixins: [Home],
  components: {
    MainSlider,
    Onboard,
    ProductListing,
    ProductsSlider,
    PromotedOffers,
    TileLinks,
    'no-ssr': NoSSR
  },
  data () {
    return {
      sliderConfig: {
        perPage: 1,
        perPageCustom: [[0, 2], [1024, 4]],
        paginationEnabled: true,
        loop: false,
        paginationSize: 6
      },
      defaultColumn: 4
    }
  },
  computed: {
    ...mapGetters('homepage', ['getEverythingNewCollection']),
    categories () {
      return this.$store.state.category.list
    },
    newCollection () {
      return this.$store.state.homepage.new_collection
    },
    salesCollection () {
      return this.$store.state.homepage.sales_collection
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm =>
        vm.$store.dispatch('homepage/fetchNewCollection').then(res => {
          vm.loading = false
        })
      )
    } else {
      next()
    }
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' }).then((onboardingClaim) => {
        if (!onboardingClaim) { // show onboarding info
          this.$bus.$emit('modal-toggle', 'modal-onboard')
          this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
        }
      })
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    const config = store.state.config
    return new Promise((resolve, reject) => {
      Logger.info('Calling asyncData in Home (theme)')()

      let newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })
      let salesQuery = prepareQuery({ queryConfig: 'inspirations' })

      store.dispatch('homepage/fetchNewCollection')

      store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc',
          includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
        }).catch(err => {
          reject(err)
        }).then((res) => {
          if (res) {
            store.state.homepage.new_collection = res.items
          }

          store.dispatch('product/list', {
            query: salesQuery,
            size: 12,
            sort: 'created_at:desc',
            includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
          }).then((res) => {
            if (res) {
              store.state.homepage.sales_collection = res.items
            }
            return resolve()
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}
</script>
