<template>
  <div class="default-layout" :class="{ 'header-fixed': navFixed, 'header-visible': navVisible }">
    <icons/>
    <overlay v-if="overlayActive"/>
    <loader/>
    <div id="viewport" class="w-full relative">
      <announcement/>
      <main-header/>
      <header-menu/>
      <transition name="slide-right">
        <sidebar-menu v-if="isSidebarOpen"/>
      </transition>
      <transition name="slide-left">
        <microcart v-if="isMicrocartOpen"/>
        <search-panel v-if="isSearchPanelOpen"/>
        <wishlist v-if="isWishlistOpen"/>
      </transition>
      <slot/>
      <main-footer/>
      <notification/>
      <sign-up/>
      <newsletter-popup/>
      <cookie-notification/>
      <offline-badge/>
      <modal-switcher/>
      <order-confirmation :orders-data="ordersData" v-if="loadOrderConfirmation"/>
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import MainHeader from 'theme/components/core/blocks/Header/Header.vue'
import MainFooter from 'theme/components/core/blocks/Footer/Footer.vue'

import HeaderMenu from 'theme/components/core/blocks/HeaderMenu/HeaderMenu.vue'

import Overlay from 'theme/components/core/Overlay.vue'
import Loader from 'theme/components/core/Loader.vue'
import Modal from 'theme/components/core/Modal.vue'
import Notification from 'theme/components/core/Notification.vue'
import SignUp from 'theme/components/core/blocks/Auth/SignUp.vue'
import NewsletterPopup from 'theme/components/core/NewsletterPopup.vue'
import CookieNotification from 'theme/components/core/CookieNotification.vue'
import OfflineBadge from 'theme/components/core/OfflineBadge.vue'
import ModalSwitcher from 'theme/components/core/blocks/Switcher/Language.vue'

import Announcement from 'theme/components/theme/blocks/Header/Announcement.vue'
import Icons from 'theme/components/theme/Icons.vue'

import Head from 'theme/head'

const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/core/blocks/SearchPanel/SearchPanel.vue')
const SidebarMenu = () => import(/* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue')
const Microcart = () => import(/* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue')
const Wishlist = () => import(/* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist.vue')
const OrderConfirmation = () => import(/* webpackChunkName: "vsf-order-confirmation" */ 'theme/components/core/blocks/Checkout/OrderConfirmation.vue')

export default {
  data () {
    return {
      loadOrderConfirmation: false,
      ordersData: [],
      navFixed: false,
      navVisible: false,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      headerHeight: 165,
      navbarHeight: 70
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      isSearchPanelOpen: state => state.ui.searchpanel,
      isSidebarOpen: state => state.ui.sidebar,
      isMicrocartOpen: state => state.ui.microcart,
      isWishlistOpen: state => state.ui.wishlist
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.loadOrderConfirmation = true
      this.ordersData = payload
      EventBus.$emit('modal-show', 'modal-order-confirmation')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (this.scrollTop > this.headerHeight) {
        this.navFixed = true
        if (this.scrollTop < this.lastScrollTop && this.scrollTop > this.headerHeight + this.navbarHeight * 2) {
          this.navVisible = true
        } else {
          this.navVisible = false
        }
      } else {
        this.navFixed = false
        this.navVisible = false
      }
      this.lastScrollTop = this.scrollTop
    }
  },
  beforeMount () {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
    EventBus.$on('offline-order-confirmation', this.onOrderConfirmation)

    window.addEventListener('scroll', () => {
      this.isScrolling = true
    }, {passive: true})

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  beforeDestroy () {
    EventBus.$off('offline-order-confirmation', this.onOrderConfirmation)
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    HeaderMenu,
    Microcart,
    Wishlist,
    SearchPanel,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    Modal,
    SignUp,
    NewsletterPopup,
    CookieNotification,
    OfflineBadge,
    ModalSwitcher,
    OrderConfirmation,
    Announcement,
    Icons
  }
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
<style lang="scss" scoped>
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform .25s;
  }

  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(100%);
  }

  .slide-right-enter,
  .slide-right-leave-to {
    transform: translateX(-100%);
  }
</style>
