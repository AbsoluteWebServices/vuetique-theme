<template>
  <div class="row gutter-md">
    <div
      class="col-6 sm:col-4 pb-5"
      v-for="(tile, index) in social_tiles"
      :key="index"
    >
      <div
        class="tile"
      >
        <img
          class="tile-image"
          v-lazy="tile.image"
          :alt="tile.alt"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TileLinks',
  data () {
    return {
      social_tiles: [
        {
          image: '/assets/ig/1.jpg',
          alt: 'Woman practicing on the beach'
        },
        {
          image: '/assets/ig/2.jpg',
          alt: 'Man practicing on the beach'
        },
        {
          image: '/assets/ig/3.jpg',
          alt: 'Woman drinks water form the bottle on the beach'
        },
        {
          image: '/assets/ig/4.jpg',
          alt: 'Man rests on the beach'
        },
        {
          image: '/assets/ig/5.jpg',
          alt: 'Woman practicing on the beach'
        },
        {
          image: '/assets/ig/6.jpg',
          alt: 'Man is holding a watter bottle'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~theme/css/animations/transitions';
.tile {
  display: flex;
  overflow: hidden;
}
.tile-image {
  width: 100%;
  height: 100%;
}
</style>
