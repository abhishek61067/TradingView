<script>
import { mdiAirplane } from '@mdi/js'

export default {
  name: 'PlannerList',
  props: {
    planData: {
      type: Object,
      default: function (rawProps) {
        return {}
      }
    }
  },
  setup: function () {
    return { mdiAirplane }
  }
}
</script>

<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header bg-green-700 text-white">
        <h1 class="card-title d-flex flex-row align-items-center">
          <svg-icon type="mdi" :path="mdiAirplane" :size="40" class="d-inline-block mr-2"></svg-icon>
          <span>
            Vacation Planning
            <small class="d-block font-size-sm">Planned On: {{ planData.created_on || ' - ' }}</small>
          </span>
        </h1>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <span class="text-muted font-size-md">You Have</span>
            <h5 class="font-weight-semibold mb-0">{{ planData.currentSaving || ' - ' }}</h5>
          </div>

          <div class="col-6">
            <span class="text-muted font-size-md">You Need</span>
            <h5 class="font-weight-semibold mb-0">₹ {{ planData.totalPrice || ' - ' }}</h5>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-6">
            <span class="text-muted font-size-md">Save Each Month</span>
            <h5 class="font-weight-semibold mb-0"> - </h5>
          </div>
          <div class="col-6">
            <span class="text-muted font-size-md">Status</span>
            <h5 class="font-weight-semibold mb-0"> - </h5>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link :to="{ name: planData.created_on ? 'Vacation Planning Result' : 'Vacation Planning Form' }"
            class="btn btn-success" exact-active-class="active">
            {{ planData.created_on ? 'View Plan' : 'Plan Goal' }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
