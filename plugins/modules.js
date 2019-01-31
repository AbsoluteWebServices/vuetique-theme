import { extendModule } from '@vue-storefront/core/lib/module'
import cartStore from 'theme/store/cart'
import uiStore from 'theme/store/ui'

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
