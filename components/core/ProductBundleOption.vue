<template>
  <div class="custom-option mb-5">
    <h4 class="mb-2"> {{ option.title }} </h4>
    <div class="relative" v-for="opval in option.product_links" :key="opval.id">
      <div class="checkbox-wrap">
        <input
          type="radio"
          :name="bundleOptionName + opval.id"
          :id="bundleOptionName + opval.id"
          focus
          :value="opval.id"
          v-model="productOptionId"
        >
        <label v-if="opval.product" class="" :for="bundleOptionName + opval.id" v-html="opval.product.name" />
      </div>
    </div>
    <div class="mb-2">
      <label class="hidden" :for="quantityName">{{ $t('Quantity') }}</label>
      <div class="flex">
        <input
          type="text"
          min="0"
          class="qty-input-sm"
          :name="quantityName"
          :id="quantityName"
          focus
          v-model="quantity"
        >
        <div class="input-number-controls">
          <button @click.prevent="quantity++">
            <svg viewBox="0 0 15 15" class="vt-icon"><use xlink:href="#up" /></svg>
          </button>
          <button @click.prevent="quantity > 1 ? quantity-- : null">
            <svg viewBox="0 0 25 25" class="vt-icon"><use xlink:href="#down" /></svg>
          </button>
        </div>
      </div>
    </div>
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { ProductBundleOption } from '@vue-storefront/core/modules/catalog/components/ProductBundleOption.ts'

export default {
  mixins: [ProductBundleOption]
}
</script>
