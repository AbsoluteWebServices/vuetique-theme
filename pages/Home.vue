<template>
  <div id="home">
    <main-slider />

    <promoted-offers collection="smallBanners" :limit="2" :columns="2" class="mt-2 mb-16 sm:my-8" />

    <section class="new-collection container mb-16">
      <div>
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Shop new arrivals') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <div class="col-12">
          <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
            <product-listing :columns="defaultColumn" :products="getEverythingNewCollection" />
          </lazy-hydrate>
          <product-listing v-else :columns="defaultColumn" :products="getEverythingNewCollection" />
        </div>
      </div>
    </section>

    <promoted-offers collection="smallBanners" :limit="2" :offset="2" :columns="2" class="mt-2 mb-16 sm:my-8" />

    <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
      <products-slider class="mb-16" :title="$t('Sale and discount')" :products="getSalesCollection" :config="sliderConfig" />
    </lazy-hydrate>
    <products-slider v-else class="mb-16" :title="$t('Sale and discount')" :products="getSalesCollection" :config="sliderConfig" />

    <section class="container mb-16">
      <div class="justify-center">
        <header class="mb-6">
          <h2 class="text-h1 leading-h1 text-center">
            {{ $t('Get inspired') }}
          </h2>
        </header>
      </div>
      <tile-links />
    </section>
    <Onboard />
  </div>
</template>

<script>
import config from 'config'
import LazyHydrate from 'vue-lazy-hydration'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import ProductsSlider from 'theme/components/core/ProductsSlider'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'

import { mapGetters } from 'vuex'
import { isServer } from '@vue-storefront/core/helpers'

import { registerModule } from '@vue-storefront/core/lib/modules'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'

export default {
  name: 'Home',
  components: {
    MainSlider,
    Onboard,
    ProductListing,
    ProductsSlider,
    PromotedOffers,
    TileLinks,
    LazyHydrate
  },
  data () {
    return {
      loading: true,
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
    ...mapGetters('homepage', ['getEverythingNewCollection', 'getSalesCollection']),
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.some(
        field => ['homepage', 'homepage.new_collection', 'homepage.sales_collection'].includes(field)
      )
    }
  },
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' })
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    if (context) context.output.cacheTags.add(`home`)
    Logger.info('Calling asyncData in Home Page (core)')()

    await Promise.all([
      store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('homepage/fetchSalesCollection')
    ])
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm =>
        Promise.all([
          vm.$store.dispatch('homepage/fetchNewCollection'),
          vm.$store.dispatch('homepage/fetchSalesCollection')
        ]).then(res => {
          vm.loading = false
        })
      )
    } else {
      next()
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
</script>
