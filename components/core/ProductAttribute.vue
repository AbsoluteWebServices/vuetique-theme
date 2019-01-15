<template>
  <li class="">
    <span class="font-bold">{{ label|htmlDecode }}</span>:
    <span>{{ value|htmlDecode }}</span>
  </li>
</template>

<script>
import { ProductAttribute } from '@vue-storefront/core/modules/catalog/components/ProductAttribute.ts'

export default {
  mixins: [ProductAttribute]
}
</script>
