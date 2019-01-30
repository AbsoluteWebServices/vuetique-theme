<template>
  <div class="sidebar">
    <div>
      <Accordion
        v-for="(filter, filterIndex) in filters"
        :key="filterIndex"
        v-if="filter.length"
        :title="$t(filterIndex + '_filter')"
      >
        <template v-if="filterIndex==='color'">
          <color-selector
            context="category"
            :attribute_code="color"
            code="color"
            v-for="(color, index) in filter"
            :key="index"
            :id="color.id"
            :label="color.label"
          />
        </template>
        <template v-else-if="filterIndex==='size'">
          <size-selector
            context="category"
            :attribute_code="size"
            code="size"
            v-for="(size, index) in sortById(filter)"
            :key="index"
            :id="size.id"
            :label="size.label"
          />
        </template>
        <template v-else-if="filterIndex==='price'">
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
        </template>
        <template v-else>
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
        </template>
      </Accordion>
    </div>

    <div class="mt-8 lg:hidden row gutter-md">
      <div class="col-6">
        <button-full
          class="w-full"
          @click.native="resetAllFilters"
          :disabled="Object.keys(activeFilters).length === 0"
        >
          {{ $t('Clear') }}
        </button-full>
      </div>
      <div class="col-6">
        <button-full
          class="w-full btn-primary"
          @click.native="$emit('closeFilters')"
        >
          {{ $t('Apply') }}
        </button-full>
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
import Accordion from 'theme/components/theme/Accordion'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector,
    Accordion,
    ButtonFull
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
