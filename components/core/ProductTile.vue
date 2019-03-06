<template>
  <div
    class="product w-full pb-2 md:pb-5"
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
        class="product-image w-full relative"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]">
        <img
          :alt="product.name"
          :src="thumbnailObj.loading"
          v-lazy="thumbnailObj"
          height="300"
          width="310"
          data-testid="productImage"
          :class="{ 'default-image': hoverThumbnail !== null }"
        >
        <img
          v-if="hoverThumbnail !== null"
          :alt="product.name"
          :src="hoverThumbnailObj.loading"
          v-lazy="hoverThumbnailObj"
          height="300"
          width="310"
          data-testid="productHoverImage"
          class="hover-image"
        >
      </div>

      <p class="product-name mb-0 font-medium text-grey-dark mt-3" v-if="!onlyImage">
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
import rootStore from '@vue-storefront/core/store'
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
  computed: {
    hoverThumbnail () {
      if (this.product.media_gallery) {
        let images = this.product.media_gallery.filter(item => item.typ === 'image')
        if (images.length > 1) {
          let thumbnail = images[images.length - 1].image
          for (let i = 0; i < images.length; i++) {
            if (images[i].lab === 'alternative') {
              thumbnail = images[i].image
              break
            }
          }
          return this.getThumbnail(thumbnail, 310, 300)
        }
      }
      return null
    },
    hoverThumbnailObj () {
      return {
        src: this.hoverThumbnail,
        loading: this.thumbnail,
        error: this.thumbnail
      }
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

%label {
  @apply text-xs font-medium tracking-sm absolute pin-t pin-l flex justify-center items-center uppercase border border-solid;

  padding: 7px 10px;
  line-height: 8px;
}

.product-image {
  @apply flex bg-grey-lightest;
  overflow: hidden;

  .hover-image {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: visibility $duration-main $motion-main, opacity $duration-main $motion-main;
  }

  &:hover {
    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }

    .hover-image {
      visibility: visible;
      opacity: 1;
    }

    .default-image {
      opacity: 0;
    }
  }

  img {
    display: block;
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    transition: opacity $duration-main $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  &.sale {
    &::after {
      @extend %label;
      @apply m-1 text-error border-error-lighter bg-error-lightest;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      @apply m-1 text-primary border-primary-lighter bg-primary-lightest;
      content: 'New';
    }
  }
}

.product-link {
  .product-name {
    transition: color $duration-main $motion-main;
  }

  &:hover {
    .product-name {
      @apply text-primary;
    }
  }
}
</style>
