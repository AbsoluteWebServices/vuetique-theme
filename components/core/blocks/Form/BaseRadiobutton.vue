<template>
  <div>
    <div class="checkbox-wrap">
      <input
        class="outline-none"
        type="radio"
        :id="id"
        :name="name"
        :value="val"
        :checked="value"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change')"
        :disabled="disabled"
      >
      <label :for="id" :class="{'cursor-pointer': !disabled }">
        <slot/>
      </label>
    </div>
    <template v-if="validation">
      <span
        class="block text-error text-h6"
        v-if="validation.condition"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseRadiobutton',
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: null
    },
    value: {
      type: Boolean,
      required: true
    },
    val: {
      type: [String, Number],
      required: false,
      default: null
    },
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
