<template>
  <div @click="switchFilter(id, from, to)" class="price-select flex items-center cursor-pointer">
    <button
      class="relative border-grey border mr-3 pointer price-selector"
      :class="{ active: active }"
      :aria-label="$t('Price ') + content"
    >
      <div class="absolute block square"/>
    </button>
    <span>{{ content }}</span>
  </div>
</template>

<script>
import PriceSelector from '@vue-storefront/core/compatibility/components/PriceSelector'

export default {
  mixins: [PriceSelector]
}
</script>

<style lang="scss" scoped>
  .price-selector {
    width: 20px;
    height: 20px;

    &:hover {
      .square {
        @apply bg-grey-light;
      }
    }

    &.active {
      .square {
        @apply bg-grey-dark;
      }
    }
  }

  .price-select:hover {
    @extend .price-selector:hover;
  }

  .square {
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
