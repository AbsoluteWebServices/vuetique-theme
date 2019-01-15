<template>
  <div class="breadcrumbs text-xs text-grey-dark leading-normal truncate px-4 py-2 container">
    <span v-for="link in routes" :key="link.route_link">
      <router-link :to="localizedRoute(link.route_link)" class="text-grey">
        {{ link.name | htmlDecode }}
      </router-link> <span class="px-2">&rsaquo;</span>
    </span>
    <span class="cl-mine-shaft">
      {{ activeRoute | htmlDecode }}
    </span>
  </div>
</template>

<script>
import Breadcrumbs from '@vue-storefront/core/compatibility/components/Breadcrumbs'

export default {
  mixins: [Breadcrumbs]
}
</script>
