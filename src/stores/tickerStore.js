import { defineStore } from 'pinia'
import { notify } from "@kyvg/vue3-notification";
import requester from '../lib/requester'
import { useWatchListStore } from './watchListStore'
import { usePositionStore } from './positionStore'

export const useTickerStore = defineStore('ticker', {
  state: () => ({
    showAddAlertModal: false,
    showAddWatchModal: false,
    selectedWidget: 'watchTable',
    // account: {},
    // user: {},
    showFullWidth: true,
    isPTMinimized: true,
    isPTFullScreen: false,
    hideSideWidget: true,
    symbol: {
fullName: "CZBIL"
    },

    crossData: {},
    livePrice: {},
    // watchList: {},
    company: {
      id: null,
      company_id: null,
      name: '',
      symbol: '',
      sector: '',
      close: 0,
      last_traded_price: 0,
      percentage_change: 0
    },
    defaultAlertPrice: null,
    alerts: [],
    // orders: [],
    // positions: [],
    history: [],
    // accountHistory: [],
    isMarketLive: false,
    market: {
      last_trade_date: null,
      updated_at: null,
      status: null
    },
    chartDataType: {
      key: 'adjusted',
      displayText: 'Show Unadjusted',
      url: process.env.VUE_APP_CHART_FEED_URL
    }
  }),
  actions: {
    async getCompanyInfo() {
      try {
        let result = await requester('company-info/', {
          query: {
            company: this.symbol
          }
        })
        // console.log(result, 'COMPANY INFO ...')
        if (result && result.data) {
          if (result.data.company_id) {
            result.data.id = result.data.company_id
          }
          this.company = result.data
        } else {
          throw "Invalid response from company"
        }


      } catch (error) {
        console.log(error)
        notify({
          title: `ERROR: Failed to get company information of ${this.symbol}.`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async getOrderHistory() {
      try {
        let result = await requester('trade/order-history/')
        // console.log(result, 'Order History ...')
        if (result && result.results) {
          this.history = result.results.map(r => {
            r.symbol = r.company.symbol
            return r
          })

        } else {
          throw "Invalid response from company"
        }


      } catch (error) {
        console.log(error)
        notify({
          title: `ERROR: Failed to get order history.`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async getLivePrice() {
      if (!this.isMarketLive){
        return // only call live data if market is live
      }
      try {
        let result = await requester('/guru-mantra/api/v1/live-market/', {
          isFullURL: true
        })
        // console.log(result, 'LIVE PRICE  ...')

        let list = result.data ? result.data.company_price_data : []
        this.storeLivePrice(list)

      } catch (error) {
        console.log(error)
        notify({
          title: "ERROR: Failed to get live prices.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    toggleSideTab(tabName, action) {
      // the initial value of selectedWidget is 'watchTable'
      let current = this.selectedWidget;
      // console.log(current, ' ----- ', tabName, ' --- ', action)
      // condition to hide the side widget
      if (!action && (current === tabName && !this.showFullWidth)) {
        action = "hide"
      }
      if (action === "hide") {
        return this.showFullWidth = true
      }
      // condition to show the side widge
      this.selectedWidget = tabName
      this.showFullWidth = false
    },

    showAddAlert(price) {
      this.toggleSideTab('alerts', 'show')
      this.defaultAlertPrice = price;
      // let alertModal = new Modal('#add-alert-modal')
      // alertModal.show()
      this.showAddAlertModal = true
    },
    async getLiveMarketStatus(){
      try {
        let result = await requester('/guru-mantra/api/v1/market-status/', {
          isFullURL: true
        })
        // console.log(result, 'IS MARKET LIVE ...')

        this.market = result.data
        this.isMarketLive = result.data.status === "OPEN"

      } catch (error) {
        console.log(error)
        notify({
          title: "ERROR: Failed to get market status.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
    },
    storeLivePrice(data) {
      // console.log('STORING LIVE DATA ....', data)
      let watchStore = useWatchListStore()
      let positionStore = usePositionStore()
      // console.log(typeof data)
      data.forEach(price => {
        price.close = price.close || price.ltp // set close to ltp if not available
        this.livePrice[price.symbol] = price
      })

      positionStore.positions.forEach(pos => {
        let color = pos.profit > 0 ? '#35B14F' : '#df3c27'
        let price = this.livePrice[pos.symbol]
        if (price) {
          pos.last_price = price.close
          pos.current_market_value = pos.unit * price.close
          pos.profit = pos.current_market_value - (pos.unit * pos.avg_fill_price)
          if (window.positionLineObj[pos.id]) {
            // console.log(window.positionLineObj[pos.id])
            window.positionLineObj[pos.id].setQuantity(pos.profit)
            .setLineColor(color)
            .setQuantityTextColor(color)
          }
        }
      })

      watchStore.watchList.forEach(watch => {
        // watchObj.data.forEach(watch => {
          let price = this.livePrice[watch.symbol]
          if (price) {
            watch.close = price.close
            watch.percentage_change = price.percentage_change
          }
        // })
      })

      let price = this.livePrice[this.symbol]
      if (price) {
        // console.log(price, ' SYMBOL PRICE ...')
        this.company.last_traded_price = price.close
        this.company.percentage_change = price.percentage_change
      }

      // update to current chart
      // for (const key in tvDatafeed._dataPulseProvider._subscribers) {
      //   // console.log(key, ' SUBSCRIBER KEY ...')
      //   if (Object.hasOwnProperty.call(tvDatafeed._dataPulseProvider._subscribers, key)) {
      //     const element = tvDatafeed._dataPulseProvider._subscribers[key];

      //     // console.log(element)

      //     let price = this.livePrice[element.symbolInfo.ticker];

      //     // console.log("GET CHART PRICE ...", price)
      //     if (price) {
      //       let date = new Date(price.date)
      //       // console.log("UPDATING CHART PRICE ...", price)
      //       tvDatafeed._dataPulseProvider._subscribers[key].listener({
      //         time: date.getTime(), //bar time must be in milliseconds
      //         open: price.open,
      //         high: price.high,
      //         low: price.low,
      //         close: price.ltp,
      //         volume: price.volume
      //       })
      //     }

      //   }
      // }
    }
  },
})
