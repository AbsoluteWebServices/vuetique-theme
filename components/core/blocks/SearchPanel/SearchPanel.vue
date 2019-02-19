<template>
  <div
    class="right-sidebar searchpanel max-w-full fixed p-8"
    data-testid="searchPanel"
  >
    <button
      type="button"
      :aria-label="$t('Close')"
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
        id="search_panel_input"
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

    <div v-if="visibleProducts.length && categories.length > 1" class="categories mb-4">
      <category-panel :categories="categories" v-model="selectedCategoryIds"/>
    </div>

    <div class="product-listing">
      <product :key="product.id" v-for="product in visibleProducts" :product="product" @click.native="closeSearchpanel"/>
      <transition name="fade">
        <div v-if="emptyResults" class="no-results">
          {{ $t('No results were found.') }}
        </div>
      </transition>
    </div>

    <div v-show="OnlineOnly" v-if="visibleProducts.length >= 18" class="flex buttons-set items-center py-8">
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
import CategoryPanel from 'theme/components/core/blocks/Category/CategoryPanel'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    Product,
    BaseInput,
    ButtonFull,
    CategoryPanel
  },
  mixins: [SearchPanel, VueOfflineMixin],
  data () {
    return {
      selectedCategoryIds: []
    }
  },
  computed: {
    visibleProducts () {
      const productList = this.products || []
      if (this.selectedCategoryIds.length) {
        return productList.filter(product => product.category_ids.some(categoryId => {
          const catId = parseInt(categoryId)
          return this.selectedCategoryIds.includes(catId)
        }))
      }
      return productList
    },
    categories () {
      const categoriesMap = {}
      this.products.forEach(product => {
        [...product.category].forEach(category => {
          categoriesMap[category.category_id] = category
        })
      })
      return Object.keys(categoriesMap).map(categoryId => categoriesMap[categoryId])
    }
  },
  watch: {
    categories () {
      this.selectedCategoryIds = []
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
