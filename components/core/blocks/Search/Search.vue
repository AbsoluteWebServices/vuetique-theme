<template>
  <div
    class="relative w-full"
    data-testid="search"
  >
    <div class="flex items-center">
      <base-input
        ref="search"
        type="text"
        id="search"
        :placeholder="$t('Type what you are looking for...')"
        class="w-full"
        v-model="search"
        @input="makeSearch"/>
      <i class="material-icons absolute pin-r mr-2 w-6 h-6 text-grey">search</i>
    </div>
    <div class="absolute z-20 w-full">
      <div v-show="search !== ''" class="bg-white border border-grey border-t-0">
        <product :key="product.id" v-for="product in results" :product="product"/>
        <transition name="fade">
          <div v-if="moreResults" class="w-full px-3 py-4 border-t border-grey-lighter">
            <router-link
              class="text-black font-medium flex justify-between items-center"
              to="/"
            >
              {{ $t('View all') }}
              <svg viewBox="0 0 25 25" class="vt-icon--sm">
                <use xlink:href="#right"/>
              </svg>
            </router-link>
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
      showResults: 5
    }
  },
  computed: {
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
