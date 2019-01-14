<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    :to="localizedRoute(link)"
    class="outline-none button-full block border-none bg-grey-dark w-full px-4 py-2 ripple tracking-md text-sm text-white font-medium leading-6 uppercase"
    :class="{ 'no-underline pointer text-center': link, 'disabled': disabled, 'button-disabled': disabled }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonFull',
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .disabled {
    background-color: gray
  }
</style>
