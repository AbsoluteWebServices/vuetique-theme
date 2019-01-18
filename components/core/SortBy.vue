<template>
  <div class="sort-by select relative">
    <select
      name="sortby"
      class="w-full border p-3"
      v-model="sortby"
      @change="changeOrder">
      <option selected="selected" disabled value="">{{ $t('Sort By') }}</option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>
    </select>
    <svg viewBox="0 0 25 25" class="vt-icon--sm">
      <use xlink:href="#down"/>
    </svg>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'
export default {
  mixins: [SortBy]
}
</script>

<style lang="scss">
:root {
  --select-icon-size: 1em;
}
</style>
<style lang="scss" scoped>
.select {
  position: relative;

  select {
    @apply bg-white;
    padding-right: calc(var(--select-icon-size) + var(--select-icon-right-margin) * 2);
    -webkit-appearance: none;
    border-radius: 0;
  }

  .vt-icon--sm {
    width: var(--select-icon-size);
    height: var(--select-icon-size);
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
