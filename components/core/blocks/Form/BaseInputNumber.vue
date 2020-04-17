<template>
  <div class="relative">
    <input
      :id="getInputId"
      type="number"
      :min="min"
      :max="max"
      :disabled="disabled"
      class="w-full border border-solid border-grey text-sm text-grey px-3 h-10 bg-transparent outline-none focus:text-grey-dark"
      :class="{empty: value === '', 'has-error' : (isValid === false)}"
      :focus="autofocus"
      v-model="inputValue"
      @blur="$emit('blur', $event.target.value)"
      @keyup="$emit('keyup', $event)"
    >
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'
export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    validations: {
      type: Array,
      default: () => []
    },
    onlyPositive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isValid: function () {
      // Single validation
      if (typeof this.validation === 'object' && this.validation.condition === true) {
        return false
      }
      // Multiple validation
      if (this.validations.length > 0) {
        let isValid = true
        this.validations.forEach((item) => {
          if (item.condition === true) isValid = false
        })
        return isValid
      }

      return true
    },
    getInputId () {
      return `input_${this._uid}`
    },
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        if (!this.onlyPositive) {
          this.$emit('input', value)
        } else {
          const targetValue = parseInt(value, 10)
          if (!isNaN(targetValue)) {
            this.$emit('input', targetValue !== 0 ? Math.abs(targetValue) : 1)
          }
        }
      }
    }
  }
}
</script>
