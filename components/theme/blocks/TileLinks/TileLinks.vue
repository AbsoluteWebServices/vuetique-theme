<template>
  <div class="row gutter-md justify-center">
    <div
      class="col-4 pb-5"
      v-for="(tile, index) in social_tiles"
      :key="index"
    >
      <div
        class="flex w-full overflow-hidden justify-center items-center"
      >
        <img
          class="tile-image w-full h-full"
          v-lazy="tile.image"
          :alt="tile.alt"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import socialData from 'theme/resource/ig_feed.json'

export default {
  name: 'TileLinks',
  computed: {
    ...mapGetters({
      social_tiles: 'social/getSocialTiles'
    })
  },
  created () {
    this.updateSocialTiles(socialData)
  },
  methods: {
    ...mapActions({
      updateSocialTiles: 'social/updateSocialTiles'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

.tile-image {
  transition: transform 0.3s $motion-main;

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
}
</style>
