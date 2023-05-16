<script>
import { mdiLightbulbOn, mdiCarSports } from '@mdi/js'

import CarCard from '@/components/vriddhi/planner/CarCard'
import HouseCard from '@/components/vriddhi/planner/HouseCard'
import VacationCard from './planner/VacationCard.vue'

export default {
  name: 'PlannerList',
  components: {
    CarCard,
    HouseCard,
    VacationCard
  },
  setup: function () {
    return { mdiLightbulbOn, mdiCarSports }
  },
  sockets: {
    'send goal plans': function (data) {
      console.log(data)
      this.plans = data.plans
    }
  },
  mounted: function () {
    // this.$socket.emit('get goal plans')
  },
  data: function () {
    return {
      loading: false,
      plans: {}
    }
  }
}
</script>

<template>
  <h1 class="font-weight-semibold">
    Goal Planner
  </h1>
  <p>Turn all your goals into reality with multiple action plans created with the help of intelligent algorithms</p>
  <div class="alert text-violet-800 alpha-violet border-0 d-flex flex-row align-items-center p-2">
    <svg-icon type="mdi" :path="mdiLightbulbOn" :size="40" class="mr-2"></svg-icon>
    <h4 class="font-weight-semibold">What you save monthly is insufficient to serve all goals that you have planned.
      You need to either start
      spending less or prioritize your goals.</h4>
  </div>

  <h2 class="font-weight-semibold mt-4">At this age you should prioritize</h2>

  <div class="row">
    <CarCard :planData="plans['dream-car']" />
    <HouseCard :planData="plans['dream-house']" />
    <VacationCard :planData="plans['vacation-planning']" />
  </div>
</template>
