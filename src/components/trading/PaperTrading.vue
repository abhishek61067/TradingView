<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useAccountStore } from '../../stores/accountStore'
import { usePositionStore } from '../../stores/positionStore'
import { useOrderStore } from '@/stores/orderStore'
import { SOCKET_EVENTS, USER_ID } from '@/stores/enums';
import { ordersColumns, positionColumns, historyColumns, accountHistoryColumns } from '@/stores/data/paper-trading';
import OrderTab from './trading-tabs/OrderTab.vue';
import PositionTab from './trading-tabs/PositionTab.vue';
import OrderHistoryTab from './trading-tabs/OrderHistoryTab.vue';
import AccountHistoryTab from './trading-tabs/AccountHistoryTab.vue';
import JournalTab from './trading-tabs/JournalTab.vue';
import ProfitLossTab from './trading-tabs/ProfitLossTab.vue';
import { Modal } from 'bootstrap'

export default {
  name: "PaperTrading",
  components: {
    OrderTab,
    PositionTab,
    OrderHistoryTab,
    AccountHistoryTab,
    JournalTab,
    ProfitLossTab
},
  setup() {
    const store = useTickerStore()
    const accountStore = useAccountStore()
    const orderStore = useOrderStore()
    const positionStore = usePositionStore()
    return {
      store,
      accountStore,
      orderStore,
      positionStore
    }
  },
  mounted() {
    this.ordersCols = ordersColumns
    this.positionCols = positionColumns
    this.historyCols = historyColumns
    this.accountHistoryCols = accountHistoryColumns

    this.resetAccountConfirm = new Modal(this.$refs.resetAccountConfirm)
  },
  methods: {
    showBuySellTab(){
      this.$emit('showBuySellWidget')
    },
    togglePaperTrading(){
      this.store.isPTMinimized = !this.store.isPTMinimized
      this.store.isPTFullScreen = false
    },
    toggleFullScreen(){
      this.store.isPTFullScreen = !this.store.isPTFullScreen
      this.store.isPTMinimized = false
    },
    formatValue(data, config){
      if (config.type === 'date') {
        let d = this.$dayjs(data);
        return d.format("YYYY-MM-DD HH:mm:ss")
      }
      return data;
    },
    toggleTabMenu(name){
      
      this.selectedTab = name
    },
    showResetConfirm(){
      
      this.resetAccountConfirm.show()
    },
    handleResetAccount(){
      
      // this.resetAccountConfirm.hide()
      this.accountStore.resetAccount()
    },

  },
  data() {
    return {
      orderHistory: [],
      ordersCols: [],
      positionCols: [],
      historyCols: [],
      accountHistoryCols: [],
      selectedTab: 'position',
      resetting: false
    };
  }
}
</script>
<template>
  <div id="paper-trading-resize" class="card m-0 position-relative" :class="{
    'paper-trading': !store.isPTFullScreen,
    'paper-trading-full': store.isPTFullScreen,
  }" >

   
    <div class="card-body p-0">
      <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
        <div class="d-flex">
          <div class="dropdown">
            <a href="javascript:void()" class="dropdown-toggle font-size-lg font-weight-bold text-dark" data-bs-toggle="dropdown">
              <div class="pt-logo d-inline">
                <img src="@/assets/img/money_mitra_logo_sm.png" alt="Money Mitra" style="height: 25px;">
              </div>
              Paper Trading
            </a>
            <div class="dropdown-menu">
              <span class="dropdown-item cursor-pointer" @click="showResetConfirm">
                Reset Paper Trading Account ...
              </span>
            </div>
          </div>

          <span class="ml-3 ">
            {{ accountStore.full_name }} (NPR)
          </span>
        </div>
        <a href="/pricing" class="btn btn-warning btn-sm" v-if="accountStore.is_free && store.isPTMinimized">
          Upgrade to Access
        </a>
        <div class="header-elements d-none ">
          <div class="breadcrumb justify-content-center">
            <div class="text-danger fw-bolder p-2 me-3" v-if="!this.store.isMarketLive">Market Closed</div>
            <div class="text-success fw-bolder p-2 me-3" v-if="this.store.isMarketLive">Market Open</div>
            <div class="row text-center" :class="{
              'blur-5': accountStore.is_free
            }">
              <div class="col-4">
                <div class="">
                  <h6 class="font-weight-semibold text-nowrap mb-0">
                    {{ accountStore.account ? helper.addCommas(accountStore.account.account_balance) : '-' }}
                  </h6>
                  <span class="font-size-xs text-nowrap">Account Balance</span>
                </div>
              </div>

              <div class="col-4">
                <div class="">
                  <h6 class="font-weight-semibold text-nowrap mb-0">
                    {{ accountStore.account ? helper.addCommas(accountStore.account.total_equity) : '-' }}
                  </h6>
                  <span class="font-size-xs text-nowrap">Equity</span>
                </div>
              </div>

              <div class="col-4">
                <div class="">
                  <h6 class="font-weight-semibold text-nowrap mb-0" :class="this.helper.getChangeClass(accountStore.account.p_n_l)">
                    {{ accountStore.account ? helper.addCommas(accountStore.account.p_n_l) : '-' }}
                  </h6>
                  <span class="font-size-xs text-nowrap">Open Profit</span>
                </div>
              </div>
            </div>

          </div>
          <span class="list-icons-item  cursor-pointer ml-2" @click="showBuySellTab">
            <em class="icon-plus-circle2"></em>
          </span>
          <span class="list-icons-item cursor-pointer ml-2" @click="togglePaperTrading">
            <em :class="{
              'icon-arrow-up15': store.isPTMinimized,
              'icon-minus3': !store.isPTMinimized,
              }"></em>
          </span>
          <span class="list-icons-item cursor-pointer ml-2" @click="toggleFullScreen">
            <em :class="{
              'icon-screen-full': !store.isPTFullScreen,
              'icon-screen-normal': store.isPTFullScreen,
              }"></em>
          </span>
        </div>
      </div>
      <div class="bg-text position-absolute" v-show="accountStore.is_free && !store.isPTMinimized">
        <a class="btn p-0 d-flex justify-content-center align-items-center subscription-button__card border border-0 fs-6 fw-bold text-green rounded-2" href="/pricing">
            <figure class="m-0 p-1">
                <img src="/static/image/subscription-button.png" alt="" class="h-100 w-100">
            </figure>
        </a>
    </div>

      <div class="trading-scroll-div" :class="{
        'blur-5': accountStore.is_free,
        'd-none': store.isPTMinimized,
        'trading-scroll-div': !store.isPTMinimized,
        'trading-scroll-div-full': store.isPTFullScreen,
        }">
        <ul class="nav nav-tabs nav-tabs-bottom m-0">
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'position'
          }" class="nav-link" @click="toggleTabMenu('position')" data-bs-toggle="tab">
              Positions {{ positionStore.position_count }}
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'orders'
          }"  class="nav-link" @click="toggleTabMenu('orders')" data-bs-toggle="tab">
              Orders {{ orderStore.order_count }}
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'history'
          }" class="nav-link" @click="toggleTabMenu('history')" data-bs-toggle="tab">
              History
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'accountHistory'
          }"  class="nav-link" @click="toggleTabMenu('accountHistory')" data-bs-toggle="tab">
              Account History
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'journal'
          }"  class="nav-link" @click="toggleTabMenu('journal')" data-bs-toggle="tab">
              Trading Journal
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void()" :class="{
            'active': selectedTab === 'pnl'
          }"  class="nav-link" @click="toggleTabMenu('pnl')" data-bs-toggle="tab">
              Profit & Loss
            </a>
          </li>

        </ul>

        <div class="tab-content" v-if="accountStore.subscription.type !== 'Free'">
          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'position'
          }" id="positions-tab">
            <PositionTab  v-if="selectedTab === 'position'"/>
          </div>

          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'orders'
          }" id="order-list-tab">
            <OrderTab v-if="selectedTab === 'orders'"/>
          </div>
          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'history'
          }" id="history-tab">
            <OrderHistoryTab  v-if="selectedTab === 'history'"/>
          </div>
          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'accountHistory'
          }" id="account-history-tab">
            <AccountHistoryTab v-if="selectedTab === 'accountHistory'"/>
          </div>
          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'journal'
          }" id="trading-journal-tab">
            <JournalTab  v-if="selectedTab === 'journal'"/>
          </div>
          <div class="tab-pane fade" :class="{
            'show active': selectedTab === 'pnl'
          }" id="profit-loss-tab">
            <ProfitLossTab  v-if="selectedTab === 'pnl'"/>
          </div>

        </div>
      </div>

    </div>


  <div class="modal fade" id="reset-account-confirm-modal" ref="resetAccountConfirm">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">
        
            <div class="modal-body pb-2">
              <h4>
                Do you really want to reset your account?
              </h4>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
					<button type="button" :disabled="resetting" class="btn btn-danger" @click="handleResetAccount">
            Reset Account
          </button>
				</div>
      </div>
    </div>
  </div>


  </div>
</template>

<style scoped>

.paper-trading {
  max-height: 40vh;
  overflow: hidden;
}
.paper-trading-full {
  max-height: 90vh;
  overflow: scroll;
}

.form-inline label {
  min-width: 30px;
}

.trading-scroll-div {
  overflow: scroll;
  height: 34vh;
}

.trading-scroll-div-full {
  overflow: scroll;
  min-height: 96vh;
}

/* .table-responsive {
  max-height: 250px; 
} */


.bg-text {
    width: 211px;
    height: 80px;
    border-radius: 10px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
}
</style>

