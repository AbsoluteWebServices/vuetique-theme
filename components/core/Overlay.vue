<template>
  <div class="fixed z-overlay w-full h-screen pin-t pin-l bg-black opacity-75" @click="close" v-if="isVisible" />
</template>

<script>
import Overlay from '@vue-storefront/core/compatibility/components/Overlay'

export default {
  mixins: [Overlay],
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
  },
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setWishlist', false)
      this.$store.commit('ui/setSearchpanel', false)
      this.$store.commit('ui/setSidebar', false)
    }
  }
}
</script>
