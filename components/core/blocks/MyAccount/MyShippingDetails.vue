<template>
  <div class="mb-8">
    <!-- My shipping details header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6" :class="{ 'cl-accent' : !isEdited }">
        <h2 class="mb-1">
          {{ $t('My shipping details') }}
        </h2>
      </div>
      <div class="col-12 sm:col-6">
        <div class="leading-loose flex md:justify-end" v-if="!isEdited">
          <a href="#" class="text-grey flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit your shipping details') }}
            </span>
            <i class="material-icons">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My shipping details body (edit mode) -->
    <div class="row gutter-md" v-if="isEdited">
      <template>
        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="first-name"
          autocomplete="given-name"
          :placeholder="`${$t('First name')} *`"
          v-model.trim="shippingDetails.firstName"
          @input="$v.shippingDetails.firstName.$touch()"
          :validations="[
            {
              condition: !$v.shippingDetails.firstName.required && $v.shippingDetails.firstName.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.shippingDetails.firstName.minLength,
              text: $t('Name must have at least 3 letters.')
            }
          ]"
        />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="last-name"
          autocomplete="family-name"
          :placeholder="`${$t('Last name')} *`"
          v-model.trim="shippingDetails.lastName"
          @input="$v.shippingDetails.lastName.$touch()"
          :validation="{
            condition: !$v.shippingDetails.lastName.required && $v.shippingDetails.lastName.$error,
            text: $t('Field is required')
          }"
        />

        <base-checkbox
          v-if="hasBillingAddress()"
          class="col-12 mb-6"
          id="addCompanyFilled"
          v-model="useCompanyAddress"
          @click="fillCompanyAddress"
        >
          {{ $t("Use my company's address details") }}
        </base-checkbox>

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="phone-number"
          autocomplete="tel"
          :placeholder="$t('Phone Number')"
          v-model.trim="shippingDetails.phone"
        />

        <div class="col-12" />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="street-address"
          autocomplete="address-line1"
          :placeholder="`${$t('Street name')} *`"
          v-model.trim="shippingDetails.street"
          @input="$v.shippingDetails.street.$touch()"
          :validation="{
            condition: !$v.shippingDetails.street.required && $v.shippingDetails.street.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="apartment-number"
          autocomplete="address-line2"
          :placeholder="`${$t('House/Apartment number')} *`"
          v-model.trim="shippingDetails.house"
          @input="$v.shippingDetails.house.$touch()"
          :validation="{
            condition: !$v.shippingDetails.house.required && $v.shippingDetails.house.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="city"
          autocomplete="address-level2"
          :placeholder="`${$t('City')} *`"
          v-model.trim="shippingDetails.city"
          @input="$v.shippingDetails.city.$touch()"
          :validation="{
            condition: !$v.shippingDetails.city.required && $v.shippingDetails.city.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="state"
          autocomplete="address-level1"
          :placeholder="$t('State / Province')"
          v-model.trim="shippingDetails.region"
        />

        <base-select
          class="col-12 sm:col-6 mb-6"
          name="countries"
          :options="countryOptions"
          :selected="shippingDetails.country"
          :placeholder="$t('Country *')"
          :validations="[
            {
              condition: $v.shippingDetails.country.$error && !$v.shippingDetails.country.required,
              text: $t('Field is required')
            }
          ]"
          v-model="shippingDetails.country"
          autocomplete="country-name"
          @blur="$v.shippingDetails.country.$touch()"
          @change="$v.shippingDetails.country.$touch()"
        />

        <base-input
          class="col-12 sm:col-6 mb-6"
          type="text"
          name="zip-code"
          autocomplete="postal-code"
          :placeholder="`${$t('Zip-code')} *`"
          v-model.trim="shippingDetails.postcode"
          @input="$v.shippingDetails.postcode.$touch()"
          :validations="[
            {
              condition: !$v.shippingDetails.postcode.required && $v.shippingDetails.postcode.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.shippingDetails.postcode.minLength,
              text: $t('Zip-code must have at least 3 letters.')
            }
          ]"
        />

        <div class="col-12">
          <hr class="border-t mt-4 mb-10">
        </div>

        <div class="col-12">
          <div class="inline-block mr-5">
            <button-full
              @click.native="updateDetails"
              :disabled="$v.$invalid"
            >
              {{ $t('Update my shipping details') }}
            </button-full>
          </div>
          <a href="#" @click="exitSection" class="inline-block text-grey-dark bg-grey-lighter py-2 px-3">
            {{ $t('Cancel') }}
          </a>
        </div>
      </template>
    </div>

    <!-- My shipping details summary -->
    <div class="row mb-8" v-else>
      <div class="col-12 text-h4">
        <p>
          {{ shippingDetails.firstName }} {{ shippingDetails.lastName }}
        </p>
        <base-checkbox
          v-if="useCompanyAddress"
          class="col-12 mb-6"
          id="useCompanyAddressFilled"
          v-model="useCompanyAddress"
          disabled
        >
          {{ $t("Use my company's address details") }}
        </base-checkbox>
        <p class="mb-6">
          {{ shippingDetails.company }}
        </p>
        <p class="mb-6">
          {{ shippingDetails.street }}
          <span v-if="shippingDetails.house"> {{ shippingDetails.house }}</span>
        </p>
        <p class="mb-6">
          {{ shippingDetails.city }} {{ shippingDetails.postcode }}
        </p>
        <p class="mb-6">
          <span v-if="shippingDetails.region">{{ shippingDetails.region }}, </span>
          {{ getCountryName() }}
        </p>
        <div class="mb-6">
          {{ shippingDetails.phone }}
          <tooltip v-if="shippingDetails.phone">
            {{ $t('Phone number may be needed by carrier') }}
          </tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import MyShippingDetails from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyShippingDetails'

import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput,
    BaseSelect
  },
  mixins: [MyShippingDetails],
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
    shippingDetails: {
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
      street: {
        required
      },
      house: {
        required
      },
      postcode: {
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
