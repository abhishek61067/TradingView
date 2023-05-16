<script>
import WatchTable from '@/components/trading/side-widgets/watch/WatchTable.vue'
import AddWatchModal from './side-widgets/watch/AddWatchModal.vue'
import CompanyInfo from '@/components/trading/side-widgets/watch/CompanyInfo.vue'
import BuySellWidget from '@/components/trading/side-widgets/BuySellWidget.vue'
import AlertWidget from '@/components/trading/side-widgets/AlertWidget.vue'
import MarketDepthWidget from '@/components/trading/side-widgets/MarketDepthWidget.vue'
import DataWindow from '@/components/trading/side-widgets/DataWindow.vue'
import HotScriptWidget from '@/components/trading/side-widgets/HotScriptWidget.vue'
import CalendarWidget from './side-widgets/CalendarWidget.vue'
import { useTickerStore } from '../../stores/tickerStore'
import AddAlertWidget from './side-widgets/AddAlertWidget.vue'
// import AutoCharting from './side-widgets/AutoCharting.vue'
import ChatWidget from './side-widgets/ChatWidget.vue'
import NepseMovers from './side-widgets/NepseMovers.vue'
import CompanyEssentials from './side-widgets/CompanyEssentials.vue'

export default {
  name: 'SideWidget',
  components: {
    WatchTable,
    CompanyInfo,
    BuySellWidget,
    AlertWidget,
    MarketDepthWidget,
    DataWindow,
    HotScriptWidget,
    CalendarWidget,
    AddAlertWidget,
    // AutoCharting,
    ChatWidget,
    NepseMovers,
    CompanyEssentials,
    AddWatchModal
},
  setup() {
    const store = useTickerStore()
    return {
      store
    }
  },
  methods: {
    showThisWidget(tabName){
      let selected = this.store.selectedWidget;
      // console.log(selected , ' --===== --= ', this.store.showFullWidth)
      // when we click on SideWidgetMenu, selected and showFullWidth will be changed and the condition below will be true
      return selected === tabName && !this.store.showFullWidth
    }
  }
}
</script>

<template>

  <div class="">
    <div class="tab-content" id="side-menu-tab-content">

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('watchTable'),
        'active': showThisWidget('watchTable'),
      }" id="market-watch-widget">
        <WatchTable v-if="showThisWidget('watchTable')" @change-chart="(symbol) => this.$emit('callChangeChart', symbol)" />
        <CompanyInfo v-if="showThisWidget('watchTable')"/>
        <AddWatchModal />
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('alerts'),
        'active': showThisWidget('alerts'),
      }" id="alerts-widget">
        <AlertWidget v-if="showThisWidget('alerts')" />
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('marketDepth'),
        'active': showThisWidget('marketDepth'),
      }" id="market-depth-widget">
        <MarketDepthWidget v-if="showThisWidget('marketDepth')" />
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('compEssential'),
        'active': showThisWidget('compEssential'),
      }" id="data-window-widget">
        <CompanyEssentials v-if="showThisWidget('compEssential')" />
      </div>
      <div class="tab-pane fade" :class="{
        'show': showThisWidget('dataWindow'),
        'active': showThisWidget('dataWindow'),
      }" id="data-window-widget">
        <DataWindow v-if="showThisWidget('dataWindow')" />
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('hotlist'),
        'active': showThisWidget('hotlist'),
      }" id="hotlist-widget">
        <HotScriptWidget v-if="showThisWidget('hotlist')" />
      </div>
      <div class="tab-pane fade" :class="{
        'show': showThisWidget('nepseMovers'),
        'active': showThisWidget('nepseMovers'),
      }" id="nepse-movers-widget">
        <NepseMovers v-if="showThisWidget('nepseMovers')" />
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('calendar'),
        'active': showThisWidget('calendar'),
      }" id="calendar-widget">
        <CalendarWidget v-if="showThisWidget('calendar')" />
      </div>

      <!-- <div class="tab-pane fade" :class="{
        'show': showThisWidget('autochart'),
        'active': showThisWidget('autochart'),
      }" id="autochart-widget">
        <AutoCharting v-show="showThisWidget('autochart')" />
      </div> -->

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('forum'),
        'active': showThisWidget('forum'),
      }" id="forum-widget">
        <ChatWidget v-show="showThisWidget('forum')"/>
      </div>

      <div class="tab-pane fade" :class="{
        'show': showThisWidget('orderPanel'),
        'active': showThisWidget('orderPanel'),
      }" id="buy-sell-widget">
        <BuySellWidget v-show="showThisWidget('orderPanel')" />
      </div>

    </div>
    <AddAlertWidget :default-price="this.store.defaultAlertPrice" />
  </div>
</template>
