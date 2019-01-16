<template>
  <div class="sidebar-menu h-screen fixed max-w-full bg-white pt-12" :class="{ active: isOpen }">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute pin-t pin-r m-4"
      @click="closeMenu"
    >
      <i class="material-icons text-h3 text-grey-dark">close</i>
    </button>

    <div v-if="submenu.depth" class="absolute pin-l pin-t">
      <sub-btn type="back" />
    </div>

    <ul class="list-reset relative border-t sidebar-menu__list" :style="mainListStyles">
      <li
        class="border-b flex"
        :key="category.slug"
        @click="closeMenu"
        v-for="category in categories"
        v-if="category.product_count > 0 || (category.children_data && category.children_data.length > 0)"
      >
        <sub-btn
          :id="category.id"
          :name="category.name"
          v-if="category.children_data && category.children_data.length > 0"
          @click.native="activeSubMenu = category.id"
        />
        <router-link
          v-else
          class="category-link"
          :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
        >
          {{ category.name }}
        </router-link>

        <sub-category
          v-show="activeSubMenu === category.id"
          :category-links="category.children_data"
          :id="category.id"
          :parent-slug="category.slug"
        />
      </li>
      <li @click="closeMenu" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/sale')"
          exact
        >
          {{ $t('Sale') }}
        </router-link>
      </li>
      <li @click="closeMenu" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/magazine')"
          exact
        >
          {{ $t('Magazine') }}
        </router-link>
      </li>
      <li @click="closeMenu" v-if="compareIsActive" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/compare')"
          exact
        >
          {{ $t('Compare products') }}
        </router-link>
      </li>
      <li @click="closeMenu" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/order-tracking')"
          exact
        >
          {{ $t('Track my order') }}
        </router-link>
      </li>
      <li @click="closeMenu" class="flex border-b">
        <sub-btn
          v-if="currentUser"
          :name="$t('My account')"
          class=""
        />
        <sub-category
          v-if="currentUser"
          :my-account-links="myAccountLinks"
          :id="'foo'"
        />
        <a
          v-if="!currentUser"
          href="#"
          @click.prevent="login"
          class="menu-link"
        >
          {{ $t('My account') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'

import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu'
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory'

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu],
  data () {
    return {
      activeSubMenu: null,
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          url: '/my-account/shipping-details'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          url: '/my-account/newsletter'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          url: '/my-account/orders'
        },
        {
          id: 5,
          name: i18n.t('My loyalty card'),
          url: '#'
        },
        {
          id: 6,
          name: i18n.t('My product reviews'),
          url: '#'
        }
      ]
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    })
  },
  methods: {
    login () {
      this.$bus.$emit('modal-show', 'modal-signup')
      this.$router.push({ name: 'my-account' })
    }
  }
}
</script>

<style lang="scss">
@import "~theme/css/animations/transitions";

.sidebar-menu {
  width: 350px;
  top: 0;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  transform: translateX(-100%);
  z-index: 3;
  transition: transform $duration-main $motion-main;

  @media (max-width: 767px) {
    width: 100vh;
  }

  &.active {
    transform: translateX(0);
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
  }

  .category-link {
    @apply block w-full px-5 py-4 text-black font-medium;
  }

  .menu-link {
    @apply block w-full px-5 py-4 text-grey-dark text-sm font-medium bg-grey-lighter;

    &:hover, &:focus {
      @apply text-black;
    }
  }
}
</style>
