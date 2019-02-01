<template>
  <div
    class="relative w-full"
    data-testid="search"
  >
    <div class="flex items-center">
      <base-input
        ref="search"
        type="text"
        id="search_input"
        :aria-label="$t('Type what you are looking for...')"
        :placeholder="$t('Type what you are looking for...')"
        class="w-full"
        v-model="search"
        @input="makeSearch"
        @focus="searchFocus = true"
        @blur="searchFocus = false"/>
      <svg viewBox="0 0 25 25" class="vt-icon--sm absolute pin-r mr-2 w-6 h-6 text-grey">
        <use xlink:href="#search"/>
      </svg>
    </div>
    <div class="absolute z-20 w-full" @mouseenter="resultsHover = true" @mouseleave="resultsHover = false">
      <div v-show="showDrop" class="bg-white border border-grey border-t-0">
        <product :key="product.id" v-for="product in results" :product="product" @click.native="resultsHover = false"/>
        <transition name="fade">
          <div v-if="moreResults" class="w-full px-3 py-4 border-t border-grey-lighter">
            <div
              class="text-black font-medium flex justify-between items-center"
            >
              {{ $t('Please refine your search to view more results...') }}
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="emptyResults" class="w-full p-4 text-black font-medium">
            {{ $t('No results were found.') }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import Product from 'theme/components/core/blocks/Search/Product'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  components: {
    Product,
    BaseInput
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      searchFocus: false,
      resultsHover: false,
      showResults: 5
    }
  },
  computed: {
    showDrop () {
      return (this.searchFocus && this.search !== '') || this.resultsHover
    },
    results () {
      return this.products.slice(0, this.showResults)
    },
    moreResults () {
      return this.products.length > this.showResults
    }
  },
  mounted () {
    this.$bus.$on('focusSearchInput', () => {
      if (!this.$store.state.ui.searchpanel) {
        this.$refs.search.focus()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
