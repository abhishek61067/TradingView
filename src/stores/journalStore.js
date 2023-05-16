import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";


export const useJournalStore = defineStore('journal', {
  state: () => ({
    journals: [],
    loading: true,
    // error: null
  }),
  actions: {
    async getJournals() {
      try {
        let journals = await requester('trade/journal/')
        // console.log(journals)
        this.journals = journals.results
      } catch (error) {
        console.log(error)
        // this.error = error

        notify({
          title: "ERROR: Failed to get journal.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
  },
})
