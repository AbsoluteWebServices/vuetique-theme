<template>
  <div>
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="$props.title" />
    <header class="container mt-2">
      <h1>{{ $props.title }}</h1>
    </header>

    <div class="container pt-10 pb-16">
      <div class="row gutter-md justify-between">
        <div class="md:col-3 lg:col-2 mb-8">
          <nav class="static-menu">
            <ul class="border-t">
              <li class="border-b py-2" v-for="element in navigation" :key="element.id">
                <router-link :to="localizedRoute(element.link)" class="nav-link">
                  {{ element.title }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-12 md:col-9 leading-loose static-content">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import StaticExample from 'theme/components/theme/blocks/Static/Example'
import StaticShortExample from 'theme/components/theme/blocks/Static/Short'
import { getPathForStaticPage } from 'theme/helpers'
import { localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  components: {
    Breadcrumbs
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    activeComponent () {
      const matchedNav = this.navigation.find(nav => nav.link.includes(this.$route.path))
      return matchedNav ? matchedNav.component : null
    }
  },
  data () {
    return {
      navigation: [
        { title: i18n.t('About us'), link: getPathForStaticPage('/about-us'), component: StaticExample },
        { title: i18n.t('Customer service'), link: getPathForStaticPage('/customer-service'), component: StaticShortExample },
        { title: i18n.t('Store locator'), link: localizedRoute('/store-locator'), component: StaticExample },
        { title: i18n.t('Delivery'), link: '/delivery', component: StaticShortExample },
        { title: i18n.t('Return policy'), link: '/returns', component: StaticExample },
        { title: i18n.t('Privacy policy'), link: '/privacy', component: StaticShortExample },
        { title: i18n.t('Size guide'), link: '/size-guide', component: StaticExample },
        { title: i18n.t('Contact us'), link: '/contact', component: StaticShortExample }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
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

.static-content {
  *:first-of-type {
    margin-top: 0;
  }
}
</style>
