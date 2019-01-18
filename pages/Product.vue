<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <breadcrumbs
      :routes="breadcrumbs.routes"
      :active-route="breadcrumbs.name"
    />
    <section class="bg-grey-lightest">
      <div class="container">
        <section class="md:flex">
          <div class="w-full md:w-3/5">
            <product-gallery
              :gallery="gallery"
              :offline="offlineImage"
              :configuration="configuration"
              :product="product"
            />
          </div>
          <div class="w-full md:w-2/5 md:px-10">
            <h1 data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <div class="text-grey text-sm my-4 uppercase">
              sku: {{ product.sku }}
            </div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="font-serif font-bold text-h1 pb-5 price"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="text-h1"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="font-bold">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="text-h2 text-grey line-through">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.priceInclTax * product.qty | price }}
                </div>
              </div>
              <div
                class="variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <div
                  class="relative"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class="pt-4 pb-2" data-testid="variantsLabel">
                    <span class="font-bold">{{ option.label }}</span>:
                    <span>
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }}
                    </span>
                  </div>
                  <div class="variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="(c, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(c)"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="{ active: c.id == configuration[option.attribute_code].id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <router-link
                        to="/size-guide"
                        v-if="option.label == 'Size'"
                        class="text-sm text-grey-dark pt-4 absolute pin-t pin-r"
                      >
                        <i class="text-sm material-icons relative" style="top: 1px">accessibility</i>
                        <span>
                          {{ $t('Size guide') }}
                        </span>
                      </router-link>
                      <size-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"

                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"

                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="mt-4 pb-4 border-b" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
              <label class="pb-2 block" for="quantity">{{ $t('Quantity') }}</label>
              <div class="flex -mx-2">
                <div class="px-2 w-1/3">
                  <input
                    type="number"
                    min="0"
                    class="text-center h-full w-full qty-input py-3 px-2"
                    id="quantity"
                    focus
                    v-model="product.qty"
                  >
                </div>
              </div>
            </div>
            <div class="flex mb-3">
              <div class="w-full">
                <add-to-cart
                  :product="product"
                  class="bg-primary py-3 text-sm"
                />
              </div>
            </div>
            <div class="flex text-sm md:py-5 text-center add-to-buttons">
              <div class="w-1/2 px-2">
                <button
                  @click="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)"
                  class="inline-flex items-center"
                  type="button"
                  data-testid="addToWishlist"
                >
                  <svg viewBox="0 0 25 25" class="vt-icon pr-1">
                    <use xlink:href="#wishlist"/>
                  </svg>
                  <template v-if="!isOnWishlist">
                    {{ $t('Add to favorite') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove') }}
                  </template>
                </button>
              </div>
              <div class="w-1/2 px-2">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="inline-flex items-center"
                  type="button"
                  data-testid="addToCompare"
                >
                  <i class="pr-1 material-icons">bar_chart</i>
                  <template v-if="!isOnCompare">
                    {{ $t('Add to compare') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove from compare') }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="container details">
      <h2 class="py-4 details-title">
        {{ $t('Product details') }}
      </h2>
      <div
        class="details-wrapper"
        :class="{'details-wrapper--open': detailsOpen}"
      >
        <div class="md:flex">
          <div class="md:w-2/3">
            <div
              class="text-h5 leading-normal"
              itemprop="description"
              v-html="product.description"
            />
          </div>
          <div class="md:px-5 md:w-1/3">
            <ul class="p-0 m-0 my-2 md:my-0 leading-normal attributes">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </div>
          <div
            class="details-overlay"
            @click="showDetails"
          />
        </div>
      </div>
    </section>
    <reviews v-show="OnlineOnly"/>
    <related-products
      type="upsell"
      :heading="$t('We found other products you might like')"
    />
    <promoted-offers single-banner />
    <related-products type="related" />
  </div>
</template>

<script>
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductTile from 'theme/components/core/ProductTile.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  components: {
    AddToCart,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    ProductTile,
    PromotedOffers,
    RelatedProducts,
    Reviews,
    SizeSelector
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: false
    }
  },
  directives: { focusClean },
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    },

    isOnWishlist () {
      return !!this.$store.state.wishlist.items.find(p => p.sku === this.product.sku) || false
    }
  },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}

.price {
  @apply .border-solid .border-b;
  -webkit-font-smoothing: antialiased;
}

.variants-wrapper {
 .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.qty-input {
  @apply .border .border-grey;
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
