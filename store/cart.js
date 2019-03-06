import Vue from 'vue'
import rootStore from '@vue-storefront/core/store'
import i18n from '@vue-storefront/i18n'
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import omit from 'lodash-es/omit'
import { Logger } from '@vue-storefront/core/lib/logger'

function getAddToCartNotificationData (dispatch) {
  let notificationData = {}
  if (!rootStore.state.config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
    notificationData = {
      type: 'success',
      message: i18n.t('Product has been added to cart'),
      action1: {
        label: i18n.t('Proceed to checkout'),
        action: () => {
          dispatch('goToCheckout')
        }
      },
      action2: { label: i18n.t('Continue Shopping') }
    }
  } else {
    notificationData = {
      type: 'success',
      message: i18n.t('Product has been added to cart'),
      action1: null,
      action2: { label: i18n.t('Continue Shopping') }
    }
  }

  return notificationData
}

const state = {
  // override state of core ui module...
}

const mutations = {
  // override mutations of core ui module...
}

const actions = {
  addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false }) {
    // NOTE: @AbsoluteWeb {
    Vue.prototype.$bus.$emit('cart-before-add', { product: productToAdd })
    // NOTE: } @AbsoluteWeb

    let productsToAdd = []
    if (productToAdd.type_id === 'grouped') { // TODO: add bundle support
      productsToAdd = productToAdd.product_links.filter((pl) => { return pl.link_type === 'associated' }).map((pl) => { return pl.product })
    } else {
      productsToAdd.push(productToAdd)
    }
    let productHasBeenAdded = false
    let productIndex = 0
    for (let product of productsToAdd) {
      if (typeof product === 'undefined' || product === null) continue
      if (product.priceInclTax <= 0) {
        rootStore.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Product price is unknown, product cannot be added to the cart!'),
          action1: { label: i18n.t('OK') }
        })
        continue
      }
      if (rootStore.state.config.entities.optimize && rootStore.state.config.entities.optimizeShoppingCart) {
        product = omit(product, ['configurable_children', 'configurable_options', 'media_gallery', 'description', 'category', 'category_ids', 'product_links', 'stock', 'description'])
      }
      if (product.errors !== null && typeof product.errors !== 'undefined') {
        let productCanBeAdded = true
        for (let errKey in product.errors) {
          if (product.errors[errKey]) {
            productCanBeAdded = false
            rootStore.dispatch('notification/spawnNotification', {
              type: 'error',
              message: product.errors[errKey],
              action1: { label: i18n.t('OK') }
            })
          }
        }
        if (!productCanBeAdded) {
          continue
        }
      }
      const record = state.cartItems.find(p => p.sku === product.sku)
      dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
        product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
        if (result.status === 'volatile') {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'warning',
            message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
            action1: { label: i18n.t('OK') }
          })
        }
        if (result.status === 'out_of_stock') {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('The product is out of stock and cannot be added to the cart!'),
            action1: { label: i18n.t('OK') }
          })
        }
        if (result.status === 'ok' || result.status === 'volatile') {
          commit(types.CART_ADD_ITEM, { product })
          productHasBeenAdded = true
        }
        if (productIndex === (productsToAdd.length - 1) && productHasBeenAdded) {
          // NOTE: @AbsoluteWeb {
          let notificationData = getAddToCartNotificationData(dispatch)
          // NOTE: } @AbsoluteWeb

          if (rootStore.state.config.cart.synchronize && !forceServerSilence) {
            dispatch('serverPull', { forceClientState: true })
          } else {
            rootStore.dispatch('notification/spawnNotification', notificationData)
          }
        }
        productIndex++
      })
    }
  },

  servercartAfterItemUpdated (context, event) {
    const originalCartItem = JSON.parse(event.payload.body).cartItem
    console.log('servercartAfterItemUpdated', originalCartItem)
    if (event.resultCode !== 200) {
      // TODO: add the strategy to configure behaviour if the product is (confirmed) out of the stock
      if (originalCartItem.item_id) {
        rootStore.dispatch('cart/getItem', originalCartItem.sku, { root: true }).then((cartItem) => {
          if (cartItem) {
            console.log('Restoring qty after error', originalCartItem.sku, cartItem.prev_qty)
            if (cartItem.prev_qty > 0) {
              rootStore.dispatch('cart/updateItem', { product: { qty: cartItem.prev_qty } }, { root: true }) // update the server_id reference
              Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: cartItem })
            } else {
              rootStore.dispatch('cart/removeItem', { product: cartItem, removeByParentSku: false }, { root: true }) // update the server_id reference
            }
          }
        })
      } else {
        Logger.warn('Removing product from cart', 'cart', originalCartItem)()
        rootStore.commit('cart/' + types.CART_DEL_NON_CONFIRMED_ITEM, { product: originalCartItem }, {root: true})
      }
      // NOTE: @AbsoluteWeb {
      Vue.prototype.$bus.$emit('cart-after-add', { type: 'error' })
      // NOTE: } @AbsoluteWeb
    } else {
      // NOTE: @AbsoluteWeb {
      let notificationData = getAddToCartNotificationData(context.dispatch)
      rootStore.dispatch('notification/spawnNotification', notificationData)
      Vue.prototype.$bus.$emit('cart-after-add', { type: 'success' })
      // NOTE: } @AbsoluteWeb
    }
  }
}

export default {
  state,
  mutations,
  actions
}
