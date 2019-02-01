<template>
  <div id="page_not_found">
    <section class="bg-grey-lighter py-12 px-12">
      <div class="container">
        <div class="text-center mb-20">
          <img src="/assets/icons/500.svg" alt="500">
        </div>
        <h2 class="text-center">
          {{ $t("Something went wrong ...") }}
        </h2>
        <div class="text-center mt-10">
          <p>
            {{ $t("We've noticed Internal Server Error while rendering this request.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can write to us through') }}
            <router-link :to="localizedRoute('/contact')" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </router-link>.
          </p>
        </div>
      </div>
    </section>
    <section class="mb-20">
      <div class="container">
        <section class="container">
          <header class="col-md-12 py-4 mt-12 mb-6">
            <h2 class="text-center text-h2">
              {{ $t('See our bestsellers') }}
            </h2>
          </header>
          <div class="flex mb-6">
            <div class="w-full">
              <div class="justify-center cool-stuff-collection">
                <no-ssr>
                  <carousel v-bind="config">
                    <slide
                      v-for="product in ourBestsellersCollection"
                      :key="product.id"
                    >
                      <product-tile
                        class="collection-product"
                        :product="product"
                        :labels-active="false"
                      />
                    </slide>
                  </carousel>
                </no-ssr>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import Error from '@vue-storefront/core/pages/Error'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'

import ProductTile from 'theme/components/core/ProductTile.vue'

export default {
  name: 'Error',
  data () {
    return {
      config: {
        perPageCustom: [[576, 2], [1024, 4]],
        paginationEnabled: true,
        loop: false,
        paginationSize: 6
      }
    }
  },
  computed: {
    ourBestsellersCollection () {
      return this.$store.state.homepage.bestsellers
    }
  },
  components: {
    Slide,
    Carousel,
    ProductTile,
    'no-ssr': NoSSR
  },
  methods: {
    toggleSearchpanel () {
      document.querySelector('#search input[type="text"]').focus()
    }
  },
  mixins: [Error],
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      let ourBestsellersQuery = prepareQuery({ queryConfig: 'bestSellers' })
      store.dispatch('category/list', {}).then(categories => {
        store.dispatch('product/list', {
          query: ourBestsellersQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(res => {
          if (res) {
            store.state.homepage.bestsellers = res.items
            EventBus.$emitFilter('errorpage-after-load', { store: store, route: route }).then(results => {
              return resolve()
            }).catch(err => {
              console.error(err)
              return resolve()
            })
          }
        })
      })
    })
  }
}
</script>

<style scoped lang="scss">
  a {
    @apply .font-medium .text-black;

    &:hover {
      @apply text-primary;
    }
  }
</style>
