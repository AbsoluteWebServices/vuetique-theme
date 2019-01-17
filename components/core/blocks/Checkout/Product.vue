<template>
  <div class="flex flex-wrap checkout-product-item  pb-3 mb-3 border-b">
    <div class="w-1/4 px-2">
      <img class="blend" v-lazy="thumbnail">
    </div>
    <div class="w-3/4">
      <div class="w-full flex flex-wrap">
        <div class="w-3/4">
          <div class="font-medium cl-accent serif">{{ product.name | htmlDecode }}</div>
          <div class="text-grey-dark text-sm mt-1">{{ product.sku }}</div>
          <div class="text-sm mt-2 options" v-if="product.totals && product.totals.options">
            <div v-for="opt in product.totals.options" :key="opt.label">
              <span class="opn text-grey">{{ opt.label }}: </span>
              <span class="opv text-grey-dark" v-html="opt.value" />
            </div>
          </div>
          <div>
            <span class="text-sm">
              <span class="text-grey">{{ $t('Qty') }}:</span>
              <span class="weight-700 text-grey-dark">
                {{ product.qty }}
              </span>
            </span>
          </div>
        </div>
        <div class="w-1/4 text-right">
          <div v-if="!product.totals">
            <span class="text-error block font-medium" v-if="product.special_price">{{ product.priceInclTax * product.qty | price }} </span>
            <span class="price-original block text-sm text-grey-dark mt-1" v-if="product.special_price" >{{ product.originalPriceInclTax * product.qty | price }}</span>
            <span v-if="!product.special_price" class="h4">{{ product.priceInclTax * product.qty | price }}</span>
          </div>
          <div v-if="product.totals">
            <span class="text-error font-medium block" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }} </span>
            <span class="price-original block text-sm text-grey-dark mt-1" v-if="product.totals.discount_amount" >{{ product.totals.row_total_incl_tax | price }}</span>
            <span v-if="!product.totals.discount_amount" class="h4">{{ product.totals.row_total_incl_tax | price }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'

export default {
  mixins: [Product]
}
</script>

<style scoped>
.price-original {
  text-decoration: line-through;
}
.blend {
  mix-blend-mode: multiply;
}
</style>
