<template>
  <div class="custom-option mb15">
    <h4 class="mb-2"> {{ option.title }} </h4>
    <div class="m5 relative" v-for="opval in option.product_links" :key="opval.id">
      <div class="checkbox-wrap">
        <input
          type="radio"
          class=""
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
      <label class="qty-label flex" :for="quantityName">{{ $t('Quantity') }}</label>
      <div class="flex">
        <input
          type="text"
          min="0"
          class="border border-solid border-grey text-sm text-grey px-3 h-10 bg-white outline-none focus:text-grey-dark"
          :name="quantityName"
          :id="quantityName"
          focus
          v-model="quantity"
        >
        <div class="input-number-controls">
          <button class="p-5 border border-light-gray" @click.prevent="quantity++">
            <svg viewBox="0 0 15 15" class="vt-icon"><use xlink:href="#up" /></svg>
          </button>
          <button class="p-5 border border-light-gray" @click.prevent="quantity > 1 ? quantity-- : null">
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

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-hover: color(tertiary, $colors-background);

  $bg-secondary: color(secondary, $colors-background);
  $color-secondary: color(secondary);
  $color-error: color(error);
  .qty-input {
    border-style: solid;
    border-width: 0 0 1px 0;
    width: 90px;
  }

  .custom-option > label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .error {
    color: $color-error;
    padding-top: 5px;
    display: block;
  }
  $color-silver: color(silver);
  $color-active: color(secondary);
  $color-white: color(white);

  .relative label.qty {
    padding-left: 5px;
  }

  .relative label {
    cursor: pointer;
    font-size: 16px;
    line-height: 30px;
  }
  input[type='text'] {
    transition: 0.3s all;
    &::-webkit-input-placeholder {
      color: $color-tertiary;
    }
    &::-moz-placeholder {
      color: $color-tertiary;
    }
    &:hover,
    &:focus {
      outline: none;
      border-color: $color-black;
    }
  }
  .qty-label {
    font-size: 12px !important;
    padding-left: 0px !important;
  }
</style>
