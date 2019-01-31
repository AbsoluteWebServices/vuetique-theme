<template>
  <div class="row gutter-md justify-center md:justify-start">
    <div
      v-for="product in products"
      :key="product.id"
      class="col-6"
      :class="['md:col-' + (12/columns)%10]"
    >
      <product-tile :product="product"/>
    </div>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
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
  }
}
</script>
