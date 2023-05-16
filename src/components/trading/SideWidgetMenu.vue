<script>
import { Tooltip } from 'bootstrap'
import {
  mdiListBoxOutline, mdiAlarm, mdiNewspaper,
  mdiFire, mdiLightbulbVariantOutline
} from '@mdi/js'
import { useTickerStore } from '@/stores/tickerStore'
import icons from './side-widgets/icons/index'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
// import '@splidejs/vue-splide/css/core';
import '@splidejs/vue-splide/css';

export default {
  name: 'SideWidgetMenu',
  setup: function () {
    const store = useTickerStore()
    return {
      store,
      mdiListBoxOutline, mdiAlarm, mdiNewspaper,
      mdiFire, mdiLightbulbVariantOutline
    }
  },
  components: {
    ...icons,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      windowHeight: window.innerHeight
    }
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight
    },
    // menuClick(event) {
    //   console.log(event.delegateTarget.getAttribute("data-bs-target"))
    //   let classList = Array.from(event.delegateTarget.classList)
    //   if (classList.includes('active')){
    //     event.delegateTarget.classList.remove('active')
    //     let id = event.delegateTarget.getAttribute("data-bs-target")
    //     const tab = document.querySelector(id)
    //     console.log(classList, id, tab)
    //     tab.classList.remove('active', 'show')
    //   }

    // }
  },
  computed: {
    itemCount(){
      return Math.floor(this.windowHeight / 50)
    }
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
      placement: 'left'
    })
    window.addEventListener('resize', this.onResize);
    // this.buySellTab = new Tab(this.$refs.buySellTabRef)
    // this.watchTableTab = new Tab(this.$refs.watchTableTabRef)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  }
}
</script>

<template>
  <div class="card widget-menu mb-0" id="side-menu-tab-menu">
    <div class="card-body p-1">
      <ul class="nav nav-tabs nav-tabs-vertical nav-tabs-vertical-right flex-column  mb-0 mt-md-0 border-bottom-0">
        <Splide :options="{
          direction: 'ttb',
          height   : '100vh',
          perPage: itemCount,
          pagination: false,
          wheel: true,
          autoWidth: true,
          }" aria-label="My Favorite Images">
    <SplideSlide>
        <li class="nav-item">
          <a href="#"  :class="{
            'nav-link p-2':true,
            'active': store.selectedWidget === 'watchTable'
          }" @click="store.toggleSideTab('watchTable')"
            ref="watchTableTabRef">
            <WatchListIcon />
          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'alerts'
          }" @click="store.toggleSideTab('alerts')">
            <AlertIcon />

          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'compEssential'
          }" @click="store.toggleSideTab('compEssential')" ref="compEssential">
            <CompanyEssentialsIcon />
          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'dataWindow'
          }" @click="store.toggleSideTab('dataWindow')" ref="dataWindow">
            <DataWindowIcon />
          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'hotlist'
          }" @click="store.toggleSideTab('hotlist')">
            <HotScriptsIcon />
            </a>
          </li>
        </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'nepseMovers'
          }" @click="store.toggleSideTab('nepseMovers')" >

            <NepseMoversIcon />
            </a>
          </li>
        </SplideSlide>
    <SplideSlide>
          <li class="nav-item">
            <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'calendar'
          }" @click="store.toggleSideTab('calendar')">
          <CalendarIcon />
          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2"  :class="{
            'active': store.selectedWidget === 'marketDepth'
          }" @click="store.toggleSideTab('marketDepth')" >
          <MarketDepthIcon/>
          </a>
        </li>
      </SplideSlide>
    <!-- <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2"  :class="{
            'active': store.selectedWidget === 'autochart'
          }" @click="store.toggleSideTab('autochart')" >
          <AutoChartIcon />
          </a>
        </li>
      </SplideSlide> -->
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2" :class="{
            'active': store.selectedWidget === 'forum'
          }" @click="store.toggleSideTab('forum')">
          <PublicChatIcon />
          </a>
        </li>
      </SplideSlide>
    <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2"  :class="{
            'active': store.selectedWidget === 'orderPanel'
          }" @click="store.toggleSideTab('orderPanel')">
          <OrderingPanelIcon />
          </a>
        </li>
      </SplideSlide>
    <!-- <SplideSlide>
        <li class="nav-item">
          <a href="#" class="nav-link p-2"  @click="$tours['paperTradingTour'].start()">
            <HelpIcon />
          </a>
        </li>
      </SplideSlide> -->
    </Splide>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  width: 50px;
  border: 0;
}

.nav-item {
  padding: 0;
}

.widget-menu {
  width: 65px;
  min-height: 100vh;
}

.filler {
  flex: 1 1 100%;
  min-height: 13px;
  width: 100%;
}

i.buy-sell-icon {
  font-size: 25px;
  margin-left: 3px;
}
</style>

