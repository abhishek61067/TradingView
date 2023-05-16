<template>
  <v-tour name="paperTradingTour" :steps="steps" :options="options"></v-tour>
</template>
<script>
import { useTickerStore } from '../../stores/tickerStore';

export default {
  name: 'TradingTour',
  setup() {
    const store = useTickerStore()
    return {
      store
    }
  },
  data() {
    return {
      options: {
        highlight: true
      },
      steps: [
        {
          target: '#v-step-mwatch-1',  // We're using document.querySelector() under the hood
          header: {
            title: 'Market Watch Table',
          },
          content: `<strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, <em>quis nostrud exercitation</em> ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          before: type => new Promise((resolve, reject) => {
            console.log(type, ' before steps watchTable')
            if (this.store.selectedWidget !== 'watchTable'){
              this.store.toggleSideTab('watchTable')
            }

            resolve()
          })
        },
        {
          target: '#v-step-addwatch-2',  // We're using document.querySelector() under the hood
          header: {
            title: 'Add Market Watch',
          },
          content: `<strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, <em>quis nostrud exercitation</em> ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
        },
        {
          target: '#v-step-alerts-3',  // We're using document.querySelector() under the hood
          header: {
            title: 'Alerts List',
          },
          content: `<strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, <em>quis nostrud exercitation</em> ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          before: type => new Promise((resolve, reject) => {
            console.log(type, ' before steps alerts')
            this.store.toggleSideTab('alerts')
            resolve()
          })
        },
        {
          target: '#v-step-addalert-4',  // We're using document.querySelector() under the hood
          header: {
            title: 'Add New Alert',
          },
          content: `<strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, <em>quis nostrud exercitation</em> ullamco laboris nisi ut aliquip ex ea commodo consequat.`,

        },
      ]
    }
  }
}
</script>