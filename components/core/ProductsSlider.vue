<template>
  <div class="collection container">
    <header class="mb-6">
      <h2 class="text-center">
        {{ title }}
      </h2>
    </header>
    <no-ssr>
      <carousel v-bind="config" @pageChange="setMuted">
        <slide
          v-for="product in products"
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
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'

import ProductTile from 'theme/components/core/ProductTile'

export default {
  name: 'ProductsSlider',
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    Slide,
    Carousel,
    ProductTile,
    'no-ssr': NoSSR
  },
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="scss">
.product {
  &.collection-product {
    padding: 0;
  }
}

.collection-product {
  .product-link {
    @apply px-sm;
  }

  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
      vertical-align: bottom;
    }
  }
}

.VueCarousel {
  .VueCarousel-dot {
    line-height: 1;

    &:focus {
      outline: none;
    }
  }
}
</style>
