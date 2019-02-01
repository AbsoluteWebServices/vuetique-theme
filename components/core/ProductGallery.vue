<template>
  <div class="media-gallery">
    <product-gallery-zoom
      v-if="isZoomOpen"
      :current="$refs.carousel.currentPage"
      :title="product.name"
      :gallery="gallery"
      @close="toggleZoom"/>
    <div v-show="OfflineOnly">
      <transition name="fade" appear>
        <img class="offline-image" v-lazy="offline" :src="offline.src" ref="offline" alt="">
      </transition>
    </div>
    <div v-show="OnlineOnly">
      <div class="relative">
        <div v-if="gallery.length === 1">
          <transition name="fade" appear>
            <img
              :src="defaultImage.src"
              v-lazy="defaultImage"
              class="mw-100 cursor-pointer"
              ref="defaultImage"
              :alt="product.name | htmlDecode"
              itemprop="image"
            >
          </transition>
        </div>
        <div v-else>
          <no-ssr>
            <carousel
              ref="carousel"
              :per-page="1"
              :mouse-drag="false"
              :navigation-enabled="true"
              pagination-active-color="#222222"
              pagination-color="#828282"
              navigation-next-label="<svg viewBox='0 0 25 25' class='vt-icon cursor-pointer'><use xlink:href='#right'/></svg>"
              navigation-prev-label="<svg viewBox='0 0 25 25' class='vt-icon cursor-pointer'><use xlink:href='#left'/></svg>"
              @pageChange="onPageChange"
              :speed="carouselTransitionSpeed"
            >
              <slide
                v-for="images in gallery"
                :key="images.src">
                <div>
                  <img
                    class="product-image inline-flex cursor-pointer mw-100"
                    v-lazy="images"
                    ref="images"
                    @dblclick="toggleZoom"
                    :alt="product.name | htmlDecode"
                    data-testid="productGalleryImage"
                    itemprop="image"
                  >
                </div>
              </slide>
            </carousel>
          </no-ssr>
          <i
            class="zoom-in material-icons p-4 cursor-pointer"
            @click="toggleZoom"
          >zoom_in</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductGallery } from '@vue-storefront/core/modules/catalog/components/ProductGallery.ts'
import ProductGalleryZoom from './ProductGalleryZoom'
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  components: {
    'no-ssr': NoSSR,
    ProductGalleryZoom
  },
  mixins: [ProductGallery, VueOfflineMixin],
  watch: {
    '$route': 'validateRoute'
  },
  data () {
    return {
      loaded: true,
      currentPage: null,
      carouselTransitionSpeed: 0
    }
  },
  methods: {
    validateRoute () {
      this.$forceUpdate()
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
.offline-image {
  width: 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
img {
  mix-blend-mode: multiply;
  vertical-align: top;
}

.thumbnails {
  div {
    margin: 0 20px 20px 0;
  }
}
</style>
<style lang="scss">
.media-gallery {
  .VueCarousel-pagination {
    @apply mt-2 mb-5 float-left;
  }
  .VueCarousel-navigation-button {
    margin: 0;
    transform: translateY(-50%) !important;
  }
  .VueCarousel-slide {
    @apply bg-grey-lightest;
    backface-visibility: unset;
  }
  .VueCarousel-navigation {
    opacity: 0;
    &--disabled {
      opacity: 0.3;
    }
  }
  .VueCarousel-dot {
    .VueCarousel-dot-button {
      max-width: 6px;
      max-height: 6px;
      outline: none;

      &:focus,
      &:active {
        outline: none;
      }
    }
  }
  &:hover {
    .VueCarousel-navigation {
      opacity: .9;
    }
    .VueCarousel-navigation-button {
      transition: opacity 3s;
      &:after {
        background-color: transparent;
      }
    }
  }
}
</style>
