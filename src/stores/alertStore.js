import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [],
    logs: [],
    stat: {
      sms: 0,
      email: 0,
      pop_up: 0
    },
    loading: true,
    saving: false,
    error: null
  }),
  actions: {
    async getAlerts() {
      try {
        let results = await requester('stock-alerts/')
        console.log(results, 'alerts ...')
        if (results.data){
          this.alerts = results.data.alerts || []
          this.stat = results.data.stat || {}
          this.logs = results.data.logs || []
        }
      } catch (error) {
        console.log(error)
        notify({
          title: `Failed to get alerts`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async createOrUpdateAlert(data) {
      this.saving = true
      try {
        let alert = await requester('stock-alerts/', {
          method: 'POST',
          body: JSON.stringify(data)
        })
        // console.log(alert, ' NEW ALERT ...')
        if (alert.data){
          this.alerts.push(alert.data)
        }

        // this.getAlerts()
      } catch (error) {
        console.log(error)
        notify({
          title: `Failed to ${data.id ? 'update' : 'create new'} alert`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.saving = false
    },
    async removeAlert(id) {
      this.saving = true
      try {
        let alert = await requester(`stock-alerts/${id}/`, {
          method: 'DELETE',
        })
        console.log(alert, 'ALERT Removed ...')
        notify({
          title: `Alert Removed`,
          type: "success"
        });

        this.getAlerts()
      } catch (error) {
        console.log(error)
        notify({
          title: `Failed to delete alert`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.saving = false
    }
  },
})
