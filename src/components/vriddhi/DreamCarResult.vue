<script>
// import { mdiCarSports } from '@mdi/js'

export default {
  name: 'DreamCarResult'
  // setup: function () {
  //   return { mdiCarSports }
  // },
  // methods: {
  //   submitHandler: function (data) {
  //     this.loading = true
  //     this.$socket.emit('add dream car goal', data)
  //   }
  // },
  // sockets: {
  //   'dream car goal added': function (result) {
  //     console.log(result)
  //     if (result.error) {
  //       if (result.message.name === 'SequelizeUniqueConstraintError') {
  //         alert('Dream car goal already exists.')
  //       }
  //       return alert('Failed to add goal.')
  //     }
  //     this.$router.push({ name: 'Goal Planner' })
  //   }
  // },
  // data: function () {
  //   return {
  //     loading: false
  //   }
  // }
}
</script>

<template>
  <h1 class="font-weight-semibold">
    Dream Car
  </h1>
  <p>Congratulations on planning for your dream car. Now let's get it.</p>

  <div class="row">
    <div class="col-md-6">
      <div class="card mt-0">
        <div class="card-body">
          <h1>Your Goal Plan</h1>
          <div class="row">
            <div class="col-md-6 mb-3">
              <h6>Your car will cost you</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <h6>You will own this car in</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <h6>Your savings will be worth</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <h6>You need to have</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <h6>By Saving monthly</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <h6>Or Saving Yearly</h6>
              <div class="btn alpha-purple text-purple-800 cursor-default">
                0000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
