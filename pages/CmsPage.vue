<template>
  <div id="cms-page">
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" :active-route="cmsPageContent.title" />
    <header class="container mt-2">
      <h1> {{ cmsPageContent.title }}</h1>
    </header>
    <div class="container pt-10 pb-16 leading-loose static-content" v-html="cmsPageContent.content" />
  </div>
</template>

<script>
import CmsPage from '@vue-storefront/core/pages/CmsPage'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'

export default {
  components: {
    Breadcrumbs
  },
  computed: {
    cmsPageContent () {
      return this.$store.state.cmsPage.current
    }
  },
  mixins: [CmsPage]
}
</script>
