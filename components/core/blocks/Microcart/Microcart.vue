<template>
  <div
    class="right-sidebar microcart max-w-full fixed p-8 pt-10"
    :class="{ active: showMicrocart }"
    data-testid="microcart"
  >
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute pin-t pin-r m-4 h-4"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close"/>
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
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
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
          {{ segment.value | price }}
        </div>
      </div>

      <div v-if="OnlineOnly" class="py-3 flex">
        <div class="mr-3 flex-grow">
          <base-input type="text" id="couponinput" :placeholder="$t('Add discount code')" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon"/>
        </div>
        <div class="flex-auto">
          <button-full :disabled="!couponCode" @click.native="setCoupon">{{ $t('Apply') }}</button-full>
        </div>
      </div>

      <div class="row justify-between py-3 font-serif text-h2 font-bold" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-auto total-price-label">
          {{ segment.title }}
        </div>
        <div class="col-auto total-price-value">
          {{ segment.value | price }}
        </div>
      </div>
    </div>

    <div
      class="row justify-between items-center py-4 actions"
      v-if="productsInCart.length && !isCheckoutMode"
    >
      <div class="col-12 md:col-auto">
        <router-link :to="localizedRoute('/')" class="no-underline text-grey link back-to-shopping font-medium">
          <span @click="closeMicrocartExtend" class="block align-middle">
            <svg viewBox="0 0 25 25" class="vt-icon--xs align-middle"><use xlink:href="#left" /></svg>
            <span class="align-middle">{{ $t('Back to shopping') }}</span>
          </span>
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
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import Product from 'theme/components/core/blocks/Microcart/Product'

export default {
  components: {
    Product,
    ButtonFull,
    ButtonOutline,
    BaseInput
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    showMicrocart () {
      return this.isMicrocartOpen && this.componentLoaded
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.removeCoupon()
      this.addCouponPressed = false
    },
    setCoupon () {
      this.applyCoupon(this.couponCode).then(() => {
        this.addCouponPressed = false
        this.couponCode = ''
      }).catch(() => {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      })
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.closeMicrocart()
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
</style>
