<template>
  <transition name="fade" appear>
    <div
      class="product"
      v-observe-visibility="visibilityChanged"
    >
      <router-link
        class="row items-center border-t border-grey-lighter relative sm:px-3 py-2 sm:pr-4"
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
        <div class="col-auto mr-1 sm:mr-4 bg-grey-lightest">
          <div class="product-image w-full">
            <img
              :alt="product.name"
              :src="thumbnailObj.loading"
              v-lazy="thumbnailObj"
              class="image"
              data-testid="productImage"
            >
          </div>
        </div>
        <div
          class="col-grow flex flex-col justify-center self-stretch relative"
          :class="[{ sale: isOnSale }, { new: isNew }]">
          <span class="font-medium text-grey-dark leading-tight">
            {{ product.name | htmlDecode }}
          </span>
        </div>
        <div class="col-auto font-bold text-right">
          <span class="line-through text-grey mr-5" v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0">
            {{ product.originalPriceInclTax | price }}
          </span>
          <span class="text-error" v-if="product.special_price && parseFloat(product.special_price) > 0">
            {{ product.priceInclTax | price }}
          </span>
          <span class="text-grey-dark" v-if="!product.special_price && parseFloat(product.priceInclTax) > 0" data-testid="productPrice">
            {{ product.priceInclTax | price }}
          </span>
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script>
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'

export default {
  mixins: [ProductTile],
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
.product .row {
  flex-wrap: nowrap;
}

.image {
  mix-blend-mode: multiply;
  vertical-align: top;
  width: 60px;
}

%label {
  @apply text-xs font-medium tracking-sm absolute pin-t pin-l flex justify-center items-center uppercase border border-solid;

  padding: 4px 9px;
  line-height: 9px;

  @screen sm {
    padding: 7px 10px;
    line-height: 8px;
  }
}

.sale {
  @apply justify-start;
  padding-top: 19px;

  @screen sm {
    @apply pt-0 justify-center;
  }

  &::after {
    @extend %label;
    @apply text-error border-error-lighter bg-error-lightest;
    content: 'Sale';
  }
}

.new {
  @apply justify-start;
  padding-top: 19px;

  @screen sm {
    @apply pt-0 justify-center;
  }

  &::after {
    @extend %label;
    @apply text-primary border-primary-lighter bg-primary-lightest;
    content: 'New';
  }
}
</style>
