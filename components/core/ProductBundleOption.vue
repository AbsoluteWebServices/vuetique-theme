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
    <qty-input
      :id="quantityName"
      :name="quantityName"
      v-model.number="quantity"
      class="mb-2"/>
    <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { ProductBundleOption } from '@vue-storefront/core/modules/catalog/components/ProductBundleOption.ts'
import QtyInput from 'theme/components/theme/QtyInput'

export default {
  mixins: [ProductBundleOption],
  components: {
    QtyInput
  }
}
</script>
