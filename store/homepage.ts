import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

export const homepageStore = {
  namespaced: true,
  state: {
    new_collection: [],
    bestsellers: [],
    sales_collection: []
  },
  actions: {
    async fetchNewCollection ({ commit, dispatch }) {
      const newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })

      const { items } = await dispatch('product/findProducts', {
        query: newProductsQuery,
        size: 8,
        sort: 'created_at:desc',
        options: {
          populateRequestCacheTags: true,
          prefetchGroupProducts: false
        }
      }, { root: true })

      commit('SET_NEW_COLLECTION', items)
    },
    async loadBestsellers ({ commit, dispatch }) {
      const { items } = await dispatch('product/findProducts', {
        query: prepareQuery({ queryConfig: 'bestSellers' }),
        size: 8,
        sort: 'created_at:desc',
        options: {
          populateRequestCacheTags: true,
          prefetchGroupProducts: false
        }
      }, { root: true })

      commit('SET_BESTSELLERS', items)
    },
    async fetchSalesCollection ({ commit, dispatch }) {
      const salesQuery = prepareQuery({ queryConfig: 'inspirations' })

      const { items } = await dispatch('product/findProducts', {
        query: salesQuery,
        size: 8,
        sort: 'created_at:desc',
        options: {
          populateRequestCacheTags: true,
          prefetchGroupProducts: false
        }
      }, { root: true })

      commit('SET_SALES_COLLECTION', items)
    }
  },
  mutations: {
    SET_NEW_COLLECTION (state, products) {
      state.new_collection = products || []
    },
    SET_BESTSELLERS (state, bestsellers) {
      state.bestsellers = bestsellers
    },
    SET_SALES_COLLECTION (state, products) {
      state.sales_collection = products
    }
  },
  getters: {
    getEverythingNewCollection (state) {
      return state.new_collection
    },
    getBestsellers (state) {
      return state.bestsellers
    },
    getSalesCollection (state) {
      return state.sales_collection
    }
  }
}
