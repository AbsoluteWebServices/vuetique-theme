<template>
  <div class="mb-8">
    <!-- My order header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('Order #') }}{{ order.entity_id }}
          <span class="border py-1 px-2 ml-5 text-sm leading-sm text-grey-dark">
            {{ order.status | capitalize }}
          </span>
        </h2>
      </div>
    </div>
    <!-- My order body -->
    <div class="row mb-5">
      <div class="col-12 text-h4">
        <p>{{ order.created_at | date('MMMM D, YYYY') }}</p>
        <p class="mt-8"><a href="#" class="underline" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a></p>
      </div>
    </div>
    <div class="row mb-8">
      <div class="col-12 text-h4">
        <h4>{{ $t('Items ordered') }}</h4>
        <table>
          <thead class="border">
            <tr>
              <th>{{ $t('Product Name') }}</th>
              <th>{{ $t('SKU') }}</th>
              <th>{{ $t('Price') }}</th>
              <th>{{ $t('Qty') }}</th>
              <th>{{ $t('Subtotal') }}</th>
            </tr>
          </thead>
          <tbody class="border">
            <tr class="border-t" v-for="item in skipGrouped(order.items)" :key="item.item_id">
              <td :data-th="$t('Product Name')">{{ item.name }}</td>
              <td :data-th="$t('SKU')">{{ item.sku }}</td>
              <td :data-th="$t('Price')">{{ item.price_incl_tax | price }}</td>
              <td class="text-right" :data-th="$t('Qty')">{{ item.qty_ordered }}</td>
              <td :data-th="$t('Subtotal')">{{ item.row_total_incl_tax | price }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t">
              <td colspan="4" class="text-right">{{ $t('Subtotal') }}</td>
              <td>{{ order.subtotal | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-right">{{ $t('Shipping') }}</td>
              <td>{{ order.shipping_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-right">{{ $t('Tax') }}</td>
              <td>{{ order.tax_amount + order.discount_tax_compensation_amount | price }}</td>
            </tr>
            <tr v-if="order.discount_amount">
              <td colspan="4" class="text-right">{{ $t('Discount') }}</td>
              <td>{{ order.discount_amount | price }}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-right">{{ $t('Grand total') }}</td>
              <td>{{ order.grand_total | price }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row mb-8">
      <div class="col-12 text-h4 mb-2">
        <h4>{{ $t('Order informations') }}</h4>
        <div class="row">
          <div class="sm:col-6 md:col-3 mb-3">
            <h5>{{ $t('Shipping address') }}</h5>
            <address>
              <p>{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
              <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
              <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
              <p>{{ shippingAddress.country }}</p>
            </address>
          </div>
          <div class="sm:col-6 md:col-3 mb-3">
            <h5>{{ $t('Shipping method') }}</h5>
            <p>{{ order.shipping_description }}</p>
          </div>
          <div class="sm:col-6 md:col-3 mb-3">
            <h5>{{ $t('Billing address') }}</h5>
            <address>
              <p>{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
              <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
              <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
              <p>{{ billingAddress.country }}</p>
            </address>
          </div>
          <div class="sm:col-6 md:col-3 mb-3">
            <h5>{{ $t('Payment method') }}</h5>
            <p>{{ paymentMethod }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'

export default {
  mixins: [MyOrder]
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;

  th {
    @apply text-xs text-grey-dark tracking-md uppercase py-3 px-4 leading-4 text-left font-medium;
  }

  td {
    @apply text-sm py-3 px-4 leading-4 text-left font-medium;
  }

  th, td {
    &.text-right {
      @apply text-right;

      @media (max-width: 767px) {
        @apply text-left;
      }
    }
  }

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tbody {

    tr {
      @media (max-width: 767px) {
        display: block
      }
    }

    td {
      @media (max-width: 767px) {
        display: block;
        text-align: left;
        padding: 10px 20px;
        &:before {
          content: attr(data-th) ': ';
          font-weight: 700;
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          padding: 20px 20px 10px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 10px 20px 20px 20px;
        }
      }
    }

  }

  tfoot {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:last-child {
        td:last-child {
         padding-bottom: 20px
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block
      }

      &:first-child {
        @media (max-width: 767px) {
          font-weight: 700;
          padding: 20px 20px 5px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 5px 20px 0 20px;
        }
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

address {
  font-style: normal;
}

</style>
