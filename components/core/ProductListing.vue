<template>
  <div class="product-listing flex flex-wrap justify-center md:justify-start -mx-4">
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="sm:w-1/2 flex px-4"
      :class="['md:w-1/' + columns, wide(product.sale, product.new, key)]"
    >
      <product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
let lastHero = 0
export default {
  name: 'ProductListing',
  components: {
    ProductTile
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    wide (isOnSale, isNew, index) {
      let deltaCondition = index > 0 && ((index - 1) - lastHero) % 2 === 0
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && (index - lastHero) % 2 !== 0)
      if (isHero) {
        lastHero = index
      }
      return isHero ? 'w-full' : 'w-1/2'
    }
  }
}
</script>
