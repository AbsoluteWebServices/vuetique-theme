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

        <div v-if="productLink.product">
          <label class="hidden">{{ $t('Quantity') }}</label>
          <div class="flex">
            <input
              type="text"
              class="qty-input-sm"
              min="1"
              autofocus
              v-model.number="productLink.product.qty"
            >
            <div class="input-number-controls">
              <button @click.prevent="productLink.product.qty++">
                <svg viewBox="0 0 15 15" class="vt-icon"><use xlink:href="#up" /></svg>
              </button>
              <button @click.prevent="productLink.product.qty > 1 ? productLink.product.qty-- : null">
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
