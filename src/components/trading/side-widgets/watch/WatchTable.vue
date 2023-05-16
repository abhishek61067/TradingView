
<script>
import { defineComponent } from 'vue'
import { mdiPlusCircleOutline, mdiSync } from '@mdi/js'
import { Modal } from 'bootstrap'

// import { SOCKET_EVENTS, USER_ID } from '@/stores/enums'
import { useTickerStore } from '../../../../stores/tickerStore'
import { useWatchListStore } from '../../../../stores/watchListStore'

export default defineComponent({
  name: 'MarketWatch',
  data: function () {
    return {
      isLoading: true,
      // watchList: {},
      selectedForRemove: {}
    }
  },
  setup: function () {
    const watchStore = useWatchListStore()
    const store = useTickerStore()
    return { 
      watchStore,
      store,
      mdiPlusCircleOutline, mdiSync 
    }
  },
  methods: {
    getChangeClass: function (price) {
      return {
        'text-success': price > 0,
        'text-danger': price < 0
      }
    },
    showRemoveModal(id, symbol){
      this.selectedForRemove = {id, symbol: symbol}
      this.removeWatchModal.show()
    },
    hideRemoveWatchModal(){
      this.selectedForRemove = {}
      this.removeWatchModal.hide()
    },
    removeWatch(){
      
      this.watchStore.removeWatch(this.selectedForRemove.id, this.selectedForRemove.symbol).then(() => {
        this.selectedForRemove = {}
        this.removeWatchModal.hide()
        // this.isLoading = true
      })
    }
  },
  mounted: function () {
    this.removeWatchModal = new Modal(this.$refs.removeWatchModal)
    this.watchStore.getWatchList()
  }
})
</script>

<template>
  <div>
  <div class="card mb-0 market-watch-card mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">Watchlist</h5>
      <div class="header-elements">
        
        <div class="list-icons">
          <span id="v-step-addwatch-2" @click="() => store.showAddWatchModal = true" 
            class="list-icons-item text-white cursor-pointer">
            <svg-icon type="mdi" :path="mdiPlusCircleOutline" :size="16"></svg-icon>
          </span>
        </div>
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="card-body p-0" id="v-step-mwatch-1">
      <div v-if="watchStore.loading"  class="spinner ml-2 mt-2">
          <svg-icon type="mdi" :path="mdiSync"></svg-icon>
      </div>
      <div v-else class="table-responsive">
        <table class="table table-xs">
          <thead>
            <tr>
              <th class="text-nowrap p-1">Symbol</th>
              <th class="text-nowrap p-1">High</th>
              <th class="text-nowrap p-1">Low</th>
              <th class="text-nowrap p-1">LTP</th>
              <th class="text-nowrap p-1">%Chg</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(watch, index) in watchStore.watchList" :key="index">
            <!-- <tr class="bg-light-gray text-black font-weight-bold">
              <td colspan="3" class="p-1 text-upper">{{watchObj.sector}}</td>
            </tr> -->
            <tr class="watch-row text-nowrap p-1"> 
              <td class="text-nowrap p-1">
                <span @click="$emit('changeChart', watch.symbol)"
                  class="font-weight-bold text-brand cursor-pointer">
                  {{ watch.symbol }}
                </span>
              </td>
              <td class="text-nowrap p-1">
                {{ watch.high }}
              </td>
              <td class="text-nowrap p-1">
                {{ watch.low }}
              </td>
              <td class="text-nowrap p-1">
                {{ watch.close }}
              </td>
              <td class="change-td text-nowrap p-1" :class="getChangeClass(watch.percent_change)">
                <span class="mr-1">
                  {{ parseFloat(watch.percent_change || 0).toFixed(2) }}
                </span>
                <span class="text-danger cross-span">
                  <i class="icon-cross3 hide" @click="showRemoveModal(watch.id, watch.symbol)"></i>
                </span>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal fade" id="remove-watch-confirm-modal" ref="removeWatchModal">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">
        
            <div class="modal-body pb-2">
              <h4>
                Remove <strong>{{ selectedForRemove?.symbol }}</strong> from watch?
              </h4>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-danger" @click="removeWatch">Remove</button>
				</div>
      </div>
    </div>
  </div>
</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.market-watch-card {
  height: 40vh;
}
.market-watch-card > .card-body{
  overflow-y: scroll;
}

.watch-row .cross-span {
  min-width: 20px;
  display: inline-block;
}
.watch-row .hide {
  display: none;
}

.watch-row:hover .hide {
  display: inline-block;
  cursor: pointer;
}
</style>
