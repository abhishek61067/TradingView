import { defineStore } from 'pinia'
import requester from '../lib/requester'

export const useMarketStore = defineStore('market', {
  state: () => ({
    "top_gainers": [],
		"top_losers": [],
		"top_volume": [],
		"top_turnover": [],
    loading: true,
    error: null
  }),
  actions: {
    async getHotLists(){
      try {
        let result = await requester('market/hotlists/')
        console.log(result)
        
        this.top_gainers = result.data.top_gainers
        this.top_losers = result.data.top_losers
        this.top_volume = result.data.top_volume
        this.top_turnover = result.data.top_turnover

      } catch (error) {
        console.log(error)
        this.error = error
      }
      this.loading = false
    }
  },
})
