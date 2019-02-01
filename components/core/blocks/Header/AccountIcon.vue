<template>
  <div class="relative dropdown cursor-pointer"
       data-testid="accountButton"
       @click.self="goToAccount">
    <button
      type="button"
      class="bg-transparent border-0 p-0"
      :aria-label="$t('Open my account')"
    >
      <svg viewBox="0 0 25 25" class="vt-icon">
        <use xlink:href="#user"/>
      </svg>
    </button>
    <ul v-if="currentUser" class="dropdown-content">
      <li v-for="(page, index) in navigation" :key="index" @click="notify(page.title)">
        <router-link class="dropdown-item-link" :to="localizedRoute(page.link)">
          {{ page.title }}
        </router-link>
      </li>
      <li>
        <a href="#" class="dropdown-item-link" @click.prevent="logout">
          {{ $t('Logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import AccountIcon from '@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon'

export default {
  mixins: [AccountIcon],
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

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

.dropdown {

  button {
    pointer-events: none;
  }

  .dropdown-content {
    @apply hidden p-0 m-0 absolute bg-grey-lighter shadow z-10 pin-r list-reset;
    min-width: 200px;
    top: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    &:before {
      @apply block border-solid;
      content: "";
      display: block;
      position: absolute;
      bottom: 100%;
      right: 15px;
      border-width: 8px;
      border-color: transparent transparent config('colors.grey-light') transparent;
    }

    li + li {
      @apply border-t border-solid border-white;
    }

    .dropdown-item-link {
      @apply block w-full text-sm text-grey-dark text-left font-medium;
      padding: 10px 15px;
      text-decoration: none;

      &:hover, &:focus, &.router-link-active {
        @apply text-primary;
        outline: none;
      }
    }
  }

  @media (min-width: 768px) {
    &:hover .dropdown-content {
      display: block;
    }
  }

}
</style>
