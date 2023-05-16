
<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#41cc57',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
}

const chartConfig = {
  data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
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
  }
}


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  data() {
    return chartConfig
  }
}
</script>

<template>
  <Bar :data="data" :options="options" />
</template>


