<template>
  <transition name="fade" appear>
    <li class="mb-3 px-2 pb-3 border-b border-grey-light relative bg-white" :class="{ 'z-10': editMode }">
      <div class="py-2 mb-4 border-b border-grey-light flex justify-between items-center" v-if="editMode">
        <span class="text-grey-dark font-medium">Edit mode</span>
        <button class="border-0 bg-transparent" @click="closeEditMode">
          <svg viewBox="0 0 25 25" class="vt-icon--sm">
            <use xlink:href="#close" />
          </svg>
        </button>
      </div>
      <div class="flex">
        <router-link
          v-if="!editMode"
          class="mr-4 bg-grey-lightest self-start flex-grow"
          :to="productLink"
          data-testid="productLink"
          @click.native="$store.commit('ui/setMicrocart', false)"
        >
          <div class="blend">
            <product-image :image="image" />
          </div>
        </router-link>
        <div class="flex-grow flex-col justify-start sm:justify-between">
          <div>
            <router-link
              class="font-medium leading-6 product-title text-black"
              :to="productLink"
              data-testid="productLink"
              @click.native="$store.commit('ui/setMicrocart', false)"
            >
              {{ product.name | htmlDecode }}
            </router-link>
            <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
              {{ product.sku }}
            </div>
            <div class="text-sm leading-normal" v-if="isTotalsActive">
              <div v-for="opt in product.totals.options" :key="opt.label">
                <span class="text-grey">{{ opt.label }}: </span>
                <span class="text-grey-dark font-medium" v-html="opt.value" />
              </div>
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-else-if="!editMode && product.options">
              <div v-for="opt in product.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
            <div class="text-sm text-error font-medium" v-if="hasProductErrors">
              {{ product.errors | formatProductMessages }}
            </div>
            <div class="text-sm text-success font-medium" v-if="hasProductInfo && !hasProductErrors">
              {{ product.info | formatProductMessages }}
            </div>
          </div>
          <div class="pb-4 flex flex-wrap items-end" v-if="editMode">
            <div class="flex flex-wrap filters" v-if="productsAreReconfigurable">
              <div class="h5 pt5 w-100" v-for="(option, index) in product.configurable_options" :key="index">
                <div class="h6 cl-bg-tertiary mr10">
                  {{ option.label }}:
                </div>
                <div class="flex flex-wrap pt-1" v-if="option.label == 'Color' && editMode">
                  <color-selector
                    v-for="filter in getAvailableFilters[option.attribute_code]"
                    v-if="isOptionAvailable(filter)"
                    :key="filter.id"
                    :variant="filter"
                    :selected-filters="getSelectedOptions"
                    @change="changeEditModeFilter"
                  />
                </div>
                <div class="flex flex-wrap pt-1" v-else-if="option.label == 'Size' && editMode">
                  <size-selector
                    class="mr10 mb10"
                    v-for="filter in getAvailableFilters[option.attribute_code]"
                    v-if="isOptionAvailable(filter)"
                    :key="filter.id"
                    :variant="filter"
                    :selected-filters="getSelectedOptions"
                    @change="changeEditModeFilter"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="text-sm qty">
            <span class="text-grey">
              {{ $t('Qty') }}:
            </span>
            <span class="text-grey-dark font-medium" :class="{ hidden: editMode }" data-testid="productQty">
              {{ product.qty }}
            </span>
            <div v-show="editMode" class="inline-flex">
              <product-quantity
                :value="productQty"
                :max-quantity="maxQuantity"
                :loading="isStockInfoLoading"
                :is-simple-or-configurable="isSimpleOrConfigurable"
                @input="updateProductQty"
                @error="handleQuantityError"
              />
            </div>
          </div>
        </div>
        <div class="col-auto font-bold text-right leading-6">
          <div v-if="!displayItemDiscounts || !isOnline">
            <div class="text-error" v-if="product.special_price">
              {{ product.price_incl_tax * product.qty | price(storeView) }}
            </div>
            <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
              {{ product.original_price_incl_tax * product.qty | price(storeView) }}
            </div>
            <div class="text-grey-dark" v-else data-testid="productPrice">
              {{ (product.original_price_incl_tax ? product.original_price_incl_tax : product.price_incl_tax) * product.qty | price(storeView) }}
            </div>
          </div>
          <div v-else-if="isOnline && product.totals">
            <div class="text-error" v-if="product.totals.discount_amount">
              {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price(storeView) }}
            </div>
            <div class="line-through text-sm text-grey-dark" v-if="product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price(storeView) }}
            </div>
            <div class="text-grey-dark" v-if="!product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price(storeView) }}
            </div>
          </div>
          <div v-else class="text-grey-dark">
            {{ (product.regular_price || product.price_incl_tax) * product.qty | price(storeView) }}
          </div>
        </div>
        <div class="absolute bottom-0 right-0 mb-3 mr-2 flex">
          <template v-if="!editMode">
            <edit-button v-if="productsAreReconfigurable" @click="openEditMode" class="align-text-bottom mr-1" />
            <remove-button @click="removeItem" />
          </template>
          <button-full
            v-else
            class="update-button mb10 mr10"
            @click.native="updateProductVariant"
            :disabled="isUpdateCartDisabled"
          >
            {{ $t('Update') }}
          </button-full>
        </div>
      </div>
    </li>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

