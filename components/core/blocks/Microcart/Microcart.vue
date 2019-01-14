<template>
  <div
    class="microcart max-w-full fixed bg-white p-8"
    :class="{ active: isMicrocartOpen }"
    data-testid="microcart"
  >
    <button
      type="button"
      class="absolute pin-t pin-r m-3 outline-none"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <i class="material-icons text-h4 text-grey-dark">
        close
      </i>
    </button>

    <h2 v-if="productsInCart.length" class="text-black mb-8">
      {{ $t('Your cart') }}:
    </h2>

    <h4 v-if="!productsInCart.length" class="text-black mb-2">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!productsInCart.length" @click="closeMicrocartExtend">
      {{ $t("Don't hesitate and") }}
      <router-link :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul v-if="productsInCart.length" class="products p-0 m-0">
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
    </ul>
    <div v-if="productsInCart.length" class="summary pt-8">
      <div v-for="(segment, index) in totals" :key="index" class="row justify-between py-2 text-grey-dark font-medium" v-if="segment.code !== 'grand_total'">
        <div class="col-auto">
          {{ segment.title }}
          <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="close delete-button" @click="clearCoupon">
            <i class="material-icons">
              close
            </i>
          </button>
        </div>
        <div v-if="segment.value != null" class="col-auto" :class="{'text-primary': segment.code === 'discount'}">
          {{ segment.value | price }}
        </div>
      </div>

      <div v-if="OnlineOnly" class="py-3 row">
        <div class="mr-3 col-grow">
          <base-input type="text" id="couponinput" :placeholder="$t('Add discount code')" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon"/>
        </div>
        <div class="col-auto">
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
      <div class="col-auto">
        <router-link :to="localizedRoute('/')" class="no-underline text-grey link">
          <span @click="closeMicrocartExtend">
            &lt;&nbsp;{{ $t('Return to shopping') }}
          </span>
        </router-link>
      </div>
      <div class="col-auto">
        <button-full
          class="bg-primary py-3 px-6"
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
      couponCode: ''
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
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
  @import "~theme/css/animations/transitions";

  .microcart {
    top: 0;
    right: 0;
    z-index: 3;
    height: 100%;
    width: 480px;
    min-width: 320px;
    transform: translateX(100%);
    transition: transform 300ms $motion-main;
    overflow-y: auto;
    overflow-x: hidden;
    &.active {
      transform: translateX(0)
    }
  }

  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }

  .products {
    @media (max-width: 767px) {
      padding: 30px 15px;
    }
  }

  .actions {
    @media (max-width: 767px) {
      padding: 0 15px;
    }
    .link {
      @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        padding: 20px 70px;
        &.checkout {
          margin-top: 55px;
          padding: 0;
        }
      }
    }
  }

  .summary {
    @media (max-width: 767px) {
      padding:  0 15px;
      font-size: 12px;
    }
  }

  .summary-heading {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-label {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-value {
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  .delete-button {
    vertical-align: middle;
  }
</style>
