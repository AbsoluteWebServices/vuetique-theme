// Add your own plugins in this folder with Vue.use()
import Vue from 'vue'

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar)

// we need it to be called before modules registration
require('./modules')
