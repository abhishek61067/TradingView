import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { usePositionStore } from './positionStore'
import { useOrderStore } from './orderStore'
import { notify } from "@kyvg/vue3-notification";

export const useAccountStore = defineStore('account', {
  state: () => ({
    account: {
      account_balance: 0,
      total_equity: 0,
      p_n_l: 0
    },
    subscription: {
      type: "Free",
      expiry_date: null,
      active: true,
    },
    user: {},
    loading: true,
    error: null
  }),
  actions: {
    async getAccount(){
      //let positionStore = usePositionStore()
      let orderStore = useOrderStore()

      try {
        let account = await requester('trade/account-balance/')
        // console.log(account)
        this.account = account.data
        //positionStore.position_count = account.data.order_position
        orderStore.order_count = account.data.orders
      } catch (error) {
        console.log(error)
        notify({
          title: `Failed to get account balance`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    async getAccountSubscription(){
      

      try {
        let response = await requester('/api/v1/subscribed-package/', {
          isFullURL: true
        })
        let {data} = response
        if (!data || data.length == 0){
          data = [{
            active: true,
            subscription: {
              title: 'Shark',
            }
          }]
        }
        // console.log(response, ' PACKAGE ACCOUNT ')

        let pkg = data[0]
        this.subscription.type = pkg.subscription.title;
        this.subscription.expiry_date = pkg.subscription_expires_on;
        this.subscription.active = pkg.active;
        
      } catch (error) {
        console.log(error)
        // this.error = error
        notify({
          title: `Failed to get user subscription`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      
    },
    async resetAccount(){
      

      try {
        let account = await requester('trade/reset-balance/', {
          method: 'POST'
        })
        // console.log(account, ' RESET ACCOUNT ')
        window.location.reload()
      } catch (error) {
        console.log(error)
        // this.error = error
        notify({
          title: `Failed to reset account`,
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      
    },
  },
  getters: {
    full_name: function(){
      if (this.account.first_name){
        return `${this.account.first_name} ${this.account.last_name}`
      }
      return this.account.email
    },
    is_free(){
      return this.subscription.type === 'Free'
    },
    is_bull(){
      return this.subscription.type === 'Bull'
    },
    is_shark(){
      return this.subscription.type === 'Shark'
    },
  }
})
