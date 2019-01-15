<template>
  <button
    :class="['border border-transparent opacity-50 hover:opacity-100 rounded-full relative inline-flex pointer color mr-3 mb-3', active ? 'active' : '']"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select color ') + label"
  >
    <div
      class="absolute rounded-full color-inside"
      :class="{'border border-grey': label === 'White'}"
      :style="colorFrom(label)"
    />
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'

export default {
  mixins: [GenericSelector],
  methods: {
    colorFrom (label) {
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .color {
    width: 40px;
    height: 40px;

    &.active {
      @apply border-black opacity-100;
    }
  }

  .color-inside {
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
</style>
