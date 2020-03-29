<template>
  <button
    :class="['border border-transparent opacity-50 hover:opacity-100 rounded-full relative inline-flex pointer color mr-3 mb-3', isActive ? 'active' : '']"
    @click="$emit('change', variant)"
    :aria-label="$t('Select color ') + variant.label"
  >
    <div
      class="absolute rounded-full color-inside"
      :class="{'border border-grey': variant.label === 'White'}"
      :style="colorFrom(variant.label)"
    />
  </button>
</template>

<script>
import config from 'config'
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin],
  methods: {
    colorFrom (label) {
      if (!label) return ''
      if (config.products.colorMappings) {
        if (typeof config.products.colorMappings[label] !== 'undefined') {
          label = config.products.colorMappings[label]
        }
      }
      if (label.indexOf('/') >= 0) label = label.replace('/', ',') // to be honest - this is a hack for colors like "ink/white"
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
