import { defineStore } from 'pinia'
import requester from '../lib/requester'
import { notify } from "@kyvg/vue3-notification";
import { useTickerStore } from './tickerStore'

export const usePositionStore = defineStore('position', {
  state: () => ({
    positions: [],
    position_count: 0,
    loading: true,
    saving: false
  }),
  actions: {
    async getPositions() {
      let tickerStore = useTickerStore()
      try {
        let result = await requester('trade/order-position/')
        // console.log(result, 'POSITIONS  ...')
        if (!result.data){
          return;
        }

        this.position_count = result.data.length

        this.positions = result.data.map(pos => {
          if (!pos.ltp){
            let price = tickerStore.livePrice[pos.symbol]
            if (price){
              pos.ltp = price.ltp
            }
          }
          pos.last_price = pos.ltp
          pos.current_market_value = pos.unit * pos.ltp
          pos.profit = pos.current_market_value - (pos.unit * pos.avg_fill_price)
          pos.total_commission = (pos.broker_commission || 0) + (pos.capital_gain_tax || 0) + (pos.sebon_commission || 0)
          pos.total_commission_text = `
            Broker: ${pos.broker_commission} <br/>
            CGT: ${pos.capital_gain_tax} <br/>
            Sebon: ${pos.sebon_commission} <br/>
          `
          return pos;
        })

      } catch (error) {
        console.log(error)
        notify({
          title: "ERROR: Failed to get positions.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      }
      this.loading = false
    },
    // async createOrUpdatePosition(data) {
    //   this.saving = true
    //   try {
    //     let result = await requester('trade/position/', {
    //       // method: data.id ? 'PUT': 'POST',
    //       method: 'POST',
    //       body: JSON.stringify(data)
    //     })
    //     // console.log(result)

    //     notify({
    //       title: data.id ? `Position updated.` : `New position placed.`,
    //       type: "success"
    //     });

    //     this.getPositions()
    //   } catch (error) {
    //     notify({
    //       title: `Failed to ${data.id ? 'update' : 'create new'} position`,
    //       text: error.message ? error.message : JSON.stringify(error),
    //       type: "warning"
    //     });
    //   }
    //   this.saving = false

    // },
  },
})
