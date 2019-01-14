<template>
  <div
    class="product w-full pb-5"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="block no-underline product-link"
      :to="localizedRoute({
        name: product.type_id + '-product',
        params: {
          parentSku: product.parentSku ? product.parentSku : product.sku,
          slug: product.slug,
          childSku: product.sku
        }
      })"
      data-testid="productLink"
    >
      <div
        class="product-image w-full relative bg-grey-lightest"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]">
        <img
          :alt="product.name"
          :src="thumbnailObj.loading"
          v-lazy="thumbnailObj"
          height="300"
          width="310"
          data-testid="productImage"
        >
      </div>

      <p class="mb-0 font-medium text-grey-dark hover:text-primary mt-3" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <div class="mt-1 text-grey-dark font-medium">
        <span
          class="text-primary mr-2"
          v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
        >
          {{ product.priceInclTax | price }}
        </span>

        <span
          class="line-through"
          v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0 && !onlyImage"
        >
          {{ product.originalPriceInclTax | price }}
        </span>

        <span
          v-if="!product.special_price && parseFloat(product.priceInclTax) > 0 && !onlyImage"
        >
          {{ product.priceInclTax | price }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'

export default {
  mixins: [ProductTile],
  props: {
    labelsActive: {
      type: Boolean,
      requred: false,
      default: true
    },
    onlyImage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (rootStore.state.config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);

.product {
  @media (max-width: 767px) {
    padding-bottom: 10px;
  }
}

%label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: $border-secondary;
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
}

.product-image {
  overflow: hidden;
  max-height: 300px;

  &:hover {
    img {
      opacity: 1;
      transform: scale(1.1);
    }

    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    opacity: 0.8;
    transform: scale(1);
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
      from {
        opacity: 0;
      }
      to {
        opacity: 0.8;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      content: 'New';
    }
  }
}
</style>
