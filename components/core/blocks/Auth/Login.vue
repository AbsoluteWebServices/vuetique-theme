<template>
  <div>
    <header class="modal-header">
      <svg viewBox="0 0 25 25" class="vt-icon modal-close p-1 m-2" slot="close" @click="close">
        <use xlink:href="#close"/>
      </svg>
      <h2>{{ $t('Login') }}</h2>
    </header>
    <div class="modal-content">
      <form @submit.prevent="login" novalidate>
        <base-input
          class="mb-5"
          type="email"
          name="email"
          focus
          v-model="email"
          @blur="$v.email.$touch()"
          :placeholder="$t('E-mail address *')"
          :validations="[
            {
              condition: !$v.email.required && $v.email.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.email.email && $v.email.$error,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
        />
        <base-input
          class="mb-5"
          type="password"
          name="password"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validation="{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }"
        />
        <div class="row mt-5 mb-5 lg:mb-10">
          <base-checkbox
            class="col-12 sm:col-6 text-black"
            id="remember"
            v-model="remember"
            @click="remember = !remember"
          >
            {{ $t('Remember me') }}
          </base-checkbox>
          <div class="col-12 sm:col-6 mt-2 sm:mt-0 sm:text-right">
            <a href="#" @click.prevent="remindPassword">
              {{ $t('Forgot your password?') }}
            </a>
          </div>
        </div>

        <button-full class="mb-2 w-full" type="submit" data-testid="loginSubmit">
          {{ $t('Log in to your account') }}
        </button-full>

        <div class="text-center">
          {{ $t('or') }}
          <a href="#" @click.prevent="switchElem" data-testid="registerLink">
            {{ $t('register an account') }}
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'
import { required, email } from 'vuelidate/lib/validators'
export default {
  mixins: [Login],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callLogin()
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Reset password feature does not work while offline!'),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.callForgotPassword()
      }
    },
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
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  }
}
</script>
