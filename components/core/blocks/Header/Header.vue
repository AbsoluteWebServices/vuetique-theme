<template>
  <div class="header">
    <header
      class="fixed lg:static pin-t z-header w-full bg-white border-b border-solid"
    >
      <div class="container">
        <div class="row gutter-md items-center py-2" v-if="!isCheckoutPage">
          <div class="col-auto sm:col-4 lg:col-auto">
            <div>
              <template v-if="!canGoBack">
                <hamburger-icon class="p-3"/>
              </template>
              <template v-else>
                <return-icon class="p-3" v-if="canGoBack"/>
              </template>
            </div>
          </div>
          <div class="col-grow sm:col-4 lg:col-grow flex items-center justify-center lg:justify-start">
            <logo/>
          </div>
          <div class="col-6 hidden lg:block">
            <search/>
          </div>
          <div class="col-auto sm:col-4 lg:col-grow justify-end">
            <div class="right-icons flex">
              <search-icon class="p-3 hidden md:block lg:hidden"/>
              <account-icon class="p-3 hidden sm:block"/>
              <compare-icon class="p-3 hidden sm:block"/>
              <wishlist-icon class="p-3 hidden sm:block"/>
              <microcart-icon class="p-3"/>
            </div>
          </div>
        </div>
        <div class="row gutter-md items-center justify-between py-4" v-if="isCheckoutPage">
          <div class="col-3 flex items-center">
            <div>
              <router-link :to="localizedRoute('/')" class="flex text-grey">
                <span class="hidden md:inline">
                  &lt;&nbsp;{{ $t('Return to shopping') }}
                </span>
                <svg class="vt-icon md:hidden" viewBox="0 0 25 25">
                  <use xlink:href="#left"/>
                </svg>
              </router-link>
            </div>
          </div>
          <div class="col-6 flex items-center justify-center">
            <logo/>
          </div>
          <div class="col-3 flex justify-end">
            <div>
              <a v-if="!currentUser" href="#" @click.prevent="gotoAccount" class="flex text-grey">
                <span class="hidden md:inline">
                  {{ $t('Login to your account') }}&nbsp;&gt;
                </span>
                <svg class="vt-icon md:hidden" viewBox="0 0 25 25">
                  <use xlink:href="#user"/>
                </svg>
              </a>
              <span class="text-xs sm:text-sm md:text-base text-grey" v-else>
                {{ $t('You are logged in as') }} {{ currentUser.firstname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
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
import Search from 'theme/components/core/blocks/Search/Search'

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
header {
  height: 70px;

  @screen lg {
    top: -70px;
  }
}

.header-placeholder {
  height: 70px;

  @screen lg {
    height: 0;
  }
}

.right-icons {
  //for edge
  float: right;
}

@screen lg {
  .header-fixed {
    header {
      position: fixed;
      top: -70px;
      left: 0;
      right: 0;
      transition: top 0.2s ease-in-out;
    }

    .header-placeholder {
      height: 70px;
    }

    &.header-visible header {
      top: 0;
    }
  }
}
</style>
