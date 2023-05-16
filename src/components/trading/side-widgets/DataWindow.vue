<script>
import { useTickerStore } from '@/stores/tickerStore'

export default {
  name: "DataWindow",
  components: {},
  data() {
    return {
    }
  },
  setup() {
    const store = useTickerStore()
    return {
      store
    }
  },
}
</script>

<template>
  <div class="card">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Data Window
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="card-body p-2 pr-3">
      
      <div class="p-2  text-black mb-1">
        <dl class="row mb-1 font-size-sm border-bottom font-weight-bold text-black">
          <dd class="col-sm-7 mb-0"> Symbol </dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.symbol }}</dt>
          <dd class="col-sm-7 mb-0"> Date </dd>
          <dt class="col-sm-5 text-right mb-1">{{ 
            store.crossData.time ?  $dayjs(store.crossData.time * 1000).format('YYYY-MM-DD') : ''
          }}</dt>
        </dl>
        <dl class="row mb-0 font-size-sm">
          <dd class="col-sm-7 mb-1">Open</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.crossData.open }}</dt>

          <dd class="col-sm-7 mb-1">High</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.crossData.high }}</dt>

          <dd class="col-sm-7 mb-1">Low</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.crossData.low }}</dt>

          <dd class="col-sm-7 mb-1">Close</dd>
          <dt class="col-sm-5 text-right mb-1"> {{ store.crossData.close }} 
          </dt>
        </dl>
        
        <dl class="row mb-0 font-size-sm border-top" v-for="(value, key) in store.crossData.study" :key="key">
          <dd class="col-sm-7 mb-1">{{key}}</dd>
          <dt class="col-sm-5 text-right mb-1">{{ this.helper.addCommas(parseFloat(value)) }}</dt>
        </dl>
      </div>
      <small class="text-muted">
        Hover the chart to see chart data 
      </small>

    </div>
  </div>
</template>