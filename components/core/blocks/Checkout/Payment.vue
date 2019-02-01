<template>
  <div class="payment">
    <div class="flex flex-wrap">
      <div class="w-1/12 hidden md:block">
        <div
          class="number-circle lh35 cl-white brdr-circle flex items-center justify-center"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          3
        </div>
      </div>
      <div class="w-full md:w-11/12">
        <div class="flex items-center mb-3 md:mb-0" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
          <div
            class="number-circle md:hidden lh35 cl-white flex items-center justify-center md:hidden"
            :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
          >
            3
          </div>
          <h3 class="ml-3 md:ml-0 mb-0 md:mb-5">
            {{ $t('Payment') }}
          </h3>
        </div>
        <div class="mb-2 flex end-lg" v-if="isFilled && !isActive">
          <a href="#" class="p-2 bg-grey-lightest text-black inline-flex items-center" @click.prevent="edit">
            <span class="pr-1">
              {{ $t('Edit payment') }}
            </span>
            <i class="material-icons cl-tertiary">edit</i>
          </a>
        </div>
      </div>
    </div>
    <!--Fields-->

    <div class="flex flex-wrap justify-end mb-2" v-if="isActive">
      <div class="w-full md:w-11/12">
        <base-checkbox
          class="w-full"
          id="sendToShippingAddressCheckbox"
          v-model="sendToShippingAddress"
          @click="useShippingAddress"
        >
          {{ $t('Copy address data from shipping') }}
        </base-checkbox>
      </div>
    </div>

    <div class="flex w-full" v-if="isActive">
      <base-checkbox
        v-if="hasBillingData()"
        class="w-full mb-3"
        id="sendToBillingAddressCheckbox"
        v-model="sendToBillingAddress"
        @click="useBillingAddress"
      >
        {{ $t('Use my billing data') }}
      </base-checkbox>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3" v-if="isActive">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="first-name"
            :placeholder="$t('First name *')"
            v-model.trim="payment.firstName"
            @blur="$v.payment.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.payment.firstName.$error && !$v.payment.firstName.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.payment.firstName.minLength,
                text: $t('Name must have at least 3 letters.')
              }
            ]"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="last-name"
            :placeholder="$t('Last name *')"
            v-model.trim="payment.lastName"
            @blur="$v.payment.lastName.$touch()"
            autocomplete="family-name"
            :validation="{
              condition: $v.payment.lastName.$error && !$v.payment.lastName.required,
              text: $t('Field is required')
            }"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3" v-if="isActive">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="street-address"
            :placeholder="$t('Street name *')"
            v-model.trim="payment.streetAddress"
            @blur="$v.payment.streetAddress.$touch()"
            autocomplete="address-line1"
            :validation="{
              condition: $v.payment.streetAddress.$error && !$v.payment.streetAddress.required,
              text: $t('Field is required')
            }"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="apartment-number"
            :placeholder="$t('House/Apartment number')"
            v-model.trim="payment.apartmentNumber"
            @blur="$v.payment.apartmentNumber.$touch()"
            autocomplete="address-line2"
            :validation="{
              condition: $v.payment.apartmentNumber.$error && !$v.payment.apartmentNumber.required,
              text: $t('Field is required')
            }"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3" v-if="isActive">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="city"
            :placeholder="$t('City *')"
            v-model.trim="payment.city"
            @blur="$v.payment.city.$touch()"
            autocomplete="address-level2"
            :validation="{
              condition: $v.payment.city.$error && !$v.payment.city.required,
              text: $t('Field is required')
            }"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="state"
            :placeholder="$t('State / Province')"
            v-model.trim="payment.state"
            autocomplete="address-level1"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3" v-if="isActive">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="zip-code"
            :placeholder="$t('Zip-code *')"
            v-model.trim="payment.zipCode"
            @blur="$v.payment.zipCode.$touch()"
            autocomplete="postal-code"
            :validations="[
              {
                condition: $v.payment.zipCode.$error && !$v.payment.zipCode.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.payment.zipCode.minLength,
                text: $t('Zip-code must have at least 3 letters.')
              }
            ]"
          />

          <base-select
            class="w-1/2 px-3"
            name="countries"
            :options="countryOptions"
            :selected="payment.country"
            :placeholder="$t('Country *')"
            :validations="[
              {
                condition: $v.payment.country.$error && !$v.payment.country.required,
                text: $t('Field is required')
              }
            ]"
            v-model="payment.country"
            autocomplete="country-name"
            @blur="$v.payment.country.$touch()"
            @change="$v.payment.country.$touch()"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3" v-if="isActive">
          <base-input
            class="w-1/2 px-3"
            type="text"
            name="phone-number"
            :placeholder="$t('Phone Number')"
            v-model.trim="payment.phoneNumber"
            autocomplete="tel"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end w-full">
      <div class="w-full md:w-11/12">
        <base-checkbox
          v-if="isActive"
          class="w-full"
          id="generateInvoiceCheckbox"
          v-model="generateInvoice"
          @click="useGenerateInvoice"
        >
          {{ $t('I want to generate an invoice for the company') }}
        </base-checkbox>
      </div>
    </div>
    <!--Fields end-->

    <!--generateInvoice-->
    <div class="flex flex-wrap justify-end">
      <div class="w-full md:w-11/12">
        <template v-if="generateInvoice">
          <div class="flex flex-wrap -mx-3 mb-3 mt-3">
            <base-input
              class="w-1/2 px-3"
              type="text"
              name="company-name"
              :placeholder="$t('Company name *')"
              v-model.trim="payment.company"
              @blur="$v.payment.company.$touch()"
              autocomplete="organization"
              :validation="{
                condition: $v.payment.company.$error && !$v.payment.company.required,
                text: $t('Field is required')
              }"
            />

            <base-input
              class="w-1/2 px-3"
              type="text"
              name="tax-id"
              :placeholder="$t('Tax identification number *')"
              v-model.trim="payment.taxId"
              @blur="$v.payment.taxId.$touch()"
              autocomplete="tax-id"
              :validations="[
                {
                  condition: $v.payment.taxId.$error && !$v.payment.taxId.required,
                  text: $t('Field is required')
                },
                {
                  condition: !$v.payment.taxId.minLength,
                  text: $t('Tax identification number must have at least 3 letters.')
                }
              ]"
            />
          </div>
          <div class="w-full mt-3">
            <label class="fs16">
              {{ $t('We will send you the invoice to given e-mail address') }}
            </label>
          </div>
        </template>
      </div>
    </div>

    <!--Payment method-->
    <div class="flex flex-wrap justify-end">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap w-full" v-if="isActive">
          <h4 class="my-3">
            {{ $t('Payment method') }}
          </h4>

          <div class="w-full mb-4">
            <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6">
              <base-radiobutton
                :id="'payment-' + method.code"
                name="payment-method"
                :val="method.code"
                :value="payment.paymentMethod == method.code"
                @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
              >
                {{ method.title ? method.title : method.name }}
              </base-radiobutton>
            </div>
            <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!--Go to Review order-->
    <div class="flex flex-wrap w-full justify-end" v-if="isActive">
      <div class="w-full md:w-11/12">
        <div class="flex flex-wrap -mx-3 mb-3">
          <div class="w-full lg:w-1/2 px-3">
            <button-full
              @click.native="sendDataToCheckout"
              data-testid="paymentSubmit"
              :disabled="$v.payment.$invalid"
            >
              {{ $t('Review order') }}
            </button-full>
          </div>
        </div>
      </div>
    </div>

    <!--Review payment data-->
    <div class="flex flex-wrap justify-end" v-if="!isActive && isFilled">
      <div class="w-full md:w-11/12">
        <p>
          {{ payment.firstName }} {{ payment.lastName }}
        </p>
        <p>
          {{ payment.streetAddress }} {{ payment.apartmentNumber }}
        </p>
        <p>
          {{ payment.city }} {{ payment.zipCode }}
        </p>
        <p>
          <span v-if="payment.state">{{ payment.state }}, </span>
          <span>{{ getCountryName() }}</span>
        </p>
        <div v-if="payment.phoneNumber">
          <span>{{ payment.phoneNumber }}</span>
          <tooltip>{{ $t('Phone number may be needed by carrier') }}</tooltip>
        </div>
        <p v-if="generateInvoice">
          {{ payment.company }} {{ payment.taxId }}
        </p>
        <div class="w-full my-3">
          <h4>{{ $t('Payment method') }}</h4>
        </div>
        <div class="col-md-6 mb-4">
          <base-radiobutton id="payment-selected" :value="true" :disabled="true">
            {{ getPaymentMethod().title }}
          </base-radiobutton>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseRadiobutton from 'theme/components/core/blocks/Form/BaseRadiobutton'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    BaseCheckbox,
    BaseRadiobutton,
    BaseInput,
    BaseSelect,
    ButtonFull,
    Tooltip
  },
  mixins: [Payment],
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
  validations () {
    if (!this.generateInvoice) {
      return {
        payment: {
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
          zipCode: {
            required,
            minLength: minLength(3)
          },
          city: {
            required
          },
          paymentMethod: {
            required
          }
        }
      }
    } else {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(3)
          },
          lastName: {
            required
          },
          company: {
            required
          },
          taxId: {
            required,
            minLength: minLength(3)
          },
          country: {
            required
          },
          streetAddress: {
            required
          },
          apartmentNumber: {},
          zipCode: {
            required,
            minLength: minLength(4)
          },
          city: {
            required
          },
          paymentMethod: {
            required
          }
        }
      }
    }
  }
}
</script>
