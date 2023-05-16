import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";
import { usePositionStore } from './positionStore'
import { useAccountStore } from './accountStore'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    order_count: 0,
    loading: true,
    saving: false
  }),
  actions: {
    async getOrders() {
      try {
        let result = await requester('trade/order/')
        // console.log(result, 'ORDERS ...')

        this.orders = result.results
        this.order_count = result.count

      } catch (error) {
        // console.log(error)
        notify({
          title: "ERROR: Failed to get orders.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async createOrUpdateOrder(data) {
      let positionStore = usePositionStore()
      let accountStore = useAccountStore()

      this.saving = true
      try {
        let result = await requester('trade/order/', {
          // method: data.id ? 'PUT': 'POST',
          method: 'POST',
          body: JSON.stringify(data)
        })
        // console.log(result)

        notify({
          title: data.id ? `Order updated.` : `New order placed.`,
          type: "success"
        });

        this.getOrders()
        positionStore.getPositions()
        accountStore.getAccount()
      } catch (error) {
        notify({
          title: `Failed to ${data.id ? 'update' : 'create new'} order`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.saving = false

    },
    async removeOrder(id) {
      this.saving = true
      try {
         await requester('trade/order/', {
          method: 'DELETE',
          body: JSON.stringify({
            id
          })
        })
        // console.log(result)

        notify({
          title: `Order removed.`,
          type: "success"
        });

        this.getOrders()
      } catch (error) {
        notify({
          title: `Failed to remove order`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.saving = false

    },
  },
})
