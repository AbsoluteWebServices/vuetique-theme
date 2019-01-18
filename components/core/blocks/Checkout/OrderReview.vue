<template>
  <div class="order-review">
    <div class="flex flex-wrap">
      <div class="w-1/12 hidden md:block">
        <div
          class="number-circle lh35 cl-white brdr-circle flex items-center justify-center"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          4
        </div>
      </div>
      <div class="w-full md:w-11/12">
        <div class="flex items-center mb-3 md:mb-0" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
          <div
            class="number-circle cl-white brdr-circle flex items-center justify-center md:hidden"
            :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
          >
            4
          </div>
          <h3 class="ml-3 mb-0 md:ml-0 md:mb-5">
            {{ $t('Review order') }}
          </h3>
        </div>
      </div>
    </div>
    <!-- HEADER END -->

    <div class="flex flex-wrap justify-end" v-show="isActive">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap">
          <div class="w-full">
            <p class="text-h4 mb-2">
              {{ $t('Please verify that you have entered everything correctly') }}
            </p>
            <div class="row">
              <base-checkbox
                class="w-full"
                id="acceptTermsCheckbox"
                @click="orderReview.terms = !orderReview.terms"
                @blur="$v.orderReview.terms.$touch()"
                v-model="orderReview.terms"
                :validation="{
                  condition: !$v.orderReview.terms.required && $v.orderReview.terms.$error,
                  text: $t('Field is required')
                }"
              >
                {{ $t('I agree to the') }}
                <span
                  class="text-primary cursor-pointer ml-1"
                  @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
                >
                  {{ $t('Terms and conditions') }}
                </span>
              </base-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-end mt-5" v-show="isActive">
      <div class="w-full lg:w-11/12">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full lg:w-1/2 px-3">
            <slot name="placeOrderButton">
              <button-full
                @click.native="placeOrder"
                data-testid="orderReviewSubmit"
                class="place-order-btn"
                :disabled="$v.orderReview.$invalid"
              >
                {{ $t('Place order') }}
              </button-full>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <modal name="modal-terms" >
      <p slot="header">
        {{ $t('Terms and conditions') }}
      </p>
      <div slot="content">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma stores, and Luma Private Sales. This privacy policy only covers information collected at this website, and does not cover any information collected offline by Luma. All Luma websites are covered by this privacy policy.
        </p>
        <h2 class="text-h2 mt-5 mb-2">
          Luma Security
        </h2>
        <p>
          Personal information provided on the website and online credit card transactions are transmitted through a secure server. We are committed to handling your personal information with high standards of information security. We take appropriate physical, electronic, and administrative steps to maintain the security and accuracy of personally identifiable information we collect, including limiting the number of people who have physical access to our database servers, as well as employing electronic security systems and password protections that guard against unauthorized access.
        </p>
        <h2 class="text-h2 mt-5 mb-2">
          Luma Privacy Policy
        </h2>
        <p>
          To help us achieve our goal of providing the highest quality products and services, we use information from our interactions with you and other customers, as well as from other parties. Because we respect your privacy, we have implemented procedures to ensure that your personal information is handled in a safe, secure, and responsible manner. We have posted this privacy policy in order to explain our information collection practices and the choices you have about the way information is collected and used.
        </p>
        <p>
          As we continue to develop the Luma website and take advantage of advances in technology to improve the services we offer, this privacy policy likely will change. We therefore encourage you to refer to this policy on an ongoing basis so that you understand our current privacy policy.
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Composite from '@vue-storefront/core/mixins/composite'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import ButtonFull from 'theme/components/theme/ButtonFull'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import Modal from 'theme/components/core/Modal'
import { OrderReview } from '@vue-storefront/core/modules/checkout/components/OrderReview'
import ValidationError from 'theme/components/core/ValidationError'

export default {
  components: {
    BaseCheckbox,
    ButtonFull,
    CartSummary,
    Modal,
    ValidationError
  },
  mixins: [OrderReview, Composite],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  methods: {
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: underline;
  }

  .cartsummary-wrapper {
    @media (min-width: 767px) {
      display: none;
    }
  }

  .order-review {
    &.line {
      &:after {
        display: none;
      }
    }
  }
</style>
