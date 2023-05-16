
<script>
import { defineComponent } from 'vue'
// import { storeToRefs } from 'pinia'
import { useTickerStore } from '@/stores/tickerStore'
import { useWatchListStore } from '@/stores/watchListStore'
// import { SOCKET_EVENTS } from '@/stores/enums'

export default defineComponent({
  name: 'CompanyInfo',
  setup() {
    const tickerStore = useTickerStore()
    return {
      store: tickerStore
    }
  },
  mounted(){
    this.store.getCompanyInfo()

  },
  methods: {
    getPriceRangePercent(){
      let total = this.store.company.high - this.store.company.low
      let diff = this.store.company.last_traded_price - this.store.company.low 
      // console.log(diff, total)
      let per = (diff / total) * 100
      return per
    },
    get52WeekRangePercent(){
      let total = this.store.company.week_52_high_high - this.store.company.week_52_high_low
      let diff = this.store.company.last_traded_price - this.store.company.week_52_high_low 
      // console.log(diff, total)
      let per = (diff / total) * 100
      return per
    },
  }
  // data: function () {
  //   return {
  //     watchList: []
  //   }
  // }
})
</script>

<template>
  <div class="card mb-0 market-watch-card mr-1">
      <div class="card-body p-2">
        <div class="d-flex align-items-center">
          <div class="image-cont">
            <img v-if="store.company.logo" :src="store.company.logo" :alt="store.company.symbol" style="width: 55px;height: auto; margin-bottom: 0.5rem; margin-right: 0.5rem;">
          </div>
          <div>
          <h5 class="card-title m-0 fw-bold">
            {{ store.company.name }}
          </h5>
          <p class="mb-0">
            <small class="text-muted">NEPSE :</small>
            <span class="fw-semibold btn-sm p-1">{{ store.company.symbol }}</span>
          </p>
          <p>
            <small class="text-muted">SECTOR:</small>
            <span class="fw-semibold btn-sm p-1">
              {{ store.company.sector }}
            </span>
          </p>
        </div>
        </div>
       
        
      <h2 class="fw-semibold fs-3">
        {{ store.company.last_traded_price }}
        <small class="fs-6" :class="{
          'text-danger': store.company.percent_change < 0,
          'text-success': store.company.percent_change > 0,
        }">
          {{ store.company.difference }}
          ({{ store.company.percent_change }}%)
        </small>
      </h2>

      <div class="range-display">
        <div class="d-flex justify-content-between text-muted">
          <span>{{ store.company.low }}</span>
          <span class="text-uppercase">Day's Range</span>
          <span>{{ store.company.high }}</span>
        </div>
        <div class="range-div rounded-4 w-100 mt-1">
          <div class="range-bar h-100 position-relative" :class="{
          'bg-danger': store.company.percent_change < 0,
          'bg-success': store.company.percent_change > 0,
          }" :style="{
            width: '5%',
            left: `${getPriceRangePercent()}%`
          }"></div>
        </div>
        <div class="arrow-container">
          <div class="arrow" data-bs-toggle="tooltip" :title="'LTP: ' + store.company.last_traded_price" :style="{
            left: `calc(${getPriceRangePercent()}% - 6px)`
          }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" width="12" height="8" fill="none">
              <path fill="currentColor" d="M10 8H2a1 1 0 0 1-.8-1.6l4-5.33a1 1 0 0 1 1.6 0l4 5.33A1 1 0 0 1 10 8z"></path>
            </svg>

          </div>
        </div>
      </div>

      <div class="range-display mt-3">
        <div class="d-flex justify-content-between text-muted">
          <span>{{ store.company.week_52_high_low }}</span>
          <span class="text-uppercase">52 WK Range</span>
          <span>{{ store.company.week_52_high_high }}</span>
        </div>
        <div class="range-div rounded-4 w-100 mt-1">
          <div class="range-bar h-100 position-relative" :class="{
          'bg-danger': store.company.percent_change < 0,
          'bg-success': store.company.percent_change > 0,
          }" :style="{
            width: '5%',
            left: `${get52WeekRangePercent()}%`
          }"></div>
        </div>
        <div class="arrow-container">
          <div class="arrow" data-bs-toggle="tooltip" :title="'LTP: ' + store.company.last_traded_price" :style="{
            left: `calc(${get52WeekRangePercent()}% - 6px)`
          }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" width="12" height="8" fill="none">
              <path fill="currentColor" d="M10 8H2a1 1 0 0 1-.8-1.6l4-5.33a1 1 0 0 1 1.6 0l4 5.33A1 1 0 0 1 10 8z"></path>
            </svg>

          </div>
        </div>
      </div>

      <p class="text-size-lg font-weight-semibold mt-4 mb-0">Key Stats</p>
      <div class="pt-1 mb-0">
        <dl class="row mb-0 font-size-sm font-weight-500">
          <dd class="col-sm-7 mb-1 text-muted">ALL TIME HIGH</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.company.all_time_high }}</dt>
          <dd class="col-sm-7 mb-1 text-muted">ALL TIME LOW</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.company.all_time_low }}</dt>
          <dd class="col-sm-7 mb-1 text-muted">VOLUME</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.company.volume }}</dt>

          <dd class="col-sm-7 mb-1 text-muted">LISTED SHARES</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.company.listed_shares }}</dt>
          <dd class="col-sm-7 mb-1 text-muted">M. CAPITALIZATION</dd>
          <dt class="col-sm-5 text-right mb-1">{{ store.company.market_capitalization }}</dt>

          <dd class="col-sm-7 mb-1 text-muted">DIVIDENDS YIELD</dd>
          <dt class="col-sm-5 text-right mb-1"> {{ store.company.dividend_payout }} </dt>

          <dd class="col-sm-7 mb-1 text-muted">TURNOVER</dd>
          <dt class="col-sm-5 text-right mb-1"> {{ store.company.turnover }} </dt>

        </dl>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.market-watch-card {
  height: 60vh;
}

.market-watch-card>.card-body {
  overflow-y: scroll;
}
.range-div {
  height: 0.35rem;
  background: #e1e1e1;
}
.arrow-container {
  position: relative;
  height: 100%;
}
.arrow-container .arrow {
  position: absolute;
  height: 100%;
  top: 0;
}
</style>
