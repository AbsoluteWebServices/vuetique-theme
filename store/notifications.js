import rootStore from '@vue-storefront/core/modules/cart/store'
import { extendStore } from '@vue-storefront/core/lib/themes'

const state = {
  // override state of core ui module...
}

const mutations = {
  // override mutations of core ui module...
}

const actions = {
  addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false }) {
    console.log('addItem', state)
    // let productsToAdd = []
    // if (productToAdd.type_id === 'grouped') { // TODO: add bundle support
    //   productsToAdd = productToAdd.product_links.filter((pl) => { return pl.link_type === 'associated' }).map((pl) => { return pl.product })
    // } else {
    //   productsToAdd.push(productToAdd)
    // }
    // let productHasBeenAdded = false
    // let productIndex = 0
    // for (let product of productsToAdd) {
    //   if (typeof product === 'undefined' || product === null) continue
    //   if (product.priceInclTax <= 0) {
    //     rootStore.dispatch('notification/spawnNotification', {
    //       type: 'error',
    //       message: i18n.t('Product price is unknown, product cannot be added to the cart!'),
    //       action1: { label: i18n.t('OK') }
    //     })
    //     continue
    //   }
    //   if (rootStore.state.config.entities.optimize && rootStore.state.config.entities.optimizeShoppingCart) {
    //     product = omit(product, ['configurable_children', 'configurable_options', 'media_gallery', 'description', 'category', 'category_ids', 'product_links', 'stock', 'description'])
    //   }
    //   if (product.errors !== null && typeof product.errors !== 'undefined') {
    //     let productCanBeAdded = true
    //     for (let errKey in product.errors) {
    //       if (product.errors[errKey]) {
    //         productCanBeAdded = false
    //         rootStore.dispatch('notification/spawnNotification', {
    //           type: 'error',
    //           message: product.errors[errKey],
    //           action1: { label: i18n.t('OK') }
    //         })
    //       }
    //     }
    //     if (!productCanBeAdded) {
    //       continue
    //     }
    //   }
    //   const record = state.cartItems.find(p => p.sku === product.sku)
    //   dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
    //     product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
    //     if (result.status === 'volatile') {
    //       rootStore.dispatch('notification/spawnNotification', {
    //         type: 'warning',
    //         message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
    //         action1: { label: i18n.t('OK') }
    //       })
    //     }
    //     if (result.status === 'out_of_stock') {
    //       rootStore.dispatch('notification/spawnNotification', {
    //         type: 'error',
    //         message: i18n.t('The product is out of stock and cannot be added to the cart!'),
    //         action1: { label: i18n.t('OK') }
    //       })
    //     }
    //     if (result.status === 'ok' || result.status === 'volatile') {
    //       commit(types.CART_ADD_ITEM, { product })
    //       productHasBeenAdded = true
    //     }
    //     if (productIndex === (productsToAdd.length - 1) && productHasBeenAdded) {
    //       let notificationData = {
    //         type: 'success',
    //         message: i18n.t('Product has been added to the cart!'),
    //         action1: { label: i18n.t('OK') },
    //         action2: null
    //       }
    //       if (!rootStore.state.config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
    //         notificationData.action2 = { label: i18n.t('Proceed to checkout'), action: () => {
    //           dispatch('goToCheckout')
    //         }}
    //       }
    //       if (rootStore.state.config.cart.synchronize && !forceServerSilence) {
    //         dispatch('serverPull', { forceClientState: true })
    //       } else {
    //         rootStore.dispatch('notification/spawnNotification', notificationData)
    //       }
    //     }
    //     productIndex++
    //   })
    // }
  }
}
console.log('extendStore', extendStore)
console.log('actions', actions)
export default extendStore(rootStore, {
  state,
  mutations,
  actions
})
