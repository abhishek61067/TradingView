<template>
  <Doughnut :data="{
        labels: config.labels,
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: config.data
          }
        ]
      }" :options="{
        responsive: true,
        maintainAspectRatio: false
      }" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'DoughnutChart',
  props: ['config'],
  components: {
    Doughnut
  },
}
</script>
