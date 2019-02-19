<template>
  <div class="sidebar-menu h-screen fixed max-w-full bg-white pt-12">
    <button
      type="button"
      :aria-label="$t('Close')"
      class="absolute pin-t pin-r m-4 h-4"
      @click="closeMenu"
    >
      <svg viewBox="0 0 25 25" class="vt-icon--sm">
        <use xlink:href="#close"/>
      </svg>
    </button>

    <div v-if="submenu.depth" class="absolute pin-l pin-t">
      <sub-btn type="back" />
    </div>

    <ul class="list-reset relative border-t sidebar-menu__list" :style="mainListStyles">
      <li
        class="border-b flex"
        :key="category.slug"
        @click="closeMenu"
        v-for="category in visibleCategories"
      >
        <div v-if="isCurrentMenuShowed" class="w-full">
          <sub-btn
            :id="category.id"
            :name="category.name"
            v-if="category.children_count > 0"
          />
          <router-link
            v-else
            class="category-link"
            :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
          >
            {{ category.name }}
          </router-link>
        </div>

        <sub-category
          :category-links="category.children_data"
          :id="category.id"
          :parent-slug="category.slug"
        />
      </li>
      <li @click="closeMenu" v-if="isCurrentMenuShowed" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/sale')"
          exact
        >
          {{ $t('Sale') }}
        </router-link>
      </li>
      <li @click="closeMenu" v-if="isCurrentMenuShowed" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/magazine')"
          exact
        >
          {{ $t('Magazine') }}
        </router-link>
      </li>
      <li @click="closeMenu" v-if="isCurrentMenuShowed" class="border-b md:hidden">
        <button
          class="menu-link text-left"
          type="button"
          @click="toggleSearchpanel"
        >
          {{ $t('Search') }}
        </button>
      </li>
      <li @click="closeMenu" v-if="compareIsActive && isCurrentMenuShowed" class="border-b">
        <router-link
          class="menu-link"
          :to="localizedRoute('/compare')"
          exact
        >
          {{ $t('Compare products') }}
        </router-link>
      </li>
      <li @click="closeMenu" v-if="isCurrentMenuShowed" class="border-b">
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
          v-if="!currentUser && isCurrentMenuShowed"
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
import { AccountButton } from '@vue-storefront/core/modules/user/components/AccountButton'
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn'
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory'

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu, AccountButton],
  data () {
    return {
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
      ],
      componentLoaded: false
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    }),
    getSubmenu () {
      return this.submenu
    },
    visibleCategories () {
      return this.categories.filter(category => {
        return category.product_count > 0 || category.children_count > 0
      })
    },
    isCurrentMenuShowed () {
      return !this.getSubmenu || !this.getSubmenu.depth
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    login () {
      this.$nextTick(() => {
        this.goToAccount()
      })
    },
    toggleSearchpanel () {
      this.$store.commit('ui/setSearchpanel', true)
    }
  }
}
</script>

<style lang="scss">
@import "~theme/css/animations/transitions";

@screen lg {
  .header-fixed .sidebar-menu {
    top: 70px;
    max-height: calc(100vh - 70px);
  }
}

.sidebar-menu {
  width: 100vh;
  top: 70px;
  left: 0;
  overflow: hidden;
  overflow-y: auto;
  z-index: 3;
  max-height: calc(100vh - 70px);

  @screen md {
    width: 350px;
  }

  @screen lg {
    top: 0;
    max-height: 100vh;
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
