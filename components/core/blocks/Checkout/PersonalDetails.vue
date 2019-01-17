<template>
  <div class="personal-details">
    <div class="flex flex-wrap">
      <div class="w-1/12">
        <div
          class="number-circle lh35 cl-white brdr-circle align-center weight-700"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          1
        </div>
      </div>
      <div class="w-11/12">
        <div class="" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
          <h3 class="mt-2 mb-5">
            {{ $t('Personal Details') }}
          </h3>
        </div>
        <div class="flex mb-2" v-if="isFilled && !isActive">
          <a href="#" class="btn btn-xs btn-primary flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit personal details') }}
            </span>
            <i class="material-icons cl-tertiary">edit</i>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-end" v-if="isActive">
      <div class="w-11/12">
        <div class="flex flex-wrap -mx-3">
          <base-input
            class="w-1/2 px-3"
            type="text"
            :autofocus="true"
            name="first-name"
            :placeholder="$t('First name *')"
            v-model.trim="personalDetails.firstName"
            @blur="$v.personalDetails.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.personalDetails.firstName.minLength,
                text: $t('Name must have at least 3 letters.')
              }
            ]"
          />

          <base-input
            class="w-1/2 px-3"
            type="text"
            name="last-name"
            :placeholder="$t('Last name *')"
            v-model.trim="personalDetails.lastName"
            @blur="$v.personalDetails.lastName.$touch()"
            autocomplete="family-name"
            :validation="{
              condition: $v.personalDetails.lastName.$error && !$v.personalDetails.lastName.required,
              text: $t('Field is required')
            }"
          />

          <base-input
            class="w-full mt-3 px-3"
            type="email"
            name="email-address"
            :placeholder="$t('Email address *')"
            v-model="personalDetails.emailAddress"
            @blur="$v.personalDetails.emailAddress.$touch()"
            autocomplete="email"
            @keyup.enter="sendDataToCheckout"
            :validations="[
              {
                condition: $v.personalDetails.emailAddress.$error && !$v.personalDetails.emailAddress.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.personalDetails.emailAddress.email && $v.personalDetails.emailAddress.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />

          <base-checkbox
            v-if="!currentUser"
            class="w-full mt-2 px-3"
            id="createAccountCheckbox"
            @click="createAccount = !createAccount"
            v-model="createAccount"
          >
            {{ $t('I want to create an account') }}
          </base-checkbox>

          <template v-if="createAccount && !currentUser">
            <div class="flex w-full flex-wrap mt-4">
              <div class="px-3 w-1/2">
                <base-input
                  class="mb25 mt10"
                  type="password"
                  name="password"
                  ref="password"
                  :placeholder="$t('Password *')"
                  v-model="password"
                  @blur="$v.password.$touch()"
                  autocomplete="new-password"
                  :validation="{
                    condition: $v.password.$error && !$v.password.required,
                    text: $t('Field is required.')
                  }"
                />
              </div>

              <div class="px-3 w-1/2">
                <base-input
                  class="mb25"
                  type="password"
                  name="password-confirm"
                  :placeholder="$t('Repeat password *')"
                  v-model="rPassword"
                  autocomplete="new-password"
                  :validations="[
                    {
                      condition: $v.rPassword.$error && !$v.rPassword.required,
                      text: $t('Field is required.')
                    },
                    {
                      condition:!$v.rPassword.sameAsPassword,
                      text: $t('Passwords must be identical.')
                    }
                  ]"
                />
              </div>

            </div>

            <base-checkbox
              class="w-full mt-5 px-3"
              id="acceptConditions"
              @click="acceptConditions = !acceptConditions"
              @blur="$v.acceptConditions.$touch()"
              v-model="acceptConditions"
              :validation="{
                condition: !$v.acceptConditions.required && $v.acceptConditions.$error,
                text: $t('You must accept the terms and conditions.')
              }"
            >
              {{ $t('I accept ') }}
              <span
                class="link pointer"
                @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
              >
                {{ $t('Terms and conditions') }}
              </span>*
            </base-checkbox>
          </template>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-end pb-8" v-show="isActive">
      <div class="w-11/12">
        <div class="mt-6 flex -mx-3 justify-between items-center">
          <div class="w-1/2 px-3 button-container">
            <button-full
              data-testid="personalDetailsSubmit"
              @click.native="sendDataToCheckout"
              :disabled="createAccount ? $v.$invalid : $v.personalDetails.$invalid"
            >
              {{ $t('Continue to shipping') }}
            </button-full>
          </div>
          <div
            class="w-1/2"
            v-if="!currentUser"
          >
            <p class="h4 cl-accent text-center">
              {{ $t('or') }}
              <span
                class="link pointer no-underline"
                @click.prevent="gotoAccount"
              >
                {{ $t('login to your account') }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-end pb-8" v-if="!isActive && isFilled">
      <div class="w-11/12">
        <p>
          {{ personalDetails.firstName }} {{ personalDetails.lastName }}
        </p>
        <div>
          <span class="pr15">{{ personalDetails.emailAddress }}</span>
          <tooltip>{{ $t('We will send you details regarding the order') }}</tooltip>
        </div>
        <template v-if="createAccount && !currentUser">
          <base-checkbox
            class="mt25"
            id="createAccountCheckboxInfo"
            v-model="createAccount"
            disabled
          >
            {{ $t('Create a new account') }}
          </base-checkbox>
          <p class="h5 cl-tertiary">
            {{ $t('The new account will be created with the purchase. You will receive details on e-mail.') }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { PersonalDetails } from '@vue-storefront/core/modules/checkout/components/PersonalDetails'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Modal from 'theme/components/core/Modal'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    ButtonFull,
    Tooltip,
    Modal,
    BaseCheckbox,
    BaseInput
  },
  mixins: [PersonalDetails],
  validations: {
    personalDetails: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required
      },
      emailAddress: {
        required,
        email
      }
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    acceptConditions: {
      required
    }
  }
}
</script>

<style lang="scss" scoped>

.login-prompt {
  @media (min-width: 1200px) {
    margin-top: 30px;
  }
}
</style>
