<template>
  <button
    @click="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
    class="inline-flex items-center text-grey-dark"
    type="button"
    data-testid="addToWishlist"
  >
    <svg viewBox="0 0 25 25" class="vt-icon pr-1">
      <use xlink:href="#wishlist"/>
    </svg>
    <template v-if="!isOnWishlist">
      {{ $t('Add to Wishlist') }}
    </template>
    <template v-else>
      {{ $t('Remove') }}
    </template>
  </button>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  }
}
</script>
