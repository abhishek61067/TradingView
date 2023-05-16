<script>
import requester from '../../../lib/requester'
import BarChart from './parts/BarChart.vue'
import DoughnutChart from './parts/DoughnutChart.vue'
import LineChart from './parts/LineChart.vue'

export default {
  name: 'ProfitLossTab',
  data(){
    return {
      holding: {
        labels: [],
        data: []
      },
      balance: {
        labels: [],
        data: []
      }
    }
  },
  components: {
    BarChart,
    DoughnutChart,
    LineChart
  },
  mounted: function(){
    
    let self = this
    requester('trade/current-holding/').then(response => {
      let labels = response.data.map(d => d.company)
      let data = response.data.map(d => d.hold)

      // console.log(response, ' CHART holding ', data, labels)
      self.holding = {
        labels,
        data
      }
    })
    requester('trade/balance-history-chart/').then(response => {
      let labels = response.data.map(d => d.created_on__date)
      let data = response.data.map(d => d.balance_after)

      // console.log(response, ' CHART balance ', data, labels)
      self.balance = {
        labels,
        data
      }
    })
  }
}
</script>

<template>
  <div class="row">

    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="chart-container" style="height: 200px;">
            <LineChart :config="balance" />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="chart-container" style="height: 200px;">
            <BarChart />
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="chart-container" style="height: 200px;">
            <DoughnutChart :config="holding"/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>