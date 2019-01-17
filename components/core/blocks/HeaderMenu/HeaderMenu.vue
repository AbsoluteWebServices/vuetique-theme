<template>
  <div v-if="!isCheckoutPage" class="hidden lg:block w-full bg-white border-b border-solid">
    <div class="container">
      <ul class="flex menu">
        <li
          class="relative"
          :key="category.slug"
          v-for="category in categories"
          :class="{'with-submenu': (category.children_data && category.children_data.length)}"
        >
          <button
            v-if="category.children_data && category.children_data.length > 0"
            class="menu-link"
            :class="{active: activeSubMenu == category.id}"
            type="button"
            :aria-label="$t('Show subcategories')"
            data-testid="categoryButton"
            @click="toggleSubMenu(category.id)"
            @mouseenter="activeSubMenu = category.id"
            @mouseleave="activeSubMenu = null"
          >
            {{ category.name }}
          </button>
          <router-link
            v-else
            class="menu-link"
            :to="localizedRoute({ name: 'category', params: { id: category.id, slug: category.slug }})"
          >
            {{ category.name }}
          </router-link>

          <sub-category
            v-show="activeSubMenu === category.id"
            :category-links="category.children_data"
            :id="category.id"
            :parent-slug="category.slug"
            class="pin-l"
          />
        </li>
        <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/sale')"
            exact
          >
            {{ $t('Sale') }}
          </router-link>
        </li>
        <li>
          <router-link
            class="menu-link"
            :to="localizedRoute('/magazine')"
            exact
          >
            {{ $t('Magazine') }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubCategory from 'theme/components/core/blocks/HeaderMenu/SubCategory'
import CurrentPage from 'theme/mixins/currentPage'

export default {
  name: 'HeaderMenu',
  components: {
    SubCategory
  },
  mixins: [CurrentPage],
  data () {
    return {
      activeSubMenu: null
    }
  },
  computed: {
    categories () {
      return this.$store.state.category.list.filter((op) => {
        return op.level === 2 && // display only the root level (level =1 => Default Category)
          (op.product_count > 0 ||
            (op.children_data && op.children_data.length > 0)
          )
      })
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    })
  },
  created () {
    this.$store.dispatch('category/list', {})
  },
  methods: {
    toggleSubMenu (id) {
      if (this.activeSubMenu === id) {
        this.activeSubMenu = null
        // this.$store.commit('ui/setOverlay', false)
      } else {
        this.activeSubMenu = id
        // this.$store.commit('ui/setOverlay', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  @apply p-0 m-0;
  list-style: none;

  .menu-link {
    @apply block text-black font-medium;
    padding: 15px;
    line-height: 1.25rem;
    text-decoration: none;

    &:hover, &:focus {
      @apply bg-grey-light;
      outline: none;
    }

    &.active, &.router-link-active {
      @apply text-primary bg-grey-lighter border-t-2 border-solid border-primary;
      padding-top: 13px;
    }
  }
}

.with-submenu:hover {
  > .menu-link {
    @extend .menu-link.active;
  }

  > .submenu {
    display: block !important;
  }
}
</style>
