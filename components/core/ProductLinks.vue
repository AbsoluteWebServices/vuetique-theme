<template>
  <div class="links py10">
    <div class="between-md" v-for="(productLink, index) in products" :key="index">
      <div class="py-2" v-if="productLink.product">
        <div class="row">
          <h4 class="m2">{{ productLink.product.name | htmlDecode }}</h4>
          <div class="col-xs-4 cl-bg-tertiary">
            <div v-if="productLink.product.special_price && productLink.product.priceInclTax && productLink.product.originalPriceInclTax">
              <span class="price-special">{{ productLink.product.priceInclTax | price }}</span>&nbsp;
              <span class="price-original" >{{ productLink.product.originalPriceInclTax | price }}</span>
            </div>
            <div v-if="!productLink.product.special_price && productLink.product.priceInclTax">
              {{ productLink.product.priceInclTax | price }}
            </div>
          </div>
        </div>

        <div v-if="productLink.product">
          <label class="qty-label">{{ $t('Quantity') }}</label>
          <div class="flex">
            <input
              type="text"
              class="border border-solid border-grey text-sm text-grey px-3 h-10 bg-white outline-none focus:text-grey-dark"
              min="1"
              autofocus
              v-model.number="productLink.product.qty"
            >
            <div class="input-number-controls">
              <button class="p-5 border border-light-gray" @click.prevent="productLink.product.qty++">
                <svg viewBox="0 0 15 15" class="vt-icon"><use xlink:href="#up" /></svg>
              </button>
              <button class="p-5 border border-light-gray" @click.prevent="productLink.product.qty > 1 ? productLink.product.qty-- : null">
                <svg viewBox="0 0 25 25" class="vt-icon"><use xlink:href="#down" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.product-qty {
  border-style: solid;
  border-width: 0 0 1px 0;
  width: 90px;
}
.qty-label {
  font-size: 12px !important;
  padding-left: 0px !important;
}
</style>
