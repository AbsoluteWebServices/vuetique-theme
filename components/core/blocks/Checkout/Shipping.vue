<template>
  <div class="shipping">
    <div class="flex flex-wrap">
      <div class="w-1/12 hidden md:block">
        <div
          class="number-circle lh35 cl-white brdr-circle flex items-center justify-center"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          2
        </div>
      </div>
      <div class="w-full md:w-11/12">
        <div class="flex items-center mb-3 md:mb-0" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
          <div
            class="number-circle cl-white brdr-circle flex items-center justify-center md:hidden"
            :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
          >
            2
          </div>
          <h3 class="ml-3 md:ml-0 mb-0 md:mb-5">
            {{ $t('Shipping') }}
          </h3>
        </div>
        <div class="mt-3 md:mt-0 mb-2 flex end-lg" v-if="isFilled && !isActive">
          <a href="#" class="p-2 bg-grey-lightest text-black inline-flex items-center" @click.prevent="edit">
            <span class="pr-2">
              {{ $t('Edit shipping') }}
            </span>
            <i class="material-icons text-h3">edit</i>
          </a>
        </div>
      </div>
    </div>
    <!--Fields-->
    <div class="flex flex-wrap justify-end mt-4" v-if="isActive">
      <div class="w-full md:w-11/12">
        <base-checkbox
          v-if="currentUser && hasShippingDetails()"
          class="w-full md:w-1/2 px-3"
          id="shipToMyAddressCheckbox"
          @click="useMyAddress"
          v-model="shipToMyAddress"
        >
          {{ $t('Ship to my default address') }}
        </base-checkbox>

        <div class="flex flex-wrap -mx-3 mb-3">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="first-name"
            :placeholder="$t('First name *')"
            v-model.trim="shipping.firstName"
            @blur="$v.shipping.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.shipping.firstName.$error && !$v.shipping.firstName.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.shipping.firstName.minLength,
                text: $t('Name must have at least 3 letters.')
              }
            ]"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="last-name"
            :placeholder="$t('Last name *')"
            v-model.trim="shipping.lastName"
            @blur="$v.shipping.lastName.$touch()"
            autocomplete="family-name"
            :validation="{
              condition: $v.shipping.lastName.$error && !$v.shipping.lastName.required,
              text: $t('Field is required')
            }"
          />
        </div>
        <div class="flex flex-wrap -mx-3 mb-3">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="street-address"
            :placeholder="$t('Street name *')"
            v-model.trim="shipping.streetAddress"
            @blur="$v.shipping.streetAddress.$touch()"
            autocomplete="address-line1"
            :validation="{
              condition: $v.shipping.streetAddress.$error && !$v.shipping.streetAddress.required,
              text: $t('Field is required')
            }"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="apartment-number"
            :placeholder="$t('House/Apartment number')"
            v-model.trim="shipping.apartmentNumber"
            @blur="$v.shipping.apartmentNumber.$touch()"
            autocomplete="address-line2"
            :validation="{
              condition: $v.shipping.apartmentNumber.$error && !$v.shipping.apartmentNumber.required,
              text: $t('Field is required')
            }"
          />
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="city"
            :placeholder="$t('City *')"
            v-model.trim="shipping.city"
            @blur="$v.shipping.city.$touch()"
            autocomplete="address-level2"
            :validation="{
              condition: $v.shipping.city.$error && !$v.shipping.city.required,
              text: $t('Field is required')
            }"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="state"
            :placeholder="$t('State / Province')"
            v-model.trim="shipping.state"
            autocomplete="address-level1"
          />
        </div>

        <div class="flex flex-wrap -mx-3 mb-3">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="zip-code"
            :placeholder="$t('Zip-code *')"
            v-model.trim="shipping.zipCode"
            @blur="$v.shipping.zipCode.$touch()"
            autocomplete="postal-code"
            :validations="[
              {
                condition: $v.shipping.zipCode.$error && !$v.shipping.zipCode.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.shipping.zipCode.minLength,
                text: $t('Name must have at least 3 letters.')
              }
            ]"
          />

          <base-select
            class="w-1/2 px-3"
            name="countries"
            :options="countryOptions"
            :selected="shipping.country"
            :placeholder="$t('Country *')"
            :validations="[
              {
                condition: $v.shipping.country.$error && !$v.shipping.country.required,
                text: $t('Field is required')
              }
            ]"
            v-model="shipping.country"
            autocomplete="country-name"
            @blur="$v.shipping.country.$touch()"
            @change="$v.shipping.country.$touch(); changeCountry();"
          />

          <base-input
            class="w-full mt-3 px-3"
            type="text"
            name="phone-number"
            :placeholder="$t('Phone Number')"
            v-model.trim="shipping.phoneNumber"
            autocomplete="tel"
          />
        </div>

      </div>

      <div class="w-full md:w-11/12">
        <h4 class="my-3">
          {{ $t('Shipping method') }}
        </h4>
      </div>
      <div class="w-full md:w-11/12 mb-4">
        <div v-for="(method, index) in shippingMethods" :key="index">
          <base-radiobutton
            :id="'shipping-' + method.method_code"
            name="shipping-method"
            :val="method.method_code"
            :value="shipping.shippingMethod == method.method_code"
            @change="$v.shipping.shippingMethod.$touch(); changeShippingMethod();"
          >
            {{ method.method_title }} | {{ method.amount | price }}
          </base-radiobutton>
        </div>
        <span class="validation-error" v-if="$v.shipping.shippingMethod.$error && !$v.shipping.shippingMethod.required">
          {{ $t('Field is required') }}
        </span>
      </div>
    </div>
    <!--Fields end-->

    <!--Continue to payment-->
    <div class="flex flex-wrap justify-end pb-8" v-if="isActive">
      <div class="w-full md:w-11/12">
        <div class="flex -mx-3">
          <div class="w-full lg:w-1/2 px-3">
            <button-full
              data-testid="shippingSubmit"
              @click.native="sendDataToCheckout"
              :disabled="$v.shipping.$invalid"
            >
              {{ $t('Continue to payment') }}
            </button-full>
          </div>
        </div>
      </div>
    </div>
    <!--Review shipping data-->
    <div class="flex flex-wrap justify-end pb-2 md:pb-8" v-if="!isActive && isFilled">
      <div class="w-full md:w-11/12">
        <div data-testid="shippingAddressSummary">
          <p>
            {{ shipping.firstName }} {{ shipping.lastName }}
          </p>
          <p>
            {{ shipping.streetAddress }} {{ shipping.apartmentNumber }}
          </p>
          <p>
            {{ shipping.city }} {{ shipping.zipCode }}
          </p>
          <p>
            <span v-if="shipping.state">{{ shipping.state }}, </span>
            <span>{{ getCountryName() }}</span>
          </p>
          <div v-if="shipping.phoneNumber">
            <span>{{ shipping.phoneNumber }}</span>
            <tooltip>{{ $t('Phone number may be needed by carrier') }}</tooltip>
          </div>
          <div class="w-full mt-3">
            <h4>
              {{ $t('Shipping method') }}
            </h4>
          </div>
          <div class="v-full mt-3">
            <base-radiobutton id="shipping-selected" :value="true" :disabled="true">
              {{ getShippingMethod().method_title }} | {{ getShippingMethod().amount | price }}
            </base-radiobutton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'
import {Shipping} from '@vue-storefront/core/modules/checkout/components/Shipping'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseRadiobutton from 'theme/components/core/blocks/Form/BaseRadiobutton'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseRadiobutton,
    BaseInput,
    BaseSelect
  },
  mixins: [Shipping],
  computed: {
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  validations: {
    shipping: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required
      },
      country: {
        required
      },
      streetAddress: {
        required
      },
      apartmentNumber: {},
      shippingMethod: {
        required
      },
      zipCode: {
        required,
        minLength: minLength(3)
      },
      city: {
        required
      }
    }
  }
}
</script>
