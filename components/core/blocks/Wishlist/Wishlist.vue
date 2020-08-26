<template>
  <div class="wishlist right-sidebar max-w-full fixed p-8 pt-10" :class="{ active: isWishlistOpen }">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeWishlist"
      data-testid="closeWishlist"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close"/>
      </svg>
    </button>

    <h2 v-if="productsInWishlist.length" class="mb-8">
      {{ $t('Wishlist') }}
    </h2>

    <h4 v-if="!productsInWishlist.length" class="mb-2">
      {{ $t('Your wishlist is empty.') }}
    </h4>

    <div v-if="!productsInWishlist.length" class="mb-2">
      {{ $t("Don't hesitate and") }}
      <router-link class="text-primary" :to="localizedRoute('/')" @click.native="closeWishlist">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul class="products p-0 m-0">
      <product v-for="wishlistProduct in productsInWishlist" :key="wishlistProduct.id" :product="wishlistProduct" />
    </ul>
  </div>
</template>

<script>
import { Wishlist } from '@vue-storefront/core/modules/wishlist/components/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

export default {
  name: 'Wishlist',
  components: {
    Product
  },
  mixins: [ Wishlist, onEscapePress ],
  methods: {
    onEscapePress () {
      this.closeWishlist()
    },
    closeWishlist () {
      this.$store.dispatch('ui/closeWishlist')
    }
  }
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
