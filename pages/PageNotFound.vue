<template>
  <div id="page_not_found">
    <section class="bg-grey-lighter py-12 px-12">
      <div class="container">
        <div class="text-center mb-20">
          <img src="/assets/icons/404.svg" alt="404">
        </div>
        <h2 class="text-center">
          {{ $t("We can't find the page") }}
        </h2>
        <div class="text-center mt-10">
          <p>
            {{ $t("Unfortunately we can't find the page you are looking for.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can write to us through') }}
            <router-link :to="localizedRoute('/contact')" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </router-link>.
          </p>
          <p>
            {{ $t('You can also use') }}
            <a href="#" class="cl-secondary no-underline" @click="toggleSearchpanel">
              {{ $t('search') }}
            </a>
            {{ $t('to find product you were looking for.') }}
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
import PageNotFound from '@vue-storefront/core/pages/PageNotFound'
import ProductTile from 'theme/components/core/ProductTile.vue'
import { Carousel, Slide } from 'vue-carousel'
import NoSSR from 'vue-no-ssr'

export default {
  name: 'PageNotFound',
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
  mixins: [PageNotFound]
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
