<template>
  <div class="media-zoom z-modal">
    <svg @click="$emit('close')" viewBox="0 0 25 25" class="vt-icon--lg p-3 cursor-pointer media-zoom__close">
      <use xlink:href="#close"/>
    </svg>
    <no-ssr>
      <product-gallery-zoom-carousel
        v-if="showProductGalleryZoomCarousel"
        :current-slide="currentSlide"
        :gallery="gallery"
        :product-name="productName"
      />
    </no-ssr>
  </div>
</template>
<script>
import NoSSR from 'vue-no-ssr'
const ProductGalleryZoomCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-zoom-carousel" */ './ProductGalleryZoomCarousel.vue')

export default {
  name: 'ProductGalleryOverlay',
  props: {
    currentSlide: {
      type: Number,
      required: false,
      default: 0
    },
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      showProductGalleryZoomCarousel: false
    }
  },
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoomCarousel
  },
  mounted () {
    this.$store.commit('ui/setOverlay', true)
    this.showProductGalleryZoomCarousel = true
  },
  destroyed () {
    this.$store.commit('ui/setOverlay', false)
  }
}
</script>
<style lang="scss" scoped>
.media-zoom {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;

  &__close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
