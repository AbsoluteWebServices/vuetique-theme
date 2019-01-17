<template>
  <div id="my_account">
    <breadcrumbs
      :routes="[{name: 'Homepage', route_link: '/'}]"
      active-route="My Account"
    />
    <header class="container mt-2">
      <h1>{{ $t('My Account') }}</h1>
    </header>

    <div class="container pt-10 pb-16">
      <div class="row gutter-md justify-between">
        <div class="md:col-3 lg:col-2 mb-8">
          <nav class="static-menu serif h4 mb35">
            <ul class="list-reset border-t">
              <li class="border-b py-2" v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
                <router-link :to="localizedRoute(page.link)" class="nav-link">{{ page.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-12 md:col-9">
          <component :is="this.$props.activeBlock" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccount from '@vue-storefront/core/pages/MyAccount'
import Breadcrumbs from '../components/core/Breadcrumbs'
import MyProfile from '../components/core/blocks/MyAccount/MyProfile'
import MyShippingDetails from '../components/core/blocks/MyAccount/MyShippingDetails'
import MyNewsletter from '../components/core/blocks/MyAccount/MyNewsletter'
import MyOrders from '../components/core/blocks/MyAccount/MyOrders'
import MyOrder from '../components/core/blocks/MyAccount/MyOrder'
import MyRecentlyViewed from '../components/core/blocks/MyAccount/MyRecentlyViewed'

export default {
  data () {
    return {
      navigation: [
        { title: this.$t('My profile'), link: '/my-account' },
        { title: this.$t('My shipping details'), link: '/my-account/shipping-details' },
        { title: this.$t('My newsletter'), link: '/my-account/newsletter' },
        { title: this.$t('My orders'), link: '/my-account/orders' },
        { title: this.$t('My loyalty card'), link: '#' },
        { title: this.$t('My product reviews'), link: '#' },
        { title: this.$t('My Recently viewed products'), link: '/my-account/recently-viewed' }
      ]
    }
  },
  components: {
    Breadcrumbs,
    MyProfile,
    MyShippingDetails,
    MyNewsletter,
    MyOrders,
    MyOrder,
    MyRecentlyViewed
  },
  mixins: [MyAccount],
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: this.$t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: this.$t('OK') }
        })
      }
    }
  }
}
</script>

<style lang="scss">
//@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);

.static-menu {
  .nav-link {
    @apply block text-black font-medium py-1;

    &:hover, &:focus {
      @apply text-primary2;
    }

    &.router-link-exact-active {
      @apply text-primary2;

      &::before {
        content: "\25B8";
        margin-right: 10px;
      }
    }
  }
}
</style>
