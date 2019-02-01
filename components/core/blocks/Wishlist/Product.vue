<template>
  <li class="row mb-3 pb-3 border-b border-grey-light relative">
    <div class="col-auto mr-4 bg-grey-lightest">
      <div @click="closeWishlist">
        <router-link :to="localizedRoute({
          name: product.type_id + '-product',
          params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
        })">
          <img class="image" v-lazy="thumbnail" >
        </router-link>
      </div>
    </div>
    <div class="col-grow flex-col justify-start sm:justify-between">
      <div>
        <div class="font-medium leading-6">
          <div @click="closeWishlist">
            <router-link
              class="text-black product-title"
              :to="localizedRoute({
                name: product.type_id + '-product',
                params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
            })">
              {{ product.name | htmlDecode }}
            </router-link>
          </div>
        </div>
        <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
          {{ product.sku }}
        </div>
      </div>
    </div>
    <div class="col-auto font-bold text-right leading-6">
      <div class="text-error" v-if="product.special_price">
        {{ product.priceInclTax | price }}
      </div>
      <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
        {{ product.originalPriceInclTax | price }}
      </div>
      <div class="text-grey-dark" v-if="!product.special_price" data-testid="productPrice">
        {{ product.priceInclTax | price }}
      </div>
    </div>
    <div class="absolute pin-b pin-r mb-3">
      <span @click="removeFromWishlist(product)"><remove-button class="cl-accent" /></span>
    </div>
  </li>

</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import RemoveButton from './RemoveButton'

export default {
  components: {
    RemoveButton
  },
  mixins: [Product]
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
</style>
