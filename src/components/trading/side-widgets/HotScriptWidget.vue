<script>

import { mdiSync } from '@mdi/js';
import { useTickerStore } from '../../../stores/tickerStore';
import { useMarketStore } from '../../../stores/marketStore';

export default {
  name: 'HotListWidget',
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
        Top Turnover
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
            <th class="p-1">Turnover</th>
            <th class="p-1">LTP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turn in marketStore.top_turnover" :key="turn.symbol">
            <td class="text-nowrap p-1">
              <span class="font-weight-bold text-brand cursor-pointer">
                {{ turn.company__symbol }}
              </span>
            </td>
            <td class="text-nowrap p-1">
              {{ helper.amountToWord(turn.turnover) }}
            </td>
            <td class="text-nowrap p-1">
              {{ turn.close }}
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
  <div class="card hotlist-card mb-0 mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Top Volume
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
            <th class="p-1">Shares Traded</th>
            <th class="p-1">LTP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vol in marketStore.top_volume" :key="vol.symbol">
            <td class="text-nowrap p-1">
              <span class="font-weight-bold text-brand cursor-pointer">
                {{vol.company__symbol}}
              </span>
            </td>
            <td class="text-nowrap p-1">
              {{helper.amountToWord(vol.volume)}}
            </td>
            <td class="text-nowrap p-1">
              {{vol.close}}
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