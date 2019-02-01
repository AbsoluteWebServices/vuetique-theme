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
            <div class="flex">
              <div v-if="gallery.length > 1" class="product-thumbnails w-1/12 hidden md:block">
                <ul class="list-reset">
                  <li
                    v-for="(images, key) in gallery"
                    :key="images.src"
                    class="mb-1 bg-grey-lighter"
                  >
                    <img
                      :src="images.src"
                      ref="images"
                      @click="$refs.gallery.$refs.carousel.goToPage(key)"
                      :alt="product.name"
                      class="block border cursor-pointer"
                      :class="currentGalleryPage === key ? 'border-black' : 'border-grey-light'">
                  </li>
                </ul>
              </div>

              <div class="w-full md:w-11/12">
                <product-gallery
                  ref="gallery"
                  :gallery="gallery"
                  :offline="offlineImage"
                  :configuration="configuration"
                  :product="product"
                  @page-change="(page) => currentGalleryPage = page"
                />
              </div>
            </div>
          </div>
          <div class="w-full md:w-2/5 md:px-10">
            <h1 data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <div class="text-grey text-sm mb-3 uppercase">
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
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()] ? configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label : null }}
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
                        target="_blank"
                        v-if="option.label == 'Size'"
                        class="text-sm font-medium text-black pt-4 absolute pin-t pin-r"
                      >
                        {{ $t('Size guide') }}
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
            <div class="flex mt-6 pb-5 border-b">
              <qty-input
                v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'"
                v-model.number="product.qty"
                class="mr-5"
                size="lg"/>

              <div class="flex-grow flex">
                <add-to-cart
                  :product="product"
                  class="py-3 text-sm"
                />
              </div>
            </div>

            <div class="row text-sm md:py-5 text-center add-to-buttons">
              <div class="col-6">
                <wishlist-button :product="product" />
              </div>
              <div class="col-6">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="inline-flex items-center text-grey-dark"
                  type="button"
                  data-testid="addToCompare"
                >
                  <svg viewBox="0 0 25 25" class="vt-icon pr-1">
                    <use xlink:href="#compare"/>
                  </svg>
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

    <div class="container my-4">
      <div class="border-b border-grey-light mt-5 pb-5" />

      <div class="border-b border-grey-light mt-5 pb-5">
        <h3 @click.prevent="detailsAccordion != 'details' ? detailsAccordion = 'details' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Product details') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'details'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'details'" class="details mt-10">
            <div
              class="details-wrapper"
              :class="{'details-wrapper--open': detailsOpen}"
            >
              <div
                class="text-h5 leading-loose"
                itemprop="description"
                v-html="product.description"
              />
              <div
                class="details-overlay"
                @click="showDetails"
              />
            </div>
          </section>
        </transition>
      </div>
      <div class="border-b border-grey-light mt-5 pb-5">
        <h3 @click.prevent="detailsAccordion != 'specs' ? detailsAccordion = 'specs' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Specifications') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'specs'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'specs'" class="specs mt-10">
            <ul class="p-0 m-0 my-2 md:my-0 leading-normal attributes">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </section>
        </transition>
      </div>

      <div class="border-b border-grey-light mt-5 pb-5">
        <h3 @click.prevent="detailsAccordion != 'reviews' ? detailsAccordion = 'reviews' : detailsAccordion = null" class="flex justify-between cursor-pointer font-normal">
          <span>{{ $t('Reviews') }}</span>
          <svg viewBox="0 0 25 25" class="vt-icon">
            <use v-if="detailsAccordion != 'reviews'" xlink:href="#down" />
            <use v-else xlink:href="#up" />
          </svg>
        </h3>
        <transition name="fade">
          <section v-show="detailsAccordion == 'reviews'" class="mt-10"><reviews v-show="OnlineOnly" /></section>
        </transition>
      </div>
    </div>

    <related-products
      type="upsell"
      :heading="$t('We found other products you might like')"
    />
    <promoted-offers collection="productBanners" class="my-8 px-6" />
    <related-products type="related" />

    <div class="container my-4">
      <recently-viewed />
    </div>

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
import RecentlyViewed from 'theme/components/core/blocks/MyAccount/RecentlyViewed'

import focusClean from 'theme/components/theme/directives/focusClean'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import QtyInput from 'theme/components/theme/QtyInput'

export default {
  components: {
    'WishlistButton': () => import(/* webpackChunkName: "wishlist" */'theme/components/core/blocks/Wishlist/AddToWishlist'),
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
    SizeSelector,
    RecentlyViewed,
    QtyInput
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: false,
      detailsAccordion: null,
      currentGalleryPage: 0
    }
  },
  directives: { focusClean },
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
.error {
  @apply text-error font-bold pb-4;
}

.price {
  @apply border-solid border-b;
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
  p {
    @apply mb-3 text-error;
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
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
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

.product-thumbnails {
  ul {
    li {
      img {
        mix-blend-mode: multiply;
        opacity: .9;
      }
    }
  }
}

</style>
