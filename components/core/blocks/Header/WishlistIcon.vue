<template>
  <button
    type="button"
    class="bg-transparent border-0"
    @click="toggleWishlist"
    data-testid="wishlist-icon"
    :aria-label="$t('Open wishlist')"
  >
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#wishlist" />
    </svg>
  </button>
</template>

<script>
import { WishlistButton } from '@vue-storefront/core/modules/wishlist/components/WishlistButton'

export default {
  name: 'WishlistIcon',
  mixins: [ WishlistButton ]
}
</script>
