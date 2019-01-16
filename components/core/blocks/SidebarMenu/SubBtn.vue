<template>
  <button
    class="inline-flex justify-between w-full px-5 py-4 pr-4 font-medium"
    v-if="type === 'next'"
    type="button"
    @click.stop="next()"
    :aria-label="$t('Show subcategories')"
    data-testid="categoryButton"
  >
    {{ name }}
    <i class="material-icons">keyboard_arrow_right</i>
  </button>
  <button
    class="inline-flex w-full px-5 py-4 pr-4 font-medium"
    v-else
    type="button"
    @click.stop="back()"
    :aria-label="$t('Back')"
  >
    <i class="material-icons">keyboard_arrow_left</i>
    {{ name }}
  </button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SubBtn',
  props: {
    id: {
      type: null,
      default: ''
    },
    type: {
      type: String,
      default: 'next'
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu
    })
  },
  methods: {
    next () {
      this.$store.commit('ui/setSubmenu', {
        id: this.id,
        depth: ++this.submenu.depth
      })
    },
    back () {
      this.$store.commit('ui/setSubmenu', {
        depth: --this.submenu.depth
      })
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  i {
    @apply text-grey;
    font-size: 25px;
    line-height: 17px;
  }
  &:hover,
  &:focus {
    i {
      @apply text-black;
    }
  }
}
</style>
