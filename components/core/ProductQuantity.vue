<template>
  <div class="product-quantity" :class="'qty-input__' + size">
    <label class="pb-2 hidden" for="quantity">{{ $t('Quantity') }}</label>
    <div class="flex h-full">
      <input
        id="quantity"
        type="number"
        :min="1"
        :max="max"
        :disabled="disabled"
        :name="name"
        :value="value"
        @input="inputEvent"
        @focus="$emit('focus')"
        @blur="$v.$touch()"
        @keyup.enter="keyupEnter"
        @keyup.up="incrementEvent"
        @keyup.down="decrementEvent"
        @keyup="keyup"
      >
      <div class="input-number-controls">
        <button @click.prevent="incrementEvent" :class="{ disabled }" :disabled="disabled">
          <svg viewBox="0 0 15 15" class="vt-icon mx-auto"><use xlink:href="#up"/></svg>
        </button>
        <button @click.prevent="decrementEvent" :class="{ disabled }" :disabled="disabled">
          <svg viewBox="0 0 25 25" class="vt-icon mx-auto"><use xlink:href="#down"/></svg>
        </button>
      </div>
    </div>
    <spinner v-if="loading" />
  </div>
</template>

<script>
import { minValue, maxValue, numeric, required } from 'vuelidate/lib/validators'
import { onlineHelper } from '@vue-storefront/core/helpers'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import Spinner from 'theme/components/core/Spinner'

export default {
  components: {
    Spinner,
    BaseInputNumber
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    showQuantity: {
      type: Boolean,
      default: false
    },
    maxQuantity: {
      type: Number,
      default: undefined
    },
    checkMaxQuantity: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSimpleOrConfigurable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      required: false
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    },
    max () {
      if (!this.isOnline || !this.isSimpleOrConfigurable) {
        return null
      }

      return this.maxQuantity
    },
    disabled () {
      if (!this.isOnline) {
        return false
      }
      return !this.maxQuantity && this.checkMaxQuantity && this.isSimpleOrConfigurable
    },
    name () {
      if (this.isSimpleOrConfigurable && !this.loading && this.showQuantity) {
        return this.$i18n.t(this.isOnline ? 'Quantity available' : 'Quantity available offline', { qty: this.maxQuantity })
      }
      return this.$i18n.t('Quantity')
    }
  },
  validations () {
    return {
      value: {
        minValue: minValue(1),
        maxValue: maxValue(this.max) && !this.isSimpleOrConfigurable,
        numeric,
        required
      }
    }
  },
  watch: {
    '$v.$invalid' (error) {
      this.$emit('error', error)
    }
  },
  methods: {
    keyup ($event) {
      this.$emit('keyup', $event)
    },
    keyupEnter ($event) {
      if (this.disabled) {
        return
      }
      let value = parseInt($event.target.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('keyup.enter', value)
    },
    inputEvent ($event) {
      if (this.disabled) {
        return
      }
      let value = parseInt($event.target.value, 10)
      if (!isNaN(value)) {
        this.$emit('input', value !== 0 ? Math.abs(value) : 1)
      }
    },
    incrementEvent ($event) {
      if (this.disabled) {
        return
      }
      let value = parseInt(this.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('input', value + 1)
    },
    decrementEvent ($event) {
      if (this.disabled) {
        return
      }
      let value = parseInt(this.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('input', value > 1 ? value - 1 : 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-quantity {
  position: relative;
  /deep/ .spinner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}

%qty-input {
  @apply border border-grey text-center py-3 px-2 text-sm text-grey outline-none bg-white h-full;

  &:focus {
    @apply text-grey-dark;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance:textfield;
  }
}

.qty-input {
  &__lg {
    height: 50px;

    input {
      @extend %qty-input;
      width: 50px;
    }
  }

  &__md {
    height: 40px;

    input {
      @extend %qty-input;
      width: 90px;
    }

    .input-number-controls button {
      width: 25px;
    }
  }

  &__sm {
    height: 30px;

    input {
      @extend %qty-input;
      width: 60px;
    }

    .input-number-controls button {
      width: 20px;
    }
  }
}

.input-number-controls {
  display: inline-block;

  button {
    @apply block border border-grey border-l-0 bg-white;

    width: 30px;
    height: 50%;

    &:last-of-type {
      border-top: none;
    }

    .vt-icon {
      width: 8px;
      height: 8px;
    }
  }
}

</style>
