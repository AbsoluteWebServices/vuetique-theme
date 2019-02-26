import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'

import { extendModule } from '@vue-storefront/core/lib/module'
import cartStore from 'theme/store/cart'
import uiStore from 'theme/store/ui'

Vue.use(VueProgressBar)

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  router.addRoutes(routes)
}

const cartExtend = {
  key: 'cart',
  store: { modules: [{ key: 'cart', module: cartStore }] }
}
extendModule(cartExtend)

const uiExtend = {
  key: 'ui',
  store: { modules: [{ key: 'ui', module: uiStore }] }
}
extendModule(uiExtend)

export {
  themeEntry,
  initTheme
}
