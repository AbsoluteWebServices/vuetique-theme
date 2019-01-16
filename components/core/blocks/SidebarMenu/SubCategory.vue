<template>
  <div>
    <ul
      v-if="categoryLinks"
      class="sidebar-submenu list-reset absolute w-full bg-white border-t"
      :style="styles"
    >
      <li
        class="border-b flex"
        v-if="parentSlug"
      >
        <router-link
          class="category-link"
          :to="localizedRoute({ name: 'category', params: { id: id, slug: parentSlug }})"
          data-testid="categoryLink"
        >
          {{ $t('View all') }}
        </router-link>
      </li>
      <li
        class="border-b flex"
        :key="link.slug"
        v-for="link in categoryLinks"
      >
        <sub-btn
          :id="link.id"
          :name="link.name"
          v-if="link.children_data.length"
        />
        <router-link
          v-else
          class="category-link"
          :to="localizedRoute({ name: 'category', params: { id: link.id, slug: link.slug }})"
        >
          {{ link.name }}
        </router-link>
        <sub-category
          :category-links="link.children_data"
          :id="link.id"
          v-if="link.children_data.length"
          :parent-slug="link.slug"
        />
      </li>
    </ul>
    <ul
      v-if="myAccountLinks"
      class="sidebar-submenu list-reset fixed w-full"
      :style="styles"
    >
      <li
        class="border-b flex"
        :key="link.id"
        v-for="link in myAccountLinks"
        @click="notify(link.name)"
      >
        <router-link
          class="menu-link"
          :to="localizedRoute(link.url)"
        >
          {{ link.name }}
        </router-link>
      </li>
      <li class="border-b flex">
        <a href="#" class="menu-link" @click.prevent="logout">
          {{ $t('Logout') }}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SubBtn from './SubBtn.vue'
import i18n from '@vue-storefront/i18n'

export default {
  name: 'SubCategory',
  components: {
    SubBtn
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    myAccountLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    }),
    styles () {
      const pos = this.submenu.path.indexOf(this.id)
      return pos !== -1 ? {
        zIndex: pos + 1
      } : false
    }
  },
  methods: {
    logout () {
      this.$bus.$emit('user-before-logout')
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK') }
        })
      }
    }
  }
}
</script>
<style scoped>
  .sidebar-submenu {
    left: 0;
    top: 0;
    min-height: 100%;
    transform: translateX(-100%);
  }
</style>
