<template>
  <div class="product-video absolute w-full h-full flex">
    <div
      v-show="!videoStarted"
      class="gallery-video absolute w-full h-full"
      @click="initVideo"
    >
      <i class="material-icons absolute">play_circle_outline</i>
    </div>
    <div v-if="videoStarted" class="iframe-wrapper absolute w-full">
      <LoaderScoped v-if="!iframeLoaded"/>
      <div class="iframe-container w-full">
        <iframe
          :src="embedUrl"
          class="absolute w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          webkitallowfullscreen mozallowfullscreen allowfullscreen
          @load="iframeIsLoaded()"/>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderScoped from 'theme/components/core/LoaderScoped.vue'
import { ProductVideo } from '@vue-storefront/core/modules/catalog/components/ProductVideo.ts'

export default {
  components: {
    LoaderScoped
  },
  mixins: [ProductVideo]
}
</script>

<style lang="scss" scoped>
.product-video {
  align-items: center;
  justify-content: center;

  .gallery-video {
    top: 0;

    > .material-icons {
      left: 0;
      right: 0;
      color: #fff;
      font-size: 120px;
      top: calc( 50% - 60px);
      transition: transform ease 0.3s;
    }

    &:hover {
      cursor: pointer;

      > .material-icons {
        transform: scale(1.1);
      }
    }
  }

  .iframe-wrapper {
    left: 0;

    .iframe-container {
      padding-top: 56.25%;

      iframe {
        top: 0;
        left: 0;
        border: none;
      }
    }
  }
}
</style>
