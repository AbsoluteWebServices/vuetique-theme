<template>
  <li class="row mb-3 pb-3 border-b border-grey-light relative">
    <div class="col-auto mr-4 bg-grey-lightest" @click="closeWishlist">
      <router-link :to="productLink">
        <product-image :image="image" />
      </router-link>
    </div>
    <div class="col-grow flex-col justify-start sm:justify-between">
      <div @click="closeWishlist">
        <div class="font-medium leading-6">
          <router-link class="text-black product-title" :to="productLink">
            {{ product.name | htmlDecode }}
          </router-link>
        </div>
        <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
          {{ product.sku }}
        </div>
        <div v-if="showAddToCart">
          <add-to-cart
            v-if="product.type_id === 'simple'"
            :product="product"
            class="wishlist-add-to-cart col-12 sm:col-4 md:col-6"
          />
          <button-full
            v-else
            :link="productLink"
            class="wishlist-add-to-cart btn-primary col-12 sm:col-4 md:col-6"
          >
            {{ $t('Configure') }}
          </button-full>
        </div>
      </div>
    </div>
    <div class="col-auto font-bold text-right leading-6">
      <div class="text-error" v-if="product.special_price">
        {{ product.price_incl_tax | price(storeView) }}
      </div>
      <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
        {{ product.original_price_incl_tax | price(storeView) }}
      </div>
      <div class="text-grey-dark" v-if="!product.special_price" data-testid="productPrice">
        {{ product.price_incl_tax | price(storeView) }}
      </div>
    </div>
    <div class="absolute bottom-0 right-0 mb-5">
      <span @click="removeFromWishlist(product)"><remove-button class="cl-accent" /></span>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import ProductImage from 'theme/components/core/ProductImage'
import RemoveButton from './RemoveButton'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import AddToCart from 'theme/components/core/AddToCart'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    RemoveButton,
    ProductImage,
    AddToCart,
    ButtonFull
  },
  mixins: [Product],
  props: {
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.removeFromWishlist(product)
    }
  }
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
