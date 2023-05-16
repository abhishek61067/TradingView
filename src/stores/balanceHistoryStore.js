import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";


export const useBalanceHistoryStore = defineStore('balanceHistory', {
  state: () => ({
    balanceHistory: [],
    loading: true,
    // error: null
  }),
  actions: {
    async getBalanceHistory() {
      try {
        let balanceHistory = await requester('trade/balance-history/')
        console.log(balanceHistory, 'Balance Histy ....>>')
        this.balanceHistory = balanceHistory.data || []
      } catch (error) {
        console.log(error)
        // this.error = error

        notify({
          title: "ERROR: Failed to get balance history.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
  },
})
