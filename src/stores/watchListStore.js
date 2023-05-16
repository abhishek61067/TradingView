import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";


export const useWatchListStore = defineStore('watchList', {
  state: () => ({
    watchList: [],
    loading: true,
    // error: null
  }),
  actions: {
    async getWatchList() {
      try {
        let watchList = await requester('watch-list/')
        // console.log(watchList)
        this.watchList = watchList.data
      } catch (error) {
        console.log(error)
        // this.error = error

        notify({
          title: "ERROR: Failed to get watchlist.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async addWatch(id, symbol) {
      let result = await requester('watch-list/', {
        method: 'POST',
        body: JSON.stringify({
          company: id
        })
      })
      console.log(result)
      this.loading = false
      notify({
        title: `${symbol} added to watch list.`,
        type: "success"
      });

      this.getWatchList()

    },
    async removeWatch(id, symbol) {
      let result = await requester(`watch-list/${id}/delete/`, {
        method: 'POST',
      })
      // console.log(result)
      this.loading = false
      notify({
        title: `${symbol} removed from watch list.`,
        type: "success"
      });

      this.getWatchList()

    }
  },
})
