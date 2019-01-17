<template>
  <div v-if="!isCheckoutPage" class="hidden lg:flex w-full justify-center items-center py-2 bg-grey-lighter">
    <span class="uppercase text-xs tracking-md text-grey-dark font-medium">{{ announcement }}</span>
  </div>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage'

export default {
  mixins: [CurrentPage],
  computed: {
    announcement () {
      return 'Free standard shipping on all United States orders over $100'
    }
  }
}
</script>
