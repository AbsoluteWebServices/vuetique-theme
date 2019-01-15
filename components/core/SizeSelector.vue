<template>
  <button
    class="mr-3 mb-3 text-xs size-selector"
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/compatibility/components/GenericSelector'

export default {
  mixins: [GenericSelector]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .size-selector {
    @apply .border .border-grey;
    width: 48px;
    height: 48px;

    &:hover,
    &:focus,
    &.active {
      border-width: 2px;
    }

    &.active {
      @apply .font-semibold;
      border-color: $color-active;
      color: $color-active;
    }

    &:disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
    }
  }
</style>
