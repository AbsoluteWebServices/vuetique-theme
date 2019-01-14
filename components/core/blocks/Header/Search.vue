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
    <div class="absolute z-20 w-full bg-white shadow">
      <product-tile :key="product.id" v-for="product in products" :product="product"/>
      <transition name="fade">
        <div v-if="emptyResults" class="w-full p-4 text-sm text-grey-dark">
          {{ $t('No results were found.') }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import ProductTile from 'theme/components/core/ProductTile'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  components: {
    ProductTile,
    BaseInput
  },
  mixins: [SearchPanel, VueOfflineMixin],
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
