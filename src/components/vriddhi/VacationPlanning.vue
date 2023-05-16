<script>
import { mdiCarSports } from '@mdi/js'

export default {
  name: 'DreamHouse',
  setup: function () {
    return { mdiCarSports }
  },
  methods: {
    submitHandler: function (data) {
      this.loading = true
      // this.$socket.emit('add vacation planning goal', data)
    }
  },
  sockets: {
    'vacation planning goal added': function (result) {
      console.log(result)
      if (result.error) {
        if (result.message.name === 'SequelizeUniqueConstraintError') {
          alert('Dream house goal already exists.')
        }
        return alert('Failed to add goal.')
      }
      this.$router.push({ name: 'Vacation Planning Result' })
    }
  },
  data: function () {
    return {
      loading: false
    }
  }
}
</script>

<template>
  <h1 class="font-weight-semibold">
    Vacation Planning
  </h1>
  <p>Build your vacation corpus today with Recipe’s vacation planner so that you can have a relaxing vacation whenever
    and wherever you desire.</p>
  <div class="mb-0 ml-5 mr-5 mt-4 text-center alert text-violet-800 alpha-violet border-0 p-2">
    <span class="font-weight-semibold h6">
      According to research, taking a vacation can lower your risk of heart disease.
    </span>
  </div>
  <div class="card mt-0">
    <div class="card-body">
      <FormKit type="form" id="dream-house-form" :form-class="submitted ? 'hide' : 'show'" submit-label="Plan Goal"
        @submit="submitHandler" :actions="false">
        <div class="row">
          <div class="col-4">
            <label for="" class="font-weight-bold h5">Money I have kept aside <small>Rs.</small></label>
            <FormKit type="text" validation="required|number" input-class="form-control" name="currentSaving" />
          </div>
          <div class="col-4">
            <label for="" class="font-weight-bold h5">I'm planning a vacation in year</label>
            <FormKit type="number" input-class="form-control" name="year" :min="new Date().getFullYear()"
              validation="required" />
          </div>

          <div class="col-4">
            <label for="" class="font-weight-bold h5">Which will cost me <small>Rs.</small></label>
            <FormKit type="text" validation="required|number" input-class="form-control" name="totalPrice" />
          </div>
        </div>
        <div class="mt-4">
          <button :disabled="loading ? 'disabled' : false" type="submit" class="btn btn-success btn-lg">
            <span class="h5 font-weight-bold">Plan Goal</span>
          </button>
        </div>
      </FormKit>
    </div>
  </div>
</template>
