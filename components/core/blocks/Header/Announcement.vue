<template>
  <div class="flex w-full justify-center items-center p-4 bg-grey-lighter">
    <span class="uppercase text-xs tracking-md text-grey-dark font-medium">{{ announcement }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    announcement () {
      return 'Free standard shipping on all United States orders over $100'
    }
  }
}
</script>
