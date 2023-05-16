<script>
import VriddhiSidebar from '@/components/vriddhi/VriddhiSidebar.vue'

export default {
  name: 'VriddhiLayout',
  components: {
    VriddhiSidebar
  }
}
</script>

<template>
  <VriddhiSidebar />
  <div class="content-wrapper">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
