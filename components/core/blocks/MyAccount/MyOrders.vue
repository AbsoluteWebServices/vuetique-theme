<template>
  <div class="mb-8">
    <!-- My orders header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h2 class="mb-1">
          {{ $t('My orders') }}
        </h2>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="col-12" v-show="!isHistoryEmpty">
        <table class="border">
          <thead>
            <tr>
              <th>{{ $t('Order ID') }}</th>
              <th class="hidden sm:table-cell">{{ $t('Date and time') }}</th>
              <th class="hidden lg:table-cell">{{ $t('Author') }}</th>
              <th class="hidden lg:table-cell">{{ $t('Type') }}</th>
              <th class="hidden md:table-cell">{{ $t('Status') }}</th>
              <th>{{ $t('Value') }}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="order in ordersHistory" :key="order.entity_id">
              <td>{{ order.entity_id }}</td>
              <td class="hidden sm:table-cell">{{ order.created_at | date }}</td>
              <td class="hidden lg:table-cell">{{ order.customer_firstname }} {{ order.customer_lastname }}</td>
              <td class="hidden lg:table-cell">{{ $t('Purchase') }}</td>
              <td class="hidden md:table-cell">{{ order.status | capitalize }}</td>
              <td>{{ order.grand_total | price }}</td>
              <td>
                <span class="relative dropdown">
                  <i class="material-icons text-grey leading-4 cursor-pointer">more_horiz</i>
                  <div class="dropdown-content bg-grey-lighter shadow">
                    <router-link class="text-grey-dark hover:text-black block py-2 px-4" :to="localizedRoute(`/my-account/orders/${order.entity_id}`)">
                      {{ $t('View order') }}
                    </router-link>
                    <a href="#" class="text-grey-dark hover:text-black block py-2 px-4" @click.prevent="remakeOrder(skipGrouped(order.items))">{{ $t('Remake order') }}</a>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 text-h4" v-show="isHistoryEmpty">
        <p>{{ $t('No orders yet') }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import MyOrders from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrders'

export default {
  mixins: [MyOrders]
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

  i {
    vertical-align: middle;
  }

}

.dropdown {
  @apply block -my-3 -mx-4 py-3 px-4;

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
  }

  &:hover .dropdown-content {
    display: block;
  }

}

</style>
