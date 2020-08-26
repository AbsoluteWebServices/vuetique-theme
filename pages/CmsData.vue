<template>
  <div v-if="data" id="cms-page">
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="data.title" />
    <header class="pb-16 row bg-grey-lightest mb-6">
      <div class="container">
        <div class="row items-center mt-2">
          <h1 class="col-12"> {{ data.title }} </h1>
        </div>
      </div>
    </header>
    <div class="container py-10 leading-loose static-content" v-html="data.content" />
  </div>
</template>

<script>
import config from 'config'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'

export default {
  components: {
    Breadcrumbs
  },
  computed: {
    data () {
      if (this.id) {
        return this.$store.getters[`cms/get${this.type}`](this.id)
      } else if (this.identifier) {
        return this.$store.getters[`cms/get${this.type}Identifier`](this.identifier)
      } else {
        return this.$store.getters[`cms/get${this.type}Identifier`](this.$route.params.slug)
      }
    }
  },
  methods: {
    getEndpointPath () {
      let url
      if (this.id) {
        url = (config.cms.endpoint)
          .replace('{{type}}', this.type)
          .replace('{{cmsId}}', this.id)
      } else if (this.identifier) {
        url = (config.cms.endpointIdentifier)
          .replace('{{type}}', this.type)
          .replace('{{cmsIdentifier}}', this.identifier)
          .replace('{{storeId}}', this.storeView)
      } else if (this.$route.params.slug) {
        url = (config.cms.endpointIdentifier)
          .replace('{{type}}', this.type)
          .replace('{{cmsIdentifier}}', this.$route.params.slug)
          .replace('{{storeId}}', this.storeView)
      }
      return url
    }
  }
}
</script>

<style lang="scss">
.static-content {
  a {
    @apply text-primary2 no-underline;
  }
  p {
    @apply mb-3;
  }
}
</style>
