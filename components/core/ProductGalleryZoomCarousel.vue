<template>
  <div class="media-zoom-carousel">
    <div class="media-zoom-carousel__container row flex">
      <ul class="media-zoom-carousel__thumbs m-0 p-0">
        <li class="media-zoom-carousel__thumb" v-for="(images, key) in gallery" :key="images.src">
          <span class="block">
            <img :src="images.src" ref="images" @click="navigate(key)" :alt="productName | htmlDecode">
          </span>
        </li>
      </ul>
      <div class="media-zoom-carousel__gallery">
        <carousel
          :per-page="1"
          :mouse-drag="false"
          :navigation-enabled="true"
          pagination-active-color="#222222"
          pagination-color="#828282"
          navigation-next-label="<svg viewBox='0 0 25 25' class='vt-icon--lg p-3 pointer'><use xlink:href='#right'/></svg>"
          navigation-prev-label="<svg viewBox='0 0 25 25' class='vt-icon--lg p-3 pointer'><use xlink:href='#left'/></svg>"
          ref="zoomCarousel"
          class="media-zoom-carousel__carousel"
          :speed="carouselTransitionSpeed"
          @pageChange="pageChange"
          :navigate-to="currentPage"
        >
          <slide
            v-for="(images, index) in gallery"
            :key="images.src"
          >
            <div class="media-zoom-carousel__slide" :class="{'video-container h-full flex relative': images.video}">
              <img
                v-show="hideImageAtIndex !== index"
                class="product-image inline-flex pointer mw-full"
                v-lazy="images"
                ref="images"
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
      </div>
    </div>
  </div>
</template>

<script>
import ProductVideo from './ProductVideo'

export default {
  name: 'ProductGalleryZoomCarousel',
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
      required: true
    }
  },
  data () {
    return {
      carouselTransitionSpeed: 300,
      currentPage: 0,
      hideImageAtIndex: null
    }
  },
  components: {
    ProductVideo,
    'Carousel': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel/src/Carousel'),
    'Slide': () => import(/* webpackChunkName: "vue-carousel" */ 'vue-carousel/src/Slide')
  },
  mounted () {
    this.navigate(this.currentSlide)
    if (this.$refs.zoomCarousel) {
      let navigation = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-navigation')
      let pagination = this.$refs.zoomCarousel.$children.find(c => c.$el.className === 'VueCarousel-pagination')
      if (navigation !== undefined) {
        navigation.$on('navigationclick', this.increaseCarouselTransitionSpeed)
      }
      if (pagination !== undefined) {
        pagination.$on('paginationclick', this.increaseCarouselTransitionSpeed)
      }
    }
  },
  methods: {
    navigate (index) {
      this.currentPage = index
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.media-zoom-carousel {
  * {
    box-sizing: border-box;
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    padding: 20px;
    height: 750px;
    max-height: 100%;
    justify-content: space-evenly;

    @media (max-width: 767px) {
      top: 50%;
      transform: translateY(-50%);
      bottom: auto;
      height: auto;
    }
  }

  &__thumbs {
    list-style: none;
    padding-right: 20px;
    max-width: 140px;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__thumb {
    margin-bottom: 20px;
    max-width: 100%;
    cursor: pointer;

    &:last-of-type {
      margin-bottom: 0;
    }

    img {
      display: block;
      max-width: 100%;
      width: auto;
      mix-blend-mode: multiply;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__gallery {
    max-width: 600px;
    height: 100%;
    flex: 1;

    @media (max-width: 767px) {
      height: auto;
    }
  }

  &__carousel {
    height: 100%;
  }

  &__slide {
    height: 100%;
    max-height: 100%;

    img {
      max-height: 100%;
      mix-blend-mode: multiply;
      max-width: 100%;
      height: auto;
      align-self: center;
      margin: 0 auto;
    }
  }

}

.video-container {
  align-items: center;
  justify-content: center;
}
</style>

<style lang="scss">
.media-zoom-carousel {
  .VueCarousel-wrapper,
  .VueCarousel-inner,
  .VueCarousel-slide {
    height: 100%;
  }
}
</style>
