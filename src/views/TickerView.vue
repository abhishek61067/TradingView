<template>
  <div class="content-wrapper">
    <div class="content p-0">
      <div class="row">
        <div class="mr-0 pr-0" :class="{
          'col-md-9 col-sm-9': !tickerStore.showFullWidth,
          'col-md-12': tickerStore.showFullWidth
        }" id="chart-pt-container-div">
          <div class="card mb-0">
            <div class="card-body p-0 TVChartContainer" id="tv-resizable-card">
              <div id="chart-container" style="position:relative;">
                <TVChartContainer ref="chartContainerRef" :key="tickerStore.chartDataType.key" />

              </div>
            </div>
          </div>

          <PaperTrading @show-buy-sell-widget="() => {
            this.tickerStore.selectedWidget = 'orderPanel'
            this.tickerStore.showFullWidth = false
          }" @call-change-chart="changeChartSymbol" />

        </div>
        <div class="ml-0 p-0" :class="{
          'col-md-3 col-sm-3': !tickerStore.showFullWidth
        }">
          <SideWidget @call-change-chart="changeChartSymbol" @hide-widget-event="hideSideWidget" />
          <!-- <WatchTable @change-chart="changeChartSymbol" /> -->
        </div>
      </div>

    </div>
  </div>
  <SideWidgetMenu @hide-widget-event="hideSideWidget" ref="sideWidgetMenuRef" />
  <TradingTour />
</template>

<script>
import { defineComponent } from 'vue'
import TVChartContainer from '@/components/TVChartContainer.vue'
import SideWidgetMenu from '@/components/trading/SideWidgetMenu.vue'
import SideWidget from '@/components/trading/SideWidget.vue'
import PaperTrading from '@/components/trading/PaperTrading.vue'
import TradingTour from '../components/trading/TradingTour.vue'
import { useTickerStore } from '@/stores/tickerStore'
import { useAccountStore } from '../stores/accountStore'

// import { SOCKET_EVENTS, USER_ID } from '@/stores/enums'

export default defineComponent({
  name: 'TickerView',
  components: {
    TVChartContainer,
    SideWidgetMenu,
    SideWidget,
    PaperTrading,
    TradingTour
  },
  data() {
    return {
      // handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
    }
  },
  setup() {
    const tickerStore = useTickerStore()
    const accountStore = useAccountStore()
    return {
      tickerStore,
      accountStore
    }
  },
  mounted() {
    // set global positionline object
    window.positionLineObj = {}

    this.accountStore.getAccount()
    this.accountStore.getAccountSubscription()
    if (this.accountStore.subscription.type !== 'Free'){
      this.tickerStore.getOrderHistory()
    }

    this.tickerStore.getLiveMarketStatus()

    // this.$socket.emit(SOCKET_EVENTS.CHECK_MARKETLIVE)
    // this.$socket.emit(SOCKET_EVENTS.GET_ACCOUNT, USER_ID)
    this.tickerStore.getCompanyInfo()
    const self = this

    const sideTabEl = document.querySelectorAll('#side-menu-tab-menu [data-bs-toggle="tab"]')
    sideTabEl.forEach(tab => {
      tab.addEventListener('show.bs.tab', function (event) {
        // console.log('show.bs.tab .....')
        self.tickerStore.showFullWidth = false
      })
    })
    // this.$socket.emit(SOCKET_EVENTS.GET_POSITION_LIST, USER_ID)
    // this.$socket.emit(SOCKET_EVENTS.GET_HISTORY_LIST, USER_ID)
    this.scheduleRecurringAPICalls()
    // this.$tours['paperTradingTour'].start()
    
  },
  beforeUnmount() {
    clearInterval(this.liveIntervalId)
  },
  methods: {
    changeChartSymbol: function (symbol) {
      // console.log(symbol, ' SYMBOL CHANGED ....')
      this.tickerStore.symbol = symbol
      this.$refs.chartContainerRef.changeChartSymbol(symbol)
      this.tickerStore.getCompanyInfo()
    },
    hideSideWidget() {
      this.tickerStore.showFullWidth = true
    },
    scheduleRecurringAPICalls() {
      // emit for first time
      

      // and set interval 
      this.liveIntervalId = setInterval(() => {
        // console.log('Getting Live Price + ACCOUNT ... ', new Date())
        
        this.tickerStore.getLivePrice()
        this.tickerStore.getLiveMarketStatus()
        this.accountStore.getAccount()

      }, 15 * 1000)
    }
  },
  computed() {

  }
})
</script>

<!-- <style>
#tvchart-container-div {
  width: 100%;
  height: 100%;
}
</style> -->