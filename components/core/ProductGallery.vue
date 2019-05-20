<template>
  <div class="media-gallery" :class="{'media-gallery--loaded': carouselLoaded}">
    <product-gallery-overlay
      v-if="isZoomOpen"
      :current-slide="currentSlide"
      :product-name="product.name"
      :gallery="gallery"
      @close="toggleZoom"/>
    <div v-show="OfflineOnly">
      <transition name="fade" appear>
        <img class="offline-image w-full" v-lazy="offline" :src="offline.src" ref="offline" alt="">
      </transition>
    </div>
    <no-ssr>
      <product-gallery-carousel
        v-if="showProductGalleryCarousel"
        ref="carousel"
        :gallery="gallery"
        :configuration="configuration"
        :product-name="product.name"
        @toggle="openOverlay"
        @loaded="carouselLoaded = true"
        @pageChange="onPageChange"
      />
    </no-ssr>
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryOverlay from './ProductGalleryOverlay'
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
const ProductGalleryCarousel = () => import(/* webpackChunkName: "vsf-product-gallery-carousel" */ './ProductGalleryCarousel.vue')

export default {
  components: {
    'no-ssr': NoSSR,
    ProductGalleryCarousel,
    ProductGalleryOverlay
  },
  mixins: [
    ProductGallery,
    VueOfflineMixin,
    onEscapePress
  ],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      isZoomOpen: false,
      showProductGalleryCarousel: false,
      currentSlide: 0,
      carouselLoaded: false
    }
  },
  mounted () {
    this.showProductGalleryCarousel = true
  },
  methods: {
    openOverlay (currentSlide) {
      this.currentSlide = currentSlide
      this.toggleZoom()
    },
    validateRoute () {
      this.$forceUpdate()
    },
    toggleZoom () {
      this.isZoomOpen = !this.isZoomOpen
    },
    onEscapePress () {
      if (this.isZoomOpen) {
        this.toggleZoom()
      }
    },
    onPageChange (page) {
      this.$emit('page-change', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.media-gallery {
  text-align: center;
  &.open {
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .product-zoom {
      @media (max-width: 767px) {
        position: absolute;
        top: 50%;
        transform: translate(0,-50%);
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
        -o-transform: translate(0,-50%);
      }
    }
  }
}
</style>
