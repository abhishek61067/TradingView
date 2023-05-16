<!-- script first, then template and style is the recommendation -->

<script type="module">
/* eslint-disable */
import { useTickerStore } from '@/stores/tickerStore'
import { usePositionStore } from '@/stores/positionStore'
import { useOrderStore } from '@/stores/orderStore'
import { useMarketdepthStore } from '@/stores/marketdepthStore'
import { useCompanyEssentialStore } from '@/stores/companyEssentialStore'
import { useCalendarStore } from '@/stores/calendarStore'
import { useAccountStore } from '@/stores/accountStore'

import { widget } from '../../public/charting_library';




// import { SOCKET_EVENTS } from '@/stores/enums'
// import { mdiConsoleNetwork } from '@mdi/js';

// import custom_study from '../lib/chart/custom_study'

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default {
  name: 'TVChartContainer',
  setup() {
    const tickerStore = useTickerStore()
    const positionStore = usePositionStore()
    const orderStore = useOrderStore()
    const depthStore = useMarketdepthStore()
    const essentialStore = useCompanyEssentialStore()
    const calendarStore = useCalendarStore()
    const accountStore = useAccountStore()

    return {
      tickerStore,
      positionStore,
      orderStore,
      depthStore,
      essentialStore,
      calendarStore,
      accountStore
    }
  },
  data() {
    return {
      feedUrl: process.env.VUE_APP_CHART_FEED_URL
    }
  },
  tvWidget: null,
  mounted() {
    console.log(this.accountStore.account, ' ACCOUNT ')
    const self = this;
    let tvDatafeed = window.tvDatafeed = new window.Datafeeds.UDFCompatibleDatafeed(
      self.tickerStore.chartDataType.url,  40 * 1000 // update in 1 minutes
    );

    const container = this.$refs.chartContainer;
    const widgetOptions = {
      symbol: this.getDefaultSymbol(),
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: tvDatafeed,

      
      interval: '1W',
      container: container,
      library_path: process.env.VUE_APP_CHARTING_LIBRARY_PATH,
      timeframe: '1d',
      timezone: 'exchange',
    //   time_frames: [
    // // { text: "50y", resolution: "6M", description: "50 Years" },
    // // { text: "3y", resolution: "1W", description: "3 Years", title: "3yr" },
    // // { text: "8m", resolution: "1D", description: "8 Month" },
    // // { text: "3d", resolution: "5", description: "3 Days" },
    // // { text: "1000y", resolution: "1W", description: "All", title: "All" },
// ]

      locale: getLanguageFromURL() || 'en',
      // disabled_features: [''],
      enabled_features: ['study_templates', 'chart_crosshair_menu', 'use_localstorage_for_settings'],
      charts_storage_url: process.env.VUE_APP_CHART_STORAGE_URL,
      charts_storage_api_version: '1.1',
      client_id: process.env.VUE_APP_CHART_CLIENT_ID,
      user_id: this.accountStore.account.user_id || 'public_user_id',
      fullscreen: false,
      autosize: true,
      theme: "Dark",      
      custom_css_url: 'css/chart.css',
      // studies_overrides: {},
      chart_crosshair_menu: true,
      toolbar_bg: 'red',


      debug: true,
      loading_screen: { backgroundColor: "#000000" },
      loaded: function() {
    // Create a toolbar button
    const button = $('<button>')
      .addClass('my-dropdown-button')

      .text('Dropdown')
      .appendTo('.tv-top-toolbar');

    // Create the dropdown menu
    const dropdown = $('<div>')
      .addClass('my-dropdown-menu')
      .appendTo(button);

    // Add items to the dropdown menu
    const item1 = $('<div>').text('Item 1').appendTo(dropdown);
    const item2 = $('<div>').text('Item 2').appendTo(dropdown);
    }
      
      // custom_indicators_getter: function(PineJS) {
      //   return Promise.resolve([
      //     custom_study(PineJS)
      //   ]);
      // },
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = window.tvWidget = tvWidget;

    tvWidget.headerReady().then(function () {
      
      let button = tvWidget.createButton();
      button.setAttribute('title', 'Show UnAdjusted');

      let dropdown = tvWidget.createDropdown({
        title: "dropdown",
        items: [{
          title:"1",
          onSelect: ()=>{
            console.log('1 selected');
          }
        },{
          title:"2"
        }],
        tooltip: "test",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill:white" width="10"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>`,
        align:"left",
        cssClass: "custom-dropdown",
      });
      // dropdown.setAttribute("title", "Dropdown")
      
      let isUnadjusted = false
      button.addEventListener('click', function () {
        if (isUnadjusted) {
          self.tickerStore.chartDataType.key = 'adjusted'
          self.tickerStore.chartDataType.displayText = 'Show UnAdjusted'
          self.tickerStore.chartDataType.url = process.env.VUE_APP_CHART_FEED_URL
        } else {
          self.tickerStore.chartDataType.key = 'unadjusted'
          self.tickerStore.chartDataType.displayText = 'Show Adjusted'
          self.tickerStore.chartDataType.url = process.env.VUE_APP_CHART_FEED_UNADJ_URL
        }
        isUnadjusted = !isUnadjusted
        // console.log('DONE')
      });
      button.textContent = self.tickerStore.chartDataType.displayText;
      button.className = `custom-btn ${self.tickerStore.chartDataType.key}`;
    });

    tvWidget.onChartReady(() => {

      // console.log(this.tickerStore.history, ' TV Chart Ready')

      let activeChart = tvWidget.activeChart()

      tvWidget.subscribe('onPlusClick', (data) => {
        // console.log('plus clicked', data)
        this.tickerStore.showAddAlert(data.price)
      });

      this.addOrderShapes()
      this.addPositionLine()
      activeChart.onSymbolChanged().subscribe(null, (company) => {
        // console.log('On Symbol Changed ', company)
        // this.$emit('callChangeChart', company.ticker) // this is not getting called 
        localStorage.setItem('tvSelectedSymbol', company.ticker)

        self.tickerStore.symbol = company.ticker
        self.tickerStore.getCompanyInfo()
        setTimeout(() => {
          // add orders
          self.addPositionLine()
          self.addOrderShapes()
          // console.log('SET TIMEOUT ...')
        }, 1200)

        // refresh currently opened side widget tab
        let selectedWidget = this.tickerStore.selectedWidget
        if (selectedWidget === "marketDepth") {
          this.depthStore.getMarketDepth(this.tickerStore.symbol)
        } else if (selectedWidget === "compEssential") {
          this.essentialStore.getCompanyEssentials(this.tickerStore.company.id)
        } else if (selectedWidget === "calendar") {
          this.calendarStore.getCalendar(this.tickerStore.company.id)
        }

      })

      activeChart.crossHairMoved().subscribe(null, (cfg) => {
        if (self.tickerStore.selectedWidget === "dataWindow") {

          // console.log(cfg)
          tvWidget.activeChart().exportData({
            includeTime: true,
            from: cfg.time,
            to: cfg.time,
          }).then(result => {

            let crossData = {
              study: {}
            }
            // console.log(result)
            result.schema.forEach((s, index) => {
              let value = result.data[0][index]
              value = isNaN(value) ? '' : parseFloat(value).toFixed(2)
              if (s.type === 'time') {
                return crossData.time = value
              }
              if (s.type === 'value' && s.sourceType === 'series') {
                return crossData[s.plotTitle] = value
              }
              if (s.type === 'value' && s.sourceType === 'study') {
                return crossData.study[`${s.plotTitle} - ${s.sourceTitle}`] = value
              }
            })
            // console.log(crossData)
            self.tickerStore.crossData = crossData;
          })

        }
      });
      // let range = activeChart.getVisibleRange()
      tvWidget.onContextMenu(function (unixtime, price) {
        return [{
          position: "top",
          text: `Add Alert ${price.toFixed(2)}`,
          click: function () {
            self.tickerStore.showAddAlert(price)
          }
        },
        { text: "-", position: "top" },
        ];
      });
    });
  },
  methods: {
    changeChartSymbol: function (symbol) {
      // console.log(symbol)
      if (this.tvWidget) {
        this.tvWidget.activeChart().setSymbol(symbol);
      }
    },
    getDefaultSymbol: function () {
      // console.log(symbol)
      let symbol = this.tickerStore.symbol.fullName;
      let localSymbol = localStorage.getItem('tvSelectedSymbol')
      if (this.$route.query.symbol) {
        symbol = this.$route.query.symbol
        localStorage.setItem('tvSelectedSymbol', symbol)
      } else if (localSymbol) {
        symbol = localSymbol
      }

      this.tickerStore.symbol = symbol

      return symbol


    },
    addOrderShapes() {
      // console.log('ADDING ORDER SHAPES ....')
      // create order shapes
      this.tickerStore.history.forEach(history => {
        // console.log('CHECKING ... ', history.symbol, history.status, this.tickerStore.symbol)
        if (history.symbol !== this.tickerStore.symbol || history.status !== "Filled") {
          return
        }
        // console.log('ADDING ... ', history.symbol, history.status, this.tickerStore.symbol)
        let color = history.trade_type === "Buy" ? "#4CAF50" : "#F44336"
        let icon = history.trade_type === "Buy" ? 0xf176 : 0xf175

        // console.log(new Date(history.created_on).getTime(), history.trade_type)

        this.tvWidget.activeChart().createShape({
          time: new Date(history.created_on).getTime() / 1000
        }, {
          // shape: history.trade_type === 'Buy' ? 'arrow_up' : 'arrow_down',
          shape: 'icon',
          text: `${history.trade_type} ${history.unit} @ ${history.limit_start_price}`,
          lock: true,
          disableSelection: true,
          icon: icon,
          overrides: {
            size: 15,
            // fontsize: 10,
            color,
            showLabel: true
          }
        }, function (entityId) {
          console.log(entityId)
        });
      })
    },
    addPositionLine() {
      if (!this.positionStore.positions) {
        return;
      }
      this.positionStore?.positions?.forEach(position => {
        if (position.symbol !== this.tickerStore.symbol) {
          return
        }
        if (position.trade_type === 'Sell') { // ignore sell records
          return
        }
        if (window.positionLineObj[position.id]) { // ignore if already added
          return
        }
        // console.log(position)
        let color = position.profit > 0 ? '#35B14F' : '#df3c27'
        // position.posLine = // this does not work as the object is modified by pinia 
        window.positionLineObj[position.id] = this.tvWidget.activeChart()
          .createOrderLine()
          .setTooltip(`${position.unit} @ ${position.avg_fill_price}`)
          .setModifyTooltip("Modify order")
          .setCancelTooltip("Cancel order")
          .setText(`${position.unit} @ ${position.avg_fill_price}`)
          .setQuantity(this.helper.addCommas(position.profit || 0))
          .setLineColor(color)
          .setQuantityTextColor(color)
          .setQuantityBackgroundColor('#dedede')
          .setLineStyle(1)
          .setPrice(position.avg_fill_price || 0);
      })
    }
  },
  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }
}
</script>

<template>
  <div :class="{
    'TVChartContainer': !tickerStore.isPTMinimized,
    'TVChartContainer-full': tickerStore.isPTMinimized,
    'd-none': tickerStore.isPTFullScreen
  }" class="w-100" ref="chartContainer" id="tvchart-container-div" />
</template>

<style lang="css" scoped>
.TVChartContainer {
  height: calc(70vh - 80px);
}

.TVChartContainer-full {
  height: calc(100vh - 47px);
}


</style>
