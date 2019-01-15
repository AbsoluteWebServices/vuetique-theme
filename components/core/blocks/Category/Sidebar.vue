<template>
  <div class="sidebar">
    <button
      class="sm:hidden py-4 px-10 ripple bg-primary text-white"
      @click="resetAllFilters"
      :class="{'button-disabled': Object.keys(activeFilters).length === 0}"
      :disabled="Object.keys(activeFilters).length === 0"
    >
      {{ $t('Clear') }}
    </button>
    <div
      v-for="(filter, filterIndex) in filters"
      :key="filterIndex"
      v-if="filter.length"
      class="border-t py-2"
    >
      <h5 class="py-3 flex justify-between items-center cursor-pointer font-sans text-base" @click="toggleFilters(filterIndex)">
        {{ $t(filterIndex + '_filter') }}
        <i class="material-icons">{{ openedFilters.indexOf(filterIndex) === -1 ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</i>
      </h5>

      <div v-if="filterIndex==='color'" class="filters" :class="{'opened': openedFilters.indexOf(filterIndex) !== -1}">
        <div class="pt-2 pb-3">
          <color-selector
            context="category"
            :attribute_code="color"
            code="color"
            v-for="(color, index) in filter"
            :key="index"
            :id="color.id"
            :label="color.label"
          />
        </div>
      </div>
      <div v-else-if="filterIndex==='size'" class="filters" :class="{'opened': openedFilters.indexOf(filterIndex) !== -1}">
        <div class="pt-2 pb-3">
          <size-selector
            context="category"
            :attribute_code="size"
            code="size"
            v-for="(size, index) in sortById(filter)"
            :key="index"
            :id="size.id"
            :label="size.label"
          />
        </div>
      </div>
      <div v-else-if="filterIndex==='price'" class="filters" :class="{'opened': openedFilters.indexOf(filterIndex) !== -1}">
        <div class="pt-2 pb-3">
          <price-selector
            context="category"
            :attribute_code="price"
            class="mb-3"
            code="price"
            v-for="(price, index) in filter"
            :key="index"
            :id="price.id"
            :from="price.from"
            :to="price.to"
            :content="price.label"
            :label="price.label"
          />
        </div>
      </div>
      <div v-else class="filters" :class="{'opened': openedFilters.indexOf(filterIndex) !== -1}">
        <div class="pt-2 pb-3">
          <generic-selector
            context="category"
            :attribute_code="filter.attribute_code"
            class="generic-select mr-3 mb-3"
            :code="filterIndex"
            v-for="(option, index) in filter"
            :key="index"
            :id="option.id"
            :label="option.label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@vue-storefront/core/compatibility/components/blocks/Category/Sidebar'

import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector
  },
  mixins: [Sidebar],
  data () {
    return {
      openedFilters: []
    }
  },
  methods: {
    toggleFilters (filterIndex) {
      let index = this.openedFilters.indexOf(filterIndex)
      if (index === -1) {
        this.openedFilters.push(filterIndex)
      } else {
        this.openedFilters.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

.filters {
  @apply overflow-hidden max-h-0;
  transition: max-height $duration-main $motion-main;

  &.opened {
    @apply max-h-screen;
  }
}
</style>
