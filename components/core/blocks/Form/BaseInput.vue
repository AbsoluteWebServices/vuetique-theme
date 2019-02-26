<template>
  <div class="relative">
    <div class="relative">
      <input
        class="w-full border border-solid border-grey text-sm text-grey px-3 h-10 bg-transparent outline-none focus:text-grey-dark"
        :class="{'pr-7': type === 'password', empty: value === '', 'has-error' : (isValid === false)}"
        :type="type === 'password' ? passType : type"
        :name="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="name"
        :placeholder="placeholder"
        :aria-label="placeholder"
        @input="inputEvent"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="keyupEnter"
        @keyup="keyup"
      >
      <svg viewBox="0 0 17.313 17.311" class="vt-icon--sm _icon-error" :class="{'mr-6': iconActive}" v-if="isValid === false && hasValidator === true">
        <use xlink:href="#error"/>
      </svg>

      <svg viewBox="0 0 17.333 9.333" class="vt-icon--sm _icon-success" :class="{'mr-6': iconActive}" v-if="isValid && isDirty === true && hasValidator === true">
        <use xlink:href="#success"/>
      </svg>
    </div>
    <button
      v-if="iconActive"
      type="button"
      class="icon material-icons absolute outline-none text-grey-dark"
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <template v-if="validation">
      <span class="block text-error text-h6 mt-1" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block text-error text-h6 mt-1"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  data () {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility',
      isDirty: false
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
    hasValidator () {
      return (typeof this.validation !== 'undefined' || this.validations.length > 0)
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: null,
      required: false
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    focus: {
      type: Boolean,
      required: false,
      default: false
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility_off'
      } else {
        this.passType = 'password'
        this.icon = 'visibility'
      }
    },
    // setFocus sets focus on a field which has a value of 'ref' tag equal to fieldName
    setFocus (fieldName) {
      if (this.name === fieldName) {
        this.$refs[this.name].focus()
      }
      console.log(this.condition, this.conditions)
    },
    keyup ($event) {
      this.$emit('keyup', $event)
      this.isDirty = true
    },
    keyupEnter ($event) {
      this.$emit('keyup.enter', $event.target.value)
      this.isDirty = true
    },
    inputEvent ($event) {
      this.$emit('input', $event.target.value)
      this.isDirty = true
    }
  },
  created () {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    background: inherit;

    &:focus {
      @apply outline-none border-grey-dark;
    }

    &:disabled {
      @apply opacity-50 cursor-not-allowed pointer-events-none;
    }

    &.has-error {
      @apply border-error;
    }

  }

  .vt-icon--sm {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -8px;

    &._icon-error {
      @apply fill-error;
    }

    &._icon-success {
      @apply fill-primary;
    }
  }

  .icon {
    right: 6px;
    top: 8px;
  }
</style>
