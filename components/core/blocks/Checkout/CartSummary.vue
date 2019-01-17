<template>
  <div>
    <div class="brdr-bottom-1 brdr-cl-primary pb60">
      <h3 class="cl-accent mb-6 summary-title">
        {{ $t('Order Summary') }}
      </h3>
      <product v-for="product in productsInCart" :key="product.sku" :product="product"/>

      <div v-if="productsInCart && productsInCart.length" class="checkout mt-8">

        <div v-for="(segment, index) in totals" :key="index" class="flex flex-wrap justify-between mb-3 text-grey-dark" v-if="segment.code !== 'grand_total'">
          <div class="w-3/4">
            {{ segment.title }}:
          </div>
          <div v-if="segment.value != null" class="w-1/4 text-right" :class="({ 'text-primary': (segment.code == 'discount') })">
            {{ segment.value | price }}
          </div>
        </div>

        <div class="flex flex-wrap justify-between mb-3" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="w-3/4 text-h2 font-serif font-medium">
            {{ segment.title }}:
          </div>
          <div class="w-1/4 text-right text-h2 font-serif font-medium">
            {{ segment.value | price }}
          </div>
        </div>
      </div>
    </div>
    <!--Toggler row-->
    <div class="pt-5 mt-5 border-t">
      <h2 class="mb-3 text-h2">
        {{ $t('Safety') }}
      </h2>
      <div class="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
      <h2 class="mb-3 text-h2">
        {{ $t('Shipping') }}
      </h2>
      <div class="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
      <h2 class="mb-3 text-h2">
        {{ $t('Returns') }}
      </h2>
      <div class="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.
      </div>
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import Product from './Product'

export default {
  components: {
    Product
  },
  mixins: [CartSummary]
}
</script>

<style lang="scss" scoped>
  .summary-title {
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
</style>
