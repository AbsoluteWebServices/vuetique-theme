<template>
  <div class="media-gallery-carousel">
    <carousel
      :per-page="1"
      :mouse-drag="false"
      :navigation-enabled="true"
      pagination-active-color="#222222"
      pagination-color="#828282"
      navigation-next-label="<svg viewBox='0 0 25 25' class='vt-icon cursor-pointer'><use xlink:href='#right'/></svg>"
      navigation-prev-label="<svg viewBox='0 0 25 25' class='vt-icon cursor-pointer'><use xlink:href='#left'/></svg>"
      ref="carousel"
      :speed="carouselTransitionSpeed"
      @pageChange="pageChange"
      :navigate-to="currentPage"
    >
      <slide
        v-for="(images, index) in gallery"
        :key="images.src"
      >
        <div class="product-image-container" :class="{'video-container w-full h-full flex relative': images.video}">
          <img
            v-show="placeholderImagesMap[index]"
            key="placeholderImage"
            class="product-image inline-flex cursor-pointer mw-full"
            src="/assets/placeholder.jpg"
            ref="images"
            :alt="productName | htmlDecode"
          >
          <img
            v-if="!lowerQualityImagesErrorsMap[index] || isOnline"
            v-show="lowerQualityImagesMap[index]"
            key="lowQualityImage"
            class="product-image inline-flex cursor-pointer mw-full"
            :src="images.loading"
            @load="lowerQualityImageLoaded(index, true)"
            @error="lowerQualityImageLoaded(index, false)"
            ref="images"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <img
            v-if="!highQualityImagesErrorsMap[index] || isOnline"
            v-show="highQualityImagesLoadedMap[index]"
            key="highQualityImage"
            :src="images.src"
            @load="highQualityImageLoaded(index, true)"
            @error="highQualityImageLoaded(index, false)"
            class="product-image inline-flex cursor-pointer mw-full"
            ref="images"
            @dblclick="openOverlay"
            :alt="productName | htmlDecode"
            data-testid="productGalleryImage"
            itemprop="image"
          >
          <product-video
            v-if="images.video && (index === currentPage)"
            v-bind="images.video"
            :index="index"
            @video-started="onVideoStarted"
          />
        </div>
      </slide>
    </carousel>
    <i
      class="zoom-in material-icons p-4 cursor-pointer"
      @click="openOverlay"
    >zoom_in</i>
  </div>
</template>

<script>
import config from 'config'
import ProductVideo from './ProductVideo'
import { onlineHelper } from '@vue-storefront/core/helpers'
import reduce from 'lodash-es/reduce'
import map from 'lodash-es/map'

export default {
  name: 'ProductGalleryCarousel',
  components: {
    ProductVideo,
    'Carousel': () => import('vue-carousel').then(Slider => Slider.Carousel),
    'Slide': () => import('vue-carousel').then(Slider => Slider.Slide)
  },
  props: {
    gallery: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    configuration: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 0,
      currentPage: 0,
      hideImageAtIndex: null,
      lowerQualityImagesLoadedMap: {},
      highQualityImagesLoadedMap: {},
      lowerQualityImagesErrorsMap: {},
      highQualityImagesErrorsMap: {}
    }
  },
  computed: {
    placeholderImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index]
      })
      return visibilityMap
    },
    lowerQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.lowerQualityImagesLoadedMap[index] && !this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    highQualityImagesMap () {
      let visibilityMap = {}
      this.gallery.forEach((image, index) => {
        visibilityMap[index] = !!this.highQualityImagesLoadedMap[index] && this.hideImageAtIndex !== index
      })
      return visibilityMap
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-configure', this.selectVariant)
    this.$bus.$on('product-after-load', this.selectVariant)
  },
  mounted () {
    this.selectVariant()
    if (this.$refs.carousel) {
      let navigation = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.carousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
    this.$emit('loaded')
  },
  beforeDestroy () {
    this.$bus.$off('product-after-configure', this.selectVariant)
    this.$bus.$off('product-after-load', this.selectVariant)
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    async selectVariant (configuration) {
      await this.$nextTick()
      if (config.products.gallery.mergeConfigurableChildren) {
        const option = reduce(map(this.configuration, 'attribute_code'), (result, attribute) => {
          result[attribute] = this.configuration[attribute].id
          return result
        }, {})
        if (option) {
          let index = this.gallery.findIndex(
            obj => obj.id && Object.entries(obj.id).toString() === Object.entries(option).toString(), option)
          if (index < 0) index = this.gallery.findIndex(obj => obj.id && obj.id.color === option.color)
          if (index < 0) index = this.gallery.findIndex(obj => String(obj.id && obj.id.color) === String(option.color))
          this.navigate(index)
        }
      }
      this.$emit('close')
    },
    openOverlay () {
      const currentSlide = this.$refs.carousel.currentPage
      this.$emit('toggle', currentSlide)
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.hideImageAtIndex = null
      this.$emit('pageChange', index)
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    },
    lowerQualityImageLoaded (index, success = true) {
      this.$set(this.lowerQualityImagesLoadedMap, index, success)
      this.$set(this.lowerQualityImagesErrorsMap, index, !success)
    },
    highQualityImageLoaded (index, success = true) {
      this.$set(this.highQualityImagesLoadedMap, index, success)
      this.$set(this.highQualityImagesErrorsMap, index, !success)
    }
  }
}
</script>

<style lang="scss" scoped>
.media-gallery-carousel {
  position: relative;
  text-align: center;
  height: 100%;
}
.zoom-in {
  position: absolute;
  bottom: 0;
  right: 0;
}
.product-image-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.product-image {
  width: 100%;
  height: auto;
}
img {
  opacity: 1;
  mix-blend-mode: multiply;
  vertical-align: top;
  &:hover {
    opacity: 0.9;
  }
}
img[lazy=error] {
  width: 100%;
}
img[lazy=loading] {
  width: 100%;
}
img[lazy=loaded] {
  -webkit-animation: none;
  animation: none;
}

.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-gallery-carousel,
.media-zoom-carousel {
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
    button {
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
