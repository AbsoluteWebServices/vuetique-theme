<template>
  <div class="links py-3">
    <div class="between-md" v-for="(productLink, index) in products" :key="index">
      <div class="py-2" v-if="productLink.product">
        <div class="row mb-1">
          <h4 class="col-8">{{ productLink.product.name | htmlDecode }}</h4>
          <div class="col-4 text-right text-grey-dark font-medium">
            <div v-if="productLink.product.special_price && productLink.product.priceInclTax && productLink.product.originalPriceInclTax">
              <span class="text-primary mr-2">{{ productLink.product.priceInclTax | price }}</span>&nbsp;
              <span class="line-through" >{{ productLink.product.originalPriceInclTax | price }}</span>
            </div>
            <div v-if="!productLink.product.special_price && productLink.product.priceInclTax">
              {{ productLink.product.priceInclTax | price }}
            </div>
          </div>
        </div>

        <qty-input v-if="productLink.product" v-model.number="productLink.product.qty"/>
      </div>
    </div>
  </div>
</template>

<script>
import QtyInput from 'theme/components/theme/QtyInput'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {
    QtyInput
  }
}
</script>
