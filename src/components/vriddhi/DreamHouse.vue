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
      // this.$socket.emit('add dream house goal', data)
    }
  },
  sockets: {
    'dream house goal added': function (result) {
      console.log(result)
      if (result.error) {
        if (result.message.name === 'SequelizeUniqueConstraintError') {
          alert('Dream house goal already exists.')
        }
        return alert('Failed to add goal.')
      }
      this.$router.push({ name: 'Dream House Result' })
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
    Dream House
  </h1>
  <p>Realise your dream of owning a beautiful house by planning your finances with Recipe.</p>
  <div class="mb-0 ml-5 mr-5 mt-4 text-center alert text-violet-800 alpha-violet border-0 p-2">
    <span class="font-weight-semibold h6">
      More than 30% people live in a rented house.
    </span>
  </div>
  <div class="card mt-0">
    <div class="card-body">
      <FormKit type="form" id="dream-house-form" :form-class="submitted ? 'hide' : 'show'" submit-label="Plan Goal"
        @submit="submitHandler" :actions="false">
        <div class="row">
          <div class="col-4">
            <label for="" class="font-weight-bold h5">I have savings worth <small>Rs.</small></label>
            <FormKit type="text" validation="required|number" input-class="form-control" name="currentSaving" />
          </div>
          <div class="col-4">
            <label for="" class="font-weight-bold h5">I want to buy a house worth <small>Rs.</small></label>
            <FormKit type="text" validation="required|number" input-class="form-control" name="housePrice" />
          </div>
          <div class="col-4">
            <label for="" class="font-weight-bold h5">By the year</label>
            <FormKit type="number" input-class="form-control" name="year" :min="new Date().getFullYear()"
              validation="required" />
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
