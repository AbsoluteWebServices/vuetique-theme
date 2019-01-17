import { extendModule } from '@vue-storefront/core/lib/module'
import cartStore from 'theme/store/cart'

const cartExtend = {
  key: 'cart',
  store: { modules: [{ key: 'cart', module: cartStore }] }
}

extendModule(cartExtend)
