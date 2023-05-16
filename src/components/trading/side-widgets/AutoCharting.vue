<script>
import { useTickerStore } from '@/stores/tickerStore'
import { mdiSync } from '@mdi/js';
import requester from '@/lib/requester'

export default {
  name: "AutoCharting",
  components: {},
  data() {
    return {
      isLoading: false,
      supply_demand: {
        isEnabled: false,
        id: null,
      }
    }
  },
  setup(){
    const store = useTickerStore()
    return {
      mdiSync,
      store
    }
  },
  methods: {
    toggleDemoChart() {
      this.isLoading = true
      let self = this;
      if (this.supply_demand.isEnabled) {
        requester(process.env.VUE_APP_FORUM_API_URL + '/forum/chart/data/supply_demand_zone')
          .then(response => response.json())
          .then(data => {
            let ids = []
            data.supply_demand.forEach((function (supply) {

              let shapeData = [{
                time: +new Date(data.last_price.date) / 1000,
                price: Number(supply.high_price),
                date: data.last_price.date
              }, {
                time: +new Date(supply.date) / 1000,
                price: Number(supply.high_price),
                date: supply.date
              }, {
                time: +new Date(supply.date) / 1000,
                price: Number(supply.low_price),
                date: supply.date
              }]

              let shapeId = tvWidget.activeChart().createMultipointShape(shapeData, {
                shape: "parallel_channel",
                lock: true,
                overrides: {
                  backgroundColor: "high" == supply.type ? "rgb(244 67 54 / 20%)" : "rgb(76 175 80 / 20%)",
                  showMidline: false,
                  linewidth: 1,
                  linecolor: "rgb(244 67 54 / 0%)"
                }
              });
              // console.log('Shape ID >>> ', shapeId)
              ids.push(shapeId)
            }))
            self.isLoading = false
            self.supply_demand.id = ids
          }).catch(err => {
            console.log(err)
            self.isLoading = false
            this.$notify({
              type: "warning",
              title: err ? err.message : 'Something went wrong'
            })
          })
      } else {
        if (this.supply_demand.id && this.supply_demand.id.length > 0){
          this.supply_demand.id.forEach(id => {
            tvWidget.activeChart().removeEntity(id);
          })
        }

        this.isLoading = false
      }
    }
  },
}
</script>

<template>
  <div class="card">
    <div class="card-header header-elements-inline pt-1 pb-1">
      <h5 class="card-title">
        Auto Charting
      </h5>
      <div class="header-elements">
        <div v-if="isLoading" class="text-dark">
          <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
        </div>
        <span class="badge badge-icon cursor-pointer text-dark" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="card-body p-2 pr-3">

      <div class="form-check form-switch">
        <input class="form-check-input" :disabled="isLoading" type="checkbox" v-model="supply_demand.isEnabled" role="switch"
          id="demoChartSwitch" @change="toggleDemoChart">
        <label class="form-check-label" for="demoChartSwitch">
          Supply Demand Zone 
        </label>
      </div>


    </div>
  </div>
</template>