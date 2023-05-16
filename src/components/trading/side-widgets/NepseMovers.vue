<script>

import { SOCKET_EVENTS, USER_ID } from '@/stores/enums';
import { mdiSync } from '@mdi/js';
import { useTickerStore } from '../../../stores/tickerStore';
import { useMarketStore } from '../../../stores/marketStore';

export default {
  name: 'NepseMoversWidget',
  data() {
    return {
      // isLoading: true,
      // top_gainers: [],
      // top_losers: [],
      // top_turnover: [],
      // top_volume: []
    }
  },
  setup(){
    const store = useTickerStore()
    const marketStore = useMarketStore()
    return {
      mdiSync,
      store,
      marketStore
    }
  },
  mounted() {
    this.marketStore.getHotLists()
  },
  

}
</script>

<template>
  <div class="card hotlist-card mb-0 mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Top Gainers
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div v-if="marketStore.loading"  class=" ml-2 mt-2">
      <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
    </div>
    <div v-else class="table-responsive">
      <table class="table table-xs">
        <thead>
          <tr>
            <th class="p-1">Symbol</th>
            <th class="p-1">LTP</th>
            <th class="p-1">%Change</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gain in marketStore.top_gainers" :key="gain.company__symbol">
            <td class="text-nowrap p-1">
              <span class="font-weight-bold text-brand cursor-pointer">
                {{gain.company__symbol}}
              </span>
            </td>
            <td class="text-nowrap p-1">
              {{gain.close}}
            </td>
            <td class="text-nowrap p-1 text-success">
              {{ parseFloat(gain.percent_change).toFixed(2) }}%
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
  <div class="card hotlist-card mb-0 mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-danger">
      <h5 class="card-title">
        Top Losers
      </h5>
    </div>
    <div v-if="marketStore.loading"  class=" ml-2 mt-2">
      <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
    </div>
    <div v-else class="table-responsive">
      <table class="table table-xs">
        <thead>
          <tr>
            <th class="p-1">Symbol</th>
            <th class="p-1">LTP</th>
            <th class="p-1">%Change</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="los in marketStore.top_losers" :key="los.company__symbol">
            <td class="text-nowrap p-1" >
              <span class="font-weight-bold text-brand cursor-pointer">
                {{los.company__symbol}}
              </span>
            </td>
            <td class="text-nowrap p-1">
              {{los.close}}
            </td>
            <td class="text-nowrap p-1 text-danger">
              {{ parseFloat(los.percent_change).toFixed(2) }}%
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
  
</template>


<style>
.hotlist-card {
  height: 50vh;
}

.hotlist-card>.card-body {
  overflow-y: scroll;
}
</style>