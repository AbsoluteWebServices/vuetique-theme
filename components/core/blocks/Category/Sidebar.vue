<template>
  <div class="sidebar">
    <div>
      <Accordion
        v-for="(filter, filterIndex) in availableFilters"
        :key="filterIndex"
        v-if="filter.length"
        :title="$t(filterIndex + '_filter')"
      >
        <template v-if="filterIndex==='color'">
          <color-selector
            context="category"
            code="color"
            v-for="(color, index) in filter"
            :key="index"
            :variant="color"
            :label="color.label"
            :selected-filters="getCurrentFilters"
            @change="$emit('changeFilter', $event)"
          />
        </template>
        <template v-else-if="filterIndex==='size'">
          <size-selector
            context="category"
            code="size"
            v-for="(size, index) in sortById(filter)"
            :key="index"
            :variant="size"
            :selected-filters="getCurrentFilters"
            @change="$emit('changeFilter', $event)"
          />
        </template>
        <template v-else-if="filterIndex==='price'">
          <price-selector
            context="category"
            class="mb-3"
            code="price"
            v-for="(price, index) in filter"
            :key="index"
            :id="price.id"
            :from="price.from"
            :to="price.to"
            :variant="price"
            :selected-filters="getCurrentFilters"
            @change="$emit('changeFilter', $event)"
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
            :variant="option"
            :selected-filters="getCurrentFilters"
            @change="$emit('changeFilter', $event)"
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
import { mapGetters } from 'vuex'
import ColorSelector from 'theme/components/core/ColorSelector'
import SizeSelector from 'theme/components/core/SizeSelector'
import PriceSelector from 'theme/components/core/PriceSelector'
import GenericSelector from 'theme/components/core/GenericSelector'
import Accordion from 'theme/components/theme/Accordion'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import pickBy from 'lodash-es/pickBy'

export default {
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector,
    GenericSelector,
    Accordion,
    ButtonFull
  },
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('category', ['getActiveCategoryFilters']),
    activeFilters () {
      return this.getActiveCategoryFilters
    },
    hasActiveFilters () {
      return this.$store.getters['category-next/hasActiveFilters']
    },
    getCurrentFilters () {
      return this.$store.getters['category-next/getCurrentFilters']
    },
    availableFilters () {
      return pickBy(this.filters, (filter, filterType) => {
        return (filter.length && !this.$store.getters['category-next/getSystemFilterNames'].includes(filterType))
      })
    }
  },
  methods: {
    resetAllFilters () {
      this.$store.dispatch('category-next/resetSearchFilters')
    },
    sortById (filters) {
      return [...filters].sort((a, b) => { return a.id - b.id })
    }
  }
}
</script>
