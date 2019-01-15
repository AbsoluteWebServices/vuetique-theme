<template>
  <button
    :class="[':brdr-cl-bg-primary border border-grey-light hover:border-grey rounded-full relative inline-flex pointer color mr-3 mb-3', active ? 'active' : '']"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select color ') + label"
  >
    <div
      class="absolute rounded-full color-inside"
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
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(primary);

  .color {
    width: 48px;
    height: 48px;

    &.active {
      border-color: $color-active;
    }
  }

  .color-inside {
    width: 38px;
    height: 38px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
</style>
