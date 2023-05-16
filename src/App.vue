<template>
  <!-- <TopHorizontalMenuVue /> -->
  <div v-if="disconnected" class="alert alert-danger mb-0 font-inter">
    <span class="font-weight-bold">
      Server connection failed. Please wait few moments or
      <a class="h6 font-weight-bold text-info" href="/logout">Click here</a> to login again
    </span>
  </div>
  <div class="page-content font-inter">
    <!-- router-view component will render the compoenent matched by the current route -->
    <router-view />
  </div>
  <notifications position="bottom left" :duration="5000" />
</template>

<script>
// Added comment
export default {
  data: function () {
    return {
      disconnected: false
    }
  },
  // sockets: {
  //   connect: function (soc) {
  //     // console.log('Socket connected ... ', soc)
  //     this.disconnected = !this.$socket.connected
  //   },
  //   error: function (soc) {
  //     // console.error('Socket error ... ', soc)
  //     this.disconnected = !this.$socket.connected
  //   },
  //   disconnect: function (soc) {
  //     // console.error('Socket disconnected ... ', soc)
  //     this.disconnected = !this.$socket.connected
  //   }
  // },
  mounted: function () {

  }
}
</script>

<style>
.formkit-outer {
  margin-bottom: 0;
}

.bg-light {
  background-color: #f5f5f5 !important;
}
body {
  background-color: #ffffff;
}

/* .vue3-easy-data-table__main {
  min-height: auto !important;
} */
.vfm.vfm--inset.vfm--fixed {
  overflow-y: scroll;
}
</style>
