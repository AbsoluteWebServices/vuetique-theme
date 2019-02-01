<template>
  <div :class="'qty-input__' + size">
    <label class="pb-2 hidden" for="quantity">{{ $t('Quantity') }}</label>
    <div class="flex h-full">
      <input
        type="text"
        min="0"
        :id="id"
        :name="name"
        focus
        :value="value"
        @input="inputEvent"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="keyupEnter"
        @keyup.up="incrementEvent"
        @keyup.down="decrementEvent"
        @keyup="keyup"
      >
      <div class="input-number-controls">
        <button @click.prevent="incrementEvent">
          <svg viewBox="0 0 15 15" class="vt-icon"><use xlink:href="#up"/></svg>
        </button>
        <button @click.prevent="decrementEvent">
          <svg viewBox="0 0 25 25" class="vt-icon"><use xlink:href="#down"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QtyInput',
  props: {
    id: {
      type: String,
      default: 'quantity',
      required: false
    },
    name: {
      type: String,
      default: 'quantity',
      required: false
    },
    value: {
      type: [String, Number],
      default: 1,
      required: false
    },
    size: {
      type: String,
      default: 'md',
      required: false
    }
  },
  methods: {
    keyup ($event) {
      this.$emit('keyup', $event)
    },
    keyupEnter ($event) {
      let value = parseInt($event.target.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('keyup.enter', value)
    },
    inputEvent ($event) {
      let value = parseInt($event.target.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('input', value)
    },
    incrementEvent ($event) {
      let value = parseInt(this.value)
      if (isNaN(value)) {
        value = 0
      }
      this.$emit('input', value + 1)
    },
    decrementEvent ($event) {
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
%qty-input {
  @apply border border-grey text-center py-3 px-2 text-sm text-grey outline-none bg-white h-full;

  &:focus {
    @apply text-grey-dark;
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
