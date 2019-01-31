<template>
  <div class="compare">
    <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" active-route="Compare"/>
    <header class="pb-16 row bg-grey-lightest mb-6">
      <div class="container">
        <div class="row items-center mt-2">
          <h1 class="col-12"> {{ title }} </h1>
        </div>
      </div>
    </header>
    <div class="-mt-6 -mb-5">
      <div class="row" v-if="items.length">
        <div class="col-12">
          <div class="compare__products-table">
            <div class="compare__features">
              <div class="compare__top-info">
                {{ $t('Products') }}
              </div>
              <ul class="compare__features-list">
                <li class="compare__features-item">{{ $t('SKU') }}</li>
                <li v-for="(attr, index) in all_comparable_attributes" :key="index" class="compare__features-item">
                  {{ attr.default_frontend_label }}
                </li>
              </ul>
            </div>
            <div class="compare__products-wrapper">
              <ul class="compare__products-columns">
                <li v-for="(product, index) in items" :key="index" class="compare__product" data-testid="comparedProduct">
                  <div class="compare__top-info">
                    <div class="check"/>
                    <product-tile class="col-12 collection-product" :product="product"/>
                    <span class="compare__remove" @click="removeFromCompare(product)">
                      <remove-button/>
                    </span>
                  </div>
                  <ul class="compare__features-list">
                    <li class="compare__features-item">
                      {{ product.sku }}
                    </li>
                    <li
                      v-for="(attr, attIndex) in all_comparable_attributes"
                      :key="attIndex"
                      class="compare__features-item"
                    >
                      <product-attribute
                        :key="attr.attribute_code"
                        :product="product"
                        :attribute="attr"
                        empty-placeholder="N/A"
                      />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row">
          <div class="col-12">
            <h3 class="my-8 md:mb-16">
              {{ $t('You have no items to compare.') }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Compare from '@vue-storefront/core/pages/Compare'
import Breadcrumbs from '../components/core/Breadcrumbs'
import RemoveButton from '../components/core/blocks/Compare/RemoveButton'
import ProductTile from '../components/core/ProductTile'
import ProductAttribute from '../components/core/blocks/Compare/ProductAttribute'
import i18n from '@vue-storefront/i18n'

export default {
  components: {
    Breadcrumbs,
    ProductTile,
    RemoveButton,
    ProductAttribute
  },
  mixins: [Compare],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-white: color(white);
$border: mix(#000, $color-white, 10%);
$color-product-bg: #f5f5f5;

$products-column-width-mobile: 140px;
$products-column-width: 280px;
$features-column-width-mobile: 110px;
$features-column-width: 210px;

*,
*::after,
*::before {
  box-sizing: border-box;
}

.compare {

  &__products-wrapper {
    @apply border-t border-b overflow-x-auto scrolling-touch;
  }

  &__products-columns {
    @apply flex p-0;

    margin: 0 0 0 $features-column-width-mobile;

    @screen lg {
      margin-left: $features-column-width;
    }
  }

  &__products-table {
    @apply relative overflow-hidden;
  }

  &__features {
    @apply border-t border-b absolute pin-t pin-l;

    z-index: 1;
    width: $features-column-width-mobile;
    opacity: .95;

    @screen lg {
      width: $features-column-width;
    }
  }

  &__product {
    @apply list-reset relative text-center float-left;

    width: $products-column-width-mobile;
    transition: opacity .3s, visibility .3s, transform .3s;

    @screen lg {
      width: $products-column-width;
    }
  }

  &__attributes {
    @apply text-xs font-medium leading-tight text-left px-1 py-4;

    @screen lg {
      @apply text-sm px-2 py-6;
    }
  }

  &__top-info {
    @apply border-r bg-grey-lightest text-center relative overflow-hidden cursor-pointer;

    height: 250px;
    width: $products-column-width-mobile;
    transition: height .3s;

    @screen lg {
      height: 385px;
      width: $products-column-width;
    }

    .compare__features & {
      @extend .compare__attributes;
      width: $features-column-width-mobile;
      cursor: auto;

      @screen lg {
        width: $features-column-width;
      }
    }
  }

  &__features-list {
    @apply m-0 p-0;
  }

  &__features-item {
    @extend .compare__attributes;
    @apply text-base border-t border-r overflow-hidden whitespace-no-wrap;

    list-style: none;
    text-overflow: ellipsis;

    .compare__products-columns & {
      @apply font-normal text-center;
    }
  }

  &__remove {
    @apply absolute pin-t pin-r;
  }
}
</style>
