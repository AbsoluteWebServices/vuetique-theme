<template>
  <div class="loader-container fixed" v-if="isVisible">
    <div class="loader-inner-container fixed">
      <div
        class="loader-message-container py-3 px-5 text-h6 text-white"
        v-if="message"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Loader',
  data () {
    return {
      message: null
    }
  },
  methods: {
    show (message = null) {
      this.message = message
      this.$store.commit('ui/setLoader', true)
    },
    hide () {
      this.$store.commit('ui/setLoader', false)
    }
  },
  computed: mapState({
    isVisible: state => state.ui.loader
  }),
  beforeMount () {
    this.$bus.$on('notification-progress-start', this.show)
    this.$bus.$on('notification-progress-stop', this.hide)
  },
  beforeDestroy () {
    this.$bus.$off('notification-progress-start', this.show)
    this.$bus.$off('notification-progress-stop', this.hide)
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-container-bg: color(black);
$color-message-bg: color(success);
$z-index-loader: map-get($z-index, loader);

.loader-container {
  z-index: $z-index-loader;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color-container-bg, 0.65);
}

.loader-inner-container {
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.loader-message-container {
  @apply bg-primary;
  border-radius: 50px;
  letter-spacing: 0.5px;
}
</style>