import ProductQuantity from 'theme/components/core/ProductQuantity.vue'
import ProductImage from 'theme/components/core/ProductImage'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import RemoveButton from './RemoveButton'
import EditButton from './EditButton'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption'
import { getThumbnailForProduct, getProductConfiguration } from '@vue-storefront/core/modules/cart/helpers'
import ButtonFull from 'theme/components/theme/ButtonFull'
import EditMode from './EditMode'

export default {
  components: {
    RemoveButton,
    ProductImage,
    ColorSelector,
    SizeSelector,
    EditButton,
    ButtonFull,
    ProductQuantity
  },
  mixins: [Product, ProductOption, EditMode],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      maxQuantity: 0,
      quantityError: false,
      isStockInfoLoading: false
    }
  },
  computed: {
    ...mapState({
      isMicrocartOpen: state => state.ui.microcart
    }),
    hasProductInfo () {
      return this.product.info && Object.keys(this.product.info).length > 0
    },
    hasProductErrors () {
      const errors = this.product.errors || {}
      const errorsValuesExists = Object.keys(errors).filter(errorKey => errors[errorKey]).length > 0
      return errorsValuesExists
    },
    isTotalsActive () {
      return this.isOnline && !this.editMode && this.product.totals && this.product.totals.options
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    productsAreReconfigurable () {
      return config.cart.productsAreReconfigurable && this.product.type_id === 'configurable' && this.isOnline
    },
    displayItemDiscounts () {
      return config.cart.displayItemDiscounts
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    thumbnail () {
      return getThumbnailForProduct(this.product)
    },
    configuration () {
      return getProductConfiguration(this.product)
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    editMode () {
      return this.getEditingProductId === this.product.id
    },
    productQty () {
      return this.editMode ? this.getEditingQty : this.product.qty
    },
    isSimpleOrConfigurable () {
      return ['simple', 'configurable'].includes(this.product.type_id)
    },
    isUpdateCartDisabled () {
      return this.quantityError ||
        this.isStockInfoLoading ||
        (this.isOnline && !this.maxQuantity && this.isSimpleOrConfigurable)
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    updateProductVariant () {
      this.updateVariant()
      this.closeEditMode()
    },
    updateProductQty (qty) {
      if (this.editMode) {
        this.editModeSetQty(qty)
        return
      }

      this.updateQuantity(qty)
    },
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
    updateQuantity (quantity) {
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
    },
    async getQuantity (product) {
      if (this.isStockInfoLoading) return // stock info is already loading
      this.isStockInfoLoading = true
      try {
        const validProduct = product || this.product
        const res = await this.$store.dispatch('stock/check', {
          product: validProduct,
          qty: this.productQty
        })
        return res.qty
      } finally {
        this.isStockInfoLoading = false
      }
    },
    handleQuantityError (error) {
      this.quantityError = error
    },
    async changeEditModeFilter (filter) {
      const editedProduct = this.getEditedProduct(filter)
      const maxQuantity = await this.getQuantity(editedProduct)
      if (!maxQuantity) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t(
            'The product is out of stock and cannot be added to the cart!'
          ),
          action1: { label: this.$t('OK') }
        })
      } else if (maxQuantity < this.productQty) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Only {maxQuantity} products of this type are available!', { maxQuantity }),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.maxQuantity = maxQuantity
        this.editModeSetFilters(filter)
      }
    }
  },
  watch: {
    isOnline: {
      async handler (isOnline) {
        if (isOnline) {
          const maxQuantity = await this.getQuantity()
          this.maxQuantity = maxQuantity
        }
      }
    },
    isMicrocartOpen: {
      async handler (isOpen) {
        if (isOpen) {
          const maxQuantity = await this.getQuantity()
          this.maxQuantity = maxQuantity
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.blend {
  mix-blend-mode: multiply;
}
</style>
