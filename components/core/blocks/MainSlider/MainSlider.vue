<template>
  <section class="main-slider w-full text-white">
    <no-ssr>
      <carousel :per-page="1" pagination-active-color="#ffffff" pagination-color="#e0e0e0">
        <slide v-for="(slide, index) in slides" :key="index">
          <div class="slide w-full" v-lazy:background-image="slide.image">
            <div class="slide-content flex items-center justify-center">
              <div class="w-full px-10p">
                <h1 class="text-hero mt-0 mb-8 text-center" data-testid="mainSliderTitle">
                  {{ slide.title }}
                </h1>
                <div class="mx-auto w-48">
                  <button-full :link="{path: slide.link}" class="btn-primary">
                    {{ slide.button_text }}
                  </button-full>
                </div>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </no-ssr>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import sliderData from 'theme/resource/slider.json'

import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  data () {
    return {
      currentSlide: 1,
      slides: [],
      totalSlides: 1
    }
  },
  components: {
    ButtonFull,
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  methods: {
    updateSliderData (data) {
      this.slides = data.slides
      this.totalSlides = data.total
    }
  },
  mounted () {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % (this.totalSlides)
    }, 5000)
  },
  created () {
    this.updateSliderData(sliderData)
  }
}
</script>
<style lang="scss">
.main-slider {
  .VueCarousel-pagination {
    position: absolute;
    bottom: 15px;
  }
  .VueCarousel-dot--active .VueCarousel-dot-inner {
    border: 2px solid #fff;
    margin-top: -2px;
  }
}
</style>
<style scoped>
.main-slider {
  height: 640px;
}
.slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.slide-content {
  height: 640px;
}
@media (max-width: 75em) {
  .main-slider {
    height: 400px;
  }
  .slide-content {
    height: 400px;
  }
}
@media (max-width: 64em) {
  .main-slider {
    height: 359px;
  }
  .slide {
    background-position: left;
  }
  .slide-content {
    height: 359px;
  }
}
</style>
