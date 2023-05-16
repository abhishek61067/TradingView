<script>
import { SOCKET_EVENTS, USER_ID } from '@/stores/enums';
import { useTickerStore } from '../../../stores/tickerStore';
import { useMarketdepthStore } from '../../../stores/marketdepthStore';

export default {
  name: 'MarketDepthWidget',
  setup() {
    const store = useTickerStore();
    const depthStore = useMarketdepthStore()
    return {
      store,
      depthStore
    }
  },
  mounted() {
    if (this.store.company.id && this.store.isMarketLive) {
      this.depthStore.getMarketDepth(this.store.symbol)
    }
  },
}
</script>

<template>
  <div class="card">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Market Depth, {{ store.symbol }}
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="card-body p-1">
      <div class="table-responsive" :class="{
        'blur-5': !this.store.isMarketLive
      }">
        <table class="table table-xs">
          <thead>
            <tr class="bg-success text-dark">
              <th class="p-1 text-white">Buy Orders</th>
              <th class="p-1 text-white">Buy QTY</th>
              <th class="p-1 text-white">Buy Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(buy, index) in depthStore.buyOrders" :key="index">
              <td class="text-nowrap p-1">
                {{ buy.order_count }}
              </td>
              <td class="text-nowrap p-1">
                {{ buy.quantity }}
              </td>
              <td class="text-nowrap p-1">
                {{ buy.price }}
              </td>
            </tr>

          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">Total Buy Quantity</th>
              <th>
                {{ depthStore.totalBuy }}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="table-responsive mt-3" :class="{
        'blur-5': !this.store.isMarketLive
      }">
        <table class="table table-xs">
          <thead>
            <tr class="bg-danger text-dark">
              <th class="p-1 text-white">Sell Orders</th>
              <th class="p-1 text-white">Sell QTY</th>
              <th class="p-1 text-white">Sell Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sell, index) in depthStore.sellOrders" :key="index">
              <td class="text-nowrap p-1">
                {{ sell.order_count }}
              </td>
              <td class="text-nowrap p-1">
                {{ sell.quantity }}
              </td>
              <td class="text-nowrap p-1">
                {{ sell.price }}
              </td>
            </tr>

          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">Total Sell Quantity</th>
              <th>
                {{ depthStore.totalSell }}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="closed-image m-auto" v-show="!this.store.isMarketLive">
          <img class="mt-3" src="@/assets/img/market_closed__mascot--green.png" style="width: 60%;" alt="Market Closed">           
      </div>
    </div>
  </div>
</template>

<style>
  .closed-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>