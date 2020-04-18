<template>
  <div v-if="validations">
    <span
      v-for="(validation, index) in validations"
      :key="index"
      v-if="validation.condition"
      class="block text-error text-h6"
      data-testid="errorMessage"
    >
      {{ validation.text }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    validations: {
      type: Array,
      default: () => []
    }
  }
}
</script>
