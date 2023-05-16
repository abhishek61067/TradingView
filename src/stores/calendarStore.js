import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";

export const useCalendarStore = defineStore('calendar/', {
  state: () => ({
    items: [],
    loading: true,
  }),
  actions: {
    async getCalendar(companyId) {
      try {
        let response = await requester('calendar/', {
          query: {
            company: companyId
          }
        })

        this.items = response.data || {}


      } catch (error) {
        console.log(error)
        notify({
          title: `Failed to get company calendar items`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    }
  },
})
