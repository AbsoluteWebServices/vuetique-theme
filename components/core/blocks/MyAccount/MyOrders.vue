<template>
  <div class="mb-8">
    <!-- My orders header -->
    <div class="row mb-4">
      <div class="col-12 sm:col-6">
        <h3 class="mb-1">
          {{ $t('My orders') }}
        </h3>
      </div>
    </div>
    <!-- My orders body -->
    <div class="row">
      <div class="col-12" v-show="!isHistoryEmpty">
        <table>
          <thead>
            <tr>
              <th>{{ $t('Order ID') }}</th>
              <th class="hide-on-xs">{{ $t('Date and time') }}</th>
              <th class="hide-on-xs">{{ $t('Author') }}</th>
              <th class="hide-on-xs">{{ $t('Value') }}</th>
              <th class="hide-on-xs">{{ $t('Type') }}</th>
              <th class="hide-on-xs">{{ $t('Status') }}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t" v-for="order in ordersHistory" :key="order.entity_id">
              <td>{{ order.entity_id }}</td>
              <td class="hide-on-xs">{{ order.created_at | date }}</td>
              <td class="hide-on-xs">{{ order.customer_firstname }} {{ order.customer_lastname }}</td>
              <td class="hide-on-xs">{{ order.grand_total | price }}</td>
              <td class="hide-on-xs">{{ $t('Purchase') }}</td>
              <td class="hide-on-xs">{{ order.status | capitalize }}</td>
              <td>
                <span class="relative dropdown">
                  <i class="material-icons text-grey pointer">more_horiz</i>
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

  th, td {
    text-align: left;
    padding: 20px;

    @media (max-width: 1199px) {
      padding: 10px;
    }

    @media (max-width: 767px) {
      text-align: center;
    }

    &.hide-on-xs {

      @media (max-width: 767px) {
        display: none;
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

.dropdown {
  display: block;
  margin: -20px;
  padding: 20px;

  @media (max-width: 1199px) {
    margin: -10px;
    padding: 10px;
  }

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
