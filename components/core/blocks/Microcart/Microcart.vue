<template>
  <div
    class="right-sidebar microcart max-w-full fixed p-8 pt-10"
    data-testid="microcart"
  >
    <transition name="fade">
      <div v-if="isEditMode" class="overlay absolute top-0 bottom-0 left-0 right-0 z-overlay" @click="closeEditMode" />
    </transition>
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute top-0 right-0 m-4 h-4"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close" />
      </svg>
    </button>

    <h2 v-if="productsInCart.length" class="mb-8">
      {{ $t('Your cart') }}:
    </h2>

    <h4 v-if="!productsInCart.length" class="mb-2">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!productsInCart.length" @click="closeMicrocartExtend">
      {{ $t("Don't hesitate and") }}
      <router-link class="text-primary" :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul v-if="productsInCart.length" class="products p-0 m-0">
      <product v-for="product in productsInCart" :key="product.server_item_id || product.id" :product="product" />
    </ul>
    <div v-if="productsInCart.length" class="summary pt-8">
      <div v-for="(segment, index) in totals" :key="index" class="flex justify-between py-2 text-grey-dark font-medium" v-if="segment.code !== 'grand_total'">
        <div class="flex-grow mr-2">
          {{ segment.title }}
          <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="close delete-button" @click="clearCoupon">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div v-if="segment.value != null" class="" :class="{'text-primary': segment.code === 'discount'}">
          {{ segment.value | price(storeView) }}
        </div>
      </div>

      <div v-if="OnlineOnly" class="py-3 flex">
        <div class="mr-3 flex-grow">
          <base-input type="text" id="couponinput" :placeholder="$t('Add discount code')" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon"/>
        </div>
        <div>
          <button-full :disabled="!couponCode" @click.native="setCoupon">{{ $t('Apply') }}</button-full>
        </div>
      </div>

      <div class="row justify-between py-3 font-serif text-h2 font-bold" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-auto total-price-label">
          {{ segment.title }}
        </div>
        <div class="col-auto total-price-value">
          {{ segment.value | price(storeView) }}
        </div>
      </div>
    </div>

    <div v-if="productsInCart.length && !isCheckoutMode">
      <div
        class="row justify-between items-center py-4 actions"
      >
        <div class="col-12 md:col-auto">
          <router-link :to="localizedRoute('/')" class="no-underline text-grey link back-to-shopping font-medium flex items-center" @click.native="closeMicrocartExtend">
            <svg viewBox="0 0 25 25" class="vt-icon--xs mr-1"><use xlink:href="#left" /></svg>
            <span>{{ $t('Back to shopping') }}</span>
          </router-link>
        </div>
        <div class="col-12 md:col-auto">
          <button-full
            class="btn-primary py-3 px-6"
            :link="{ name: 'checkout' }"
            @click.native="closeMicrocartExtend"
          >
            {{ $t('Go to checkout') }}
          </button-full>
        </div>
      </div>

      <div v-if="isInstantCheckoutRegistered" class="py-4">
        <instant-checkout class="block w-full border-none rounded-none bg-primary px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-base uppercase" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { isModuleRegistered } from '@vue-storefront/core/lib/modules'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import InstantCheckout from 'src/modules/instant-checkout/components/InstantCheckout.vue'
import { registerModule } from '@vue-storefront/core/lib/modules'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Product from 'theme/components/core/blocks/Microcart/Product'
import EditMode from './EditMode'
import { InstantCheckoutModule } from 'src/modules/instant-checkout'

export default {
  components: {
    Product,
    ButtonFull,
    BaseInput,
    InstantCheckout
  },
  mixins: [
    VueOfflineMixin,
    EditMode,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      isInstantCheckoutRegistered: isModuleRegistered('InstantCheckoutModule')
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  beforeCreate () {
    registerModule(InstantCheckoutModule)
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      appliedCoupon: 'cart/getCoupon',
      totals: 'cart/getTotals',
      isOpen: 'cart/getIsMicroCartOpen'
    }),
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    ...mapActions({
      applyCoupon: 'cart/applyCoupon'
    }),
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.$store.dispatch('cart/removeCoupon')
      this.addCouponPressed = false
    },
    toggleMicrocart () {
      this.$store.dispatch('ui/toggleMicrocart')
    },
    async setCoupon () {
      const couponApplied = await this.applyCoupon(this.couponCode)
      this.addCouponPressed = false
      this.couponCode = ''
      if (!couponApplied) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    closeMicrocartExtend () {
      this.toggleMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.$store.dispatch('ui/closeMicrocart')
    },
    clearCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you would like to remove all the items from the shopping cart?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: { label: i18n.t('OK'),
          action: async () => {
            // We just need to clear cart on frontend and backend.
            // but cart token can be reused
            await this.$store.dispatch('cart/clear', { disconnect: false })
          }
        },
        hasNoTimeout: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }

  .overlay {
    background:rgba(0, 0, 0, 0.4);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
