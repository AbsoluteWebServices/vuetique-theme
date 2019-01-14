<template>
  <div class="header">
    <header
      class="w-full bg-white border-b border-solid"
    >
      <div class="container">
        <div class="row gutter-md items-center py-2" v-if="!isCheckoutPage">
          <div class="col-auto">
            <div>
              <template v-if="!canGoBack">
                <hamburger-icon class="p-3"/>
              </template>
              <template v-else>
                <return-icon class="p-3" v-if="canGoBack"/>
              </template>
            </div>
          </div>
          <div class="col-grow flex items-center pt-1">
            <logo width="auto" height="41px"/>
            <div class="brand-text ml-2">{{ 'Vuetique' }}</div>
          </div>
          <div class="col-6">
            <search/>
          </div>
          <div class="col-grow justify-end">
            <div class="right-icons">
              <account-icon class="p-3"/>
              <wishlist-icon class="p-3"/>
              <microcart-icon class="p-3"/>
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15 py5" v-if="isCheckoutPage">
          <div class="col-5 md:col-3 middle-xs">
            <div>
              <router-link :to="localizedRoute('/')" class="">
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-2 md:col-6 center-xs">
            <logo width="auto" height="41px"/>
          </div>
          <div class="col-5 md:col-3 end-xs">
            <div>
              <a v-if="!currentUser" href="#" @click.prevent="gotoAccount" class="">
                {{ $t('Login to your account') }}
              </a>
              <span v-else>
                {{ $t('You are logged in as') }} {{ currentUser.firstname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'
import Search from 'theme/components/core/blocks/Header/Search'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    ReturnIcon,
    SearchIcon,
    WishlistIcon,
    Search
  },
  mixins: [CurrentPage],
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    }
  }
}
</script>

<style lang="scss" scoped>
.right-icons {
  //for edge
  float: right;
}
</style>
