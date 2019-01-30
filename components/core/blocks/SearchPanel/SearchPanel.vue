<template>
  <div
    class="right-sidebar searchpanel max-w-full fixed p-8"
    :class="{ active: isOpen }"
    data-testid="searchPanel"
  >
    <button
      type="button"
      class="absolute pin-t pin-r m-4 h-4"
      @click="closeSearchpanel"
      data-testid="closeSearchPanel"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close"/>
      </svg>
    </button>

    <h2 class="mb-2">
      {{ $t('Search') }}
    </h2>

    <div class="flex items-center relative mb-4">
      <base-input
        ref="search"
        type="text"
        id="search"
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

    <div class="product-listing">
      <product :key="product.id" v-for="product in products" :product="product" @click.native="closeSearchpanel"/>
      <transition name="fade">
        <div v-if="emptyResults" class="no-results">
          {{ $t('No results were found.') }}
        </div>
      </transition>
    </div>

    <div v-show="OnlineOnly" v-if="products.length >= 18" class="flex buttons-set items-center py-8">
      <button-full
        v-if="readMore"
        class="btn-primary flex-grow"
        @click.native="seeMore"
      >
        {{ $t('Load more') }}
      </button-full>
      <button-full
        class="py-2 px-4 ml-4 flex-grow"
        @click.native="closeSearchpanel"
      >
        {{ $t('Close') }}
      </button-full>
    </div>
  </div>
</template>

<script>
import SearchPanel from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel'
import Product from 'theme/components/core/blocks/Search/Product'
import VueOfflineMixin from 'vue-offline/mixin'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    Product,
    BaseInput,
    ButtonFull
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
