<template>
  <Line :data="{
    labels: config.labels,
    datasets: [
      {
        label: 'Balance History',
        backgroundColor: 'rgb(174 224 185 / 53%)',
        data: config.data,
        borderColor: '#41cc57',
        fill: 'start'
      }
    ]
  }" :options="options" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'LineChart',
  props: ['config'],
  components: {
    Line
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false,
          title: {
            display: true,
            text: 'Balance Chart'
          }
        },
        scales: {
          x: {
            grid: {
              color: '#FFFFFF'
            }
          },
          y: {
            grid: {
              color: () => 'rgb(174 224 185 / 53%)'
            }
          }
        },
        elements: {
          line: {
            tension: 0.4
          }
        }
      }
    }
  }
}
</script>
