<template>
  <transition name="fade" appear>
    <li class="row mb-3 pb-3 border-b border-grey-light relative">
      <div class="col-auto mr-4">
        <img class="image" v-lazy="thumbnail" alt="" >
      </div>
      <div class="col-grow flex-col justify-start sm:justify-between">
        <div>
          <div class="font-medium leading-6 product-title">
            {{ product.name | htmlDecode }}
          </div>
          <div class="text-sm text-grey leading-normal mb-2" data-testid="productSku">
            {{ product.sku }}
          </div>
          <div class="text-sm leading-normal" v-if="product.totals && product.totals.options">
            <div v-for="opt in product.totals.options" :key="opt.label">
              <span class="text-grey">{{ opt.label }}: </span>
              <span class="text-grey-dark font-medium" v-html="opt.value" />
            </div>
          </div>
          <div class="text-sm leading-normal" v-else-if="product.options">
            <div v-for="opt in product.options" :key="opt.label">
              <span class="text-grey">{{ opt.label }}: </span>
              <span class="text-grey-dark font-medium" v-html="opt.value" />
            </div>
          </div>
          <div class="text-sm text-error font-medium" v-if="product.errors && Object.keys(product.errors).length > 0">
            {{ product.errors | formatProductMessages }}
          </div>
        </div>
        <div class="text-sm qty">
          <span class="text-grey">
            {{ $t('Qty') }}:
          </span>
          <span class="text-grey-dark font-medium" :class="{ hidden: isEditing }" data-testid="productQty">
            {{ product.qty }}
          </span>
          <span :class="{ hidden: !isEditing }">
            <input
              class=""
              type="number"
              autofocus
              v-model.number="qty"
              @change="updateQuantity"
              data-testid="productQtyInput"
            >
          </span>
        </div>
      </div>
      <div class="col-auto font-bold text-right leading-6">
        <div v-if="!product.totals">
          <div class="text-error" v-if="product.special_price">
            {{ product.priceInclTax * product.qty | price }}
          </div>
          <div class="line-through text-sm text-grey-dark" v-if="product.special_price">
            {{ product.originalPriceInclTax * product.qty | price }}
          </div>
          <div class="text-grey-dark" v-if="!product.special_price" data-testid="productPrice">
            {{ product.priceInclTax * product.qty | price }}
          </div>
        </div>
        <div v-if="product.totals">
          <div class="text-error" v-if="product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax - product.totals.discount_amount | price }}
          </div>
          <div class="line-through text-sm text-grey-dark" v-if="product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax | price }}
          </div>
          <div class="text-grey-dark" v-if="!product.totals.discount_amount">
            {{ product.totals.row_total_incl_tax | price }}
          </div>
        </div>
      </div>
      <div class="absolute pin-b pin-r mb-3">
        <div v-if="false" @click="switchEdit">
          <edit-button />
        </div>
        <div @click="removeItem">
          <remove-button />
        </div>
      </div>
    </li>
  </transition>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'

import EditButton from './EditButton'
import RemoveButton from './RemoveButton'

export default {
  components: {
    EditButton,
    RemoveButton
  },
  mixins: [Product]
}
</script>
