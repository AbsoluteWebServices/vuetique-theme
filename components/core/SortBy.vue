<template>
  <div class="sort-by relative">
    <select
      name="sortby"
      class="w-full px-3 h-10 bg-transparent border border-grey text-sm text-grey-dark font-medium outline-none"
      v-model="sortby"
      @change="changeOrder">
      <option selected="selected" disabled value="">{{ $t('Sort By') }}</option>
      <option v-for="(option, label) in sortByAttribute" :disabled="sortby === option" :value="option" :key="option" >{{ $t(label) }}</option>
    </select>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy'
export default {
  mixins: [SortBy]
}
</script>
