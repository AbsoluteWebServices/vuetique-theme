<template>
  <section class="container">
    <div class="row gutter-sm md:gutter-md">
      <div
        v-for="(banner, index) in collectionBanners"
        :key="index"
        class="mb-5"
        :class="columnClass"
      >
        <router-link
          :to="localizedRoute(banner.link)"
          class="offer p-1 flex justify-center items-center text-white relative"
          :class="columns > 1 ? 'offer-small' : 'offer-single'"
          v-lazy:background-image="banner.image"
        >
          <h2 class="md:text-h1 text-center leading-tight">{{ banner.title }}</h2>
          <div class="w-24 absolute pin-b mx-auto mb-5 md:mb-10">
            <button-full class="btn-primary w-full">{{ $t('Shop') }}</button-full>
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
    collection: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: false,
      default: 1
    },
    offset: {
      type: Number,
      required: false,
      default: 0
    },
    columns: {
      type: Number,
      required: false,
      default: 1
    }
  },
  components: {
    ButtonFull
  },
  computed: {
    ...mapGetters({
      banners: 'promoted/getPromotedOffers'
    }),
    collectionBanners () {
      return this.banners[this.collection].slice(this.offset, this.offset + this.limit)
    },
    columnClass () {
      if (this.columns < 2 || this.columns > 4) {
        return 'col-12'
      } else {
        return 'col-6 md:col-' + (12 / this.columns) % 10
      }
    }
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
  .offer-single {
    height: 330px;
    background-position: 50% 20%;

    @media (max-width: 767px) {
      height: 330px;
    }
  }
</style>
