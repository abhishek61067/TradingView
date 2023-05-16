import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";

export const useMarketdepthStore = defineStore('market-depth', {
  state: () => ({
    buyOrders: [],
    totalBuy: 0,
    sellOrders: [],
    totalSell: 0,
    loading: true,
  }),
  actions: {
    async getMarketDepth(symbol) {
      try {
        let result = await requester('/guru-mantra/api/v1/market-depth/', {
          isFullURL: true,
          query: {
            symbol: symbol
          }
        })
        // console.log(result, ' MARKET DEPTH ...')
        this.buyOrders = result.data.buy_orders
        this.totalBuy = result.data.buy_orders[0] ? result.data.buy_orders[0].total_quantity : 0
        this.sellOrders = result.data.sell_orders
        this.totalSell = result.data.buy_orders[0] ? result.data.sell_orders[0].total_quantity : 0

      } catch (error) {
        console.log(error)
        // notify({
        //   title: `Failed to get market depth`,
        //   text: error.message ? error.message : JSON.stringify(error),
        //   type: "warning"
        // });
      }
      this.loading = false
    }
  },
})
