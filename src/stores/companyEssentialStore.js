import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";

export const useCompanyEssentialStore = defineStore('company-essentials', {
  state: () => ({
    essentials: {},
    loading: true,
  }),
  actions: {
    async getCompanyEssentials(companyId) {
      try {
        let response = await requester('company-essential/', {
          query: {
            company: companyId
          }
        })

        this.essentials = response.data || {}


      } catch (error) {
        console.log(error)
        this.$notify({
          title: `Failed to get company essentials`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    }
  },
})
