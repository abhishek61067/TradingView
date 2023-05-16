<script>
import { useTickerStore } from '../../../stores/tickerStore';
import { useCalendarStore } from '../../../stores/calendarStore';
import requester from '../../../lib/requester'

export default {
  name: 'CalendarWidget',
  // data() {
  //   return {
  //     calendarStore.items: []
  //   }
  // },
  setup(){
    const store = useTickerStore();
    const calendarStore = useCalendarStore()
    return {
      store,
      calendarStore
    }
  },
  mounted(){
    
    this.calendarStore.getCalendar(this.store.company.id)

  },
}
</script>

<template>
  <div class="mb-0 news-widget-card border-left mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Calendar
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="pr-1">
      <p class="p-2 pt-5" v-if="calendarStore.items.length === 0">
        No calender events found! You will see a list here when they do.
      </p>
      <!-- <div class="list-group py-1" style="border: 0;">
        <div class="list-group-item hstack p-1 border-bottom">
          <div class="flex-fill">
            <div class="font-weight-bold">{{ $dayjs().format('MMMM DD') }}</div>
          </div>
        </div>
      </div> -->

      <div class="list-group py-1" style="border: 0;">
        <div class="list-group-item hstack p-1 border-bottom" v-for="(item, index) in calendarStore.items" :key="item.id">
          <span class="status-indicator-container p-2">
            <!-- <img src="@/assets/img/tesla.svg" class="mr-2 rounded-pill" :style="{
              height: '40px',
              width: '40px'
            }"> -->
            {{parseInt(index) + 1}}
          </span>
          <div class="flex-fill">
            <div class="font-weight-semibold cursor-pointer">{{ item.title }}</div>
            <small class="d-block">{{item.description}}</small>
            <span class="text-muted"> {{$dayjs(item.calendar_date).format('MMM DD, YYYY')}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.news-widget-card {
  overflow: scroll;
  height: 100vh;
}
</style>