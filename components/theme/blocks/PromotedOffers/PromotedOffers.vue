<template>
  <section v-if="!singleBanner" class="offers container mx-auto my-8 px-4">
    <div class="row gutter-md">
      <div
        class="offer-container col-12 sm:col-6 pb-5 relative"
        v-for="(banner, index) in banners.mainBanners"
        :key="index"
      >
        <router-link :to="localizedRoute(banner.link)">
          <div
            class="offer p-1 flex justify-center items-center text-white bg-white"
            v-lazy:background-image="banner.image"
          >
            <h2 class="title">
              {{ banner.title }}
            </h2>
            <div class="w-24 absolute pin-b mx-auto mb-16">
              <button-full class="bg-primary" :link="banner.link">{{ $t('Shop') }}</button-full>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-12 sm:col-6 flex-col">
        <div
          class="offer-container pb-5"
          v-for="(banner, index) in banners.smallBanners"
          :key="index"
        >
          <router-link :to="localizedRoute(banner.link)">
            <div
              class="offer offer-small border-box p-1 flex justify-center items-center text-white bg-white relative"
              v-lazy:background-image="banner.image"
            >
              <h2 class="title">{{ banner.title }}</h2>
              <div class="w-24 absolute pin-b mx-auto mb-10">
                <button-full class="bg-primary" :link="banner.link">{{ $t('Shop') }}</button-full>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="container mx-auto my-8 px-4">
    <div class="flex">
      <div
        class="w-full"
        v-for="(banner, index) in banners.productBanners"
        :key="index"
      >
        <router-link :to="localizedRoute(banner.link)">
          <div
            class="offer offer-product border-box p-1 flex justify-center items-center text-white bg-white relative"
            v-lazy:background-image="banner.image"
          >
            <h2 class="title">
              {{ banner.title }}
            </h2>
            <div class="w-24 absolute pin-b mx-auto mb-10">
              <button-full class="bg-primary" :link="banner.link">{{ $t('Shop') }}</button-full>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import promotedOffers from 'theme/resource/promoted_offers.json'

import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  name: 'PromotedOffers',
  props: {
    singleBanner: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    ButtonFull
  },
  computed: {
    ...mapGetters({
      banners: 'promoted/getPromotedOffers'
    })
  },
  created () {
    this.updatePromotedOffers(promotedOffers)
  },
  methods: {
    ...mapActions({
      updatePromotedOffers: 'promoted/updatePromotedOffers'
    })
  }
}
</script>

<style lang="scss" scoped>
  .offer-container {
    &:last-child {
      padding-bottom: 0;
    }
  }
  .offer {
    height: 780px;
    flex-direction: column;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.9;
    transition: 0.3s all;

    &:hover {
      opacity: 1;
    }

    @media (max-width: 767px) {
      height: 200px;
    }
  }
  .offer-small {
    height: 380px;

    @media (max-width: 767px) {
      height: 200px;
    }
  }
  .offer-product {
    height: 330px;
    background-position: 50% 20%;

    @media (max-width: 767px) {
      height: 330px;
    }
  }
</style>
