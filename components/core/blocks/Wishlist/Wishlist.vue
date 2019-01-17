<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8" :class="{ active: isWishlistOpen }">
    <button
      type="button"
      class="absolute pin-t pin-r m-3"
      @click="closeWishlist"
      data-testid="closeWishlist"
    >
      <i class="material-icons text-h4 text-grey-dark">
        close
      </i>
    </button>

    <h2 v-if="productsInWishlist.length" class="mb-8">
      {{ $t('Wishlist') }}
    </h2>

    <h4 v-if="!productsInWishlist.length" class="mb-2">
      {{ $t('Your wishlist is empty.') }}
    </h4>

    <div v-if="!productsInWishlist.length" class="mb-2">
      {{ $t("Don't hesitate and") }}
      <router-link :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul class="products p-0 m-0">
      <product v-for="product in productsInWishlist" :key="product.id" :product="product" />
    </ul>
  </div>
</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    Product
  },
  mixins: [Wishlist]
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
</style>
