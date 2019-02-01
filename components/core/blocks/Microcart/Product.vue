<template>
  <transition name="fade" appear>
    <li class="flex mb-3 pb-3 border-b border-grey-light relative">
      <router-link
        class="mr-4 bg-grey-lightest self-start"
        :to="localizedRoute({
          name: product.type_id + '-product',
          params: {
            parentSku: product.parentSku ? product.parentSku : product.sku,
            slug: product.slug,
            childSku: product.sku
          }
        })"
        data-testid="productLink"
      >
        <img class="image" v-lazy="thumbnail" alt="" >
      </router-link>
      <div class="flex-grow flex-col justify-start sm:justify-between">
        <div>
          <router-link
            class="font-medium leading-6 product-title text-black"
            :to="localizedRoute({
              name: product.type_id + '-product',
              params: {
                parentSku: product.parentSku ? product.parentSku : product.sku,
                slug: product.slug,
                childSku: product.sku
              }
            })"
            data-testid="productLink"
          >
            {{ product.name | htmlDecode }}
          </router-link>
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
          <div v-show="isEditing" class="inline-flex">
            <qty-input
              v-model.number="qty"
              :id="'qty-' + product.sku"
              data-testid="productQtyInput"
              size="sm" />
            <apply-button @click.native="updateQuantity" class="ml-1" />
          </div>
          <edit-button v-show="!isEditing" @click.native="switchEdit" class="align-text-bottom ml-1" />
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
import ApplyButton from './ApplyButton'

import QtyInput from 'theme/components/theme/QtyInput'

export default {
  components: {
    EditButton,
    RemoveButton,
    ApplyButton,
    QtyInput
  },
  mixins: [Product]
}
</script>
