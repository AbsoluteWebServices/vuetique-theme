<template>
  <button type="button" class="inline-flex brdr-none" @click="goBack" data-testid="returnButton">
    <svg viewBox="0 0 25 25" class="vt-icon">
      <use xlink:href="#left"/>
    </svg>
  </button>
</template>

<script>
import ReturnIcon from '@vue-storefront/core/compatibility/components/blocks/Header/ReturnIcon'

export default {
  mixins: [ReturnIcon]
}
</script>
