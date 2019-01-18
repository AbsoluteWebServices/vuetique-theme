<template>
  <div id="app">
    <svg width="0" height="0" class="hidden">
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29.333" id="cart">
        <defs>
          <clipPath id="a">
            <path d="M0 22h24V0H0z"/>
          </clipPath>
        </defs>
        <g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 29.333)">
          <path d="M12 11a6 6 0 0 0-6 6h1.714a4.286 4.286 0 0 1 8.572 0H18a6 6 0 0 0-6-6m8.438 9.313H3.562L1.687 1.687h20.626zM0 0l2 22h20l2-22z" fill-rule="evenodd"/>
        </g>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.313 17.312" id="close">
        <path d="M16.314 0L8.655 7.657.998 0l-.999.999 7.659 7.658-7.659 7.658.999.997 7.657-7.657 7.659 7.657.999-.997-7.659-7.658L17.313 1z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.333 9.333" id="down">
        <path d="M16.333 0L8.667 7.43 1 0 0 .952l8.667 8.38 8.666-8.38z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.313 17.311" id="error">
        <path d="M16.314 0L8.655 7.657.998 0l-.999.997 7.659 7.66-7.659 7.656.999.998 7.657-7.658 7.659 7.658.999-.998-7.658-7.657L17.313.997z" fill="#c24343"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.333 17.333" id="left">
        <path d="M8.382 0L.001 8.667l8.381 8.668.952-1-7.43-7.668L9.335.999z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.333 17.333" id="right">
        <path d="M.952 0L0 1l7.429 7.667-7.43 7.668.953.999 8.38-8.667z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 18.667" id="sandwich">
        <path d="M0 2.667h32V0H0zm0 8h32V8H0zm0 8h32V16H0z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.333 9.333" id="success">
        <path d="M8.668 0L0 8.38l1 .953 7.668-7.43 7.666 7.43.999-.952z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.333 9.333" id="up">
        <path d="M8.668 0L0 8.38l1 .953 7.668-7.43 7.666 7.43.999-.952z"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22" id="wishlist">
        <path d="M20.606 3.07c-2.162-2.247-4.459-1.401-6.62.845l-1.987 2.03-1.987-2.03C7.851 1.669 5.554.823 3.393 3.07c-2.161 2.247-2.161 5.361 0 7.608l8.606 8.793 8.606-8.793c2.162-2.247 2.162-5.361 0-7.608m1.502 8.42L11.999 21.996 1.892 11.49C-.519 8.984-.687 4.715 1.741 2.224c3.306-3.391 6.69-2.507 9.101 0L12 3.407l1.158-1.183c2.411-2.507 5.795-3.391 9.101 0 2.427 2.491 2.258 6.76-.152 9.266" serifId="Layer 1"/>
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" id="user">
        <path d="M5.5 7.333c0-3.025 2.475-5.5 5.5-5.5s5.5 2.475 5.5 5.5-2.475 5.5-5.5 5.5-5.5-2.475-5.5-5.5m9.35 6.233a7.237 7.237 0 0 0 3.483-6.233C18.333 3.299 15.033 0 11 0S3.667 3.299 3.667 7.333a7.237 7.237 0 0 0 3.483 6.233C3.483 14.941.733 18.149 0 22h1.833c.917-4.217 4.675-7.334 9.167-7.334s8.25 3.117 9.167 7.334H22c-.733-3.942-3.483-7.151-7.15-8.434" fill-rule="nonzero"/>
      </symbol>
            <path d="M0 22h22V0H0z"/>
          </clipPath>
        </defs>
        <g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 29.333)">
          <path d="M5.5 14.666c0 3.025 2.475 5.5 5.5 5.5s5.5-2.475 5.5-5.5-2.475-5.5-5.5-5.5-5.5 2.475-5.5 5.5m9.35-6.233a7.237 7.237 0 0 1 3.483 6.233C18.333 18.7 15.033 22 11 22s-7.333-3.3-7.333-7.334A7.237 7.237 0 0 1 7.15 8.433C3.483 7.058.733 3.85 0 0h1.833C2.75 4.216 6.508 7.333 11 7.333S19.25 4.216 20.167 0H22c-.733 3.942-3.483 7.151-7.15 8.434"/>
        </g>
      </symbol>
    </svg>

    <overlay v-if="overlayActive"/>
    <loader/>
    <div id="viewport" class="w-full relative">
      <microcart/>
      <wishlist/>
      <sidebar-menu/>
      <announcement/>
      <main-header/>
      <header-menu/>
      <router-view/>
      <main-footer/>
      <notification/>
      <sign-up/>
      <newsletter-popup/>
      <cookie-notification/>
      <offline-badge/>
      <modal-switcher/>
      <order-confirmation :orders-data="ordersData"/>
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
import Wishlist from 'theme/components/core/blocks/Wishlist/Wishlist.vue'
import Microcart from 'theme/components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue'
import Announcement from 'theme/components/core/blocks/Header/Announcement.vue'

import Overlay from 'theme/components/core/Overlay.vue'
import Loader from 'theme/components/core/Loader.vue'
import Modal from 'theme/components/core/Modal.vue'
import Notification from 'theme/components/core/Notification.vue'
import SignUp from 'theme/components/core/blocks/Auth/SignUp.vue'
import NewsletterPopup from 'theme/components/core/NewsletterPopup.vue'
import CookieNotification from 'theme/components/core/CookieNotification.vue'
import OfflineBadge from 'theme/components/core/OfflineBadge.vue'
import ModalSwitcher from 'theme/components/core/blocks/Switcher/Language.vue'
import OrderConfirmation from 'theme/components/core/blocks/Checkout/OrderConfirmation.vue'

import Head from 'theme/resource/head'

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.ordersData = payload
      EventBus.$emit('modal-show', 'modal-order-confirmation')
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
    Announcement
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
