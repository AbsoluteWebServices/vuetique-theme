<template>
  <ul
    v-if="categoryLinks"
    class="submenu"
  >
    <li
      v-if="parentSlug"
    >
      <router-link
        class="menu-link"
        :to="localizedRoute({ name: 'category', params: { id: id, slug: parentSlug }})"
        data-testid="categoryLink"
      >
        {{ $t('View all') }}
      </router-link>
    </li>
    <li
      class="relative"
      :key="link.slug"
      v-for="link in categoryLinks"
    >
      <button
        v-if="link.children_data.length"
        class="menu-link"
        :class="{active: activeSubMenu == link.id}"
        type="button"
        :aria-label="$t('Show subcategories')"
        data-testid="categoryButton"
        @click="activeSubMenu == link.id ? activeSubMenu = null : activeSubMenu = link.id"
      >
        {{ link.name }}
      </button>
      <router-link
        v-else
        class="menu-link"
        :to="localizedRoute({ name: 'category', params: { id: link.id, slug: link.slug }})"
      >
        {{ link.name }}
      </router-link>
      <sub-category
        v-show="activeSubMenu === link.id"
        :category-links="link.children_data"
        :id="link.id"
        v-if="link.children_data.length"
        :parent-slug="link.slug"
        class="pin-t left-100"
      />
    </li>
  </ul>
</template>
<script>
export default {
  name: 'SubCategory',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    parentSlug: {
      type: String,
      required: false,
      default: ''
    },
    categoryLinks: {
      type: null,
      required: false,
      default: false
    }
  },
  data () {
    return {
      activeSubMenu: null
    }
  }
}
</script>

<style lang="scss" scoped>
.left-100 {
  left: 100%;
}

.submenu {
  @apply p-0 m-0 absolute min-w-full bg-grey-lighter shadow z-10;
  list-style: none;
  min-width: 150px;

  li {
    @apply border-t border-solid border-white;
  }

  .menu-link {
    @apply block w-full text-sm text-grey-dark text-left font-medium;
    padding: 15px;
    line-height: 1.25rem;
    text-decoration: none;

    &:hover, &:focus, &.router-link-active {
      @apply text-primary;
      outline: none;
    }

    &.active {
      @apply text-primary border-l-2 border-solid border-primary;
      padding-left: 13px;
    }
  }
}
</style>
