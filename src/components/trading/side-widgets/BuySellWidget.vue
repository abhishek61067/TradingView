<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useOrderStore } from '@/stores/orderStore'
import { usePositionStore } from '@/stores/positionStore'
import { useAccountStore } from '@/stores/accountStore'
// import { SOCKET_EVENTS, USER_ID } from '@/stores/enums'
// import requester from '../../../lib/requester'
const defaultFormData = { 
  side: 'Buy',
  type: 'Market',
  quantity: 10,
  timeInForce: 'DAY',
  price: 0,
  ticks: 0,
  takeProfit: false,
  stopLoss: false,
  profit: {
    price: 0,
    percentage: 10
  },
  loss: {
    price: 0,
    percentage: 10
  }
}

export default {
  name: "BuySellWidget",
  setup() {
    const tickerStore = useTickerStore()
    const orderStore = useOrderStore()
    const positionStore = usePositionStore()
    const accountStore = useAccountStore()

    function minPrice(node) {
      const isValid = parseFloat(node.value) > tickerStore.company.last_traded_price
      // console.log(node)
      return isValid
    }
    return {
      tickerStore,
      orderStore,
      positionStore,
      accountStore,
      minPrice
    }
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(defaultFormData)),
      typeShort: {
        Market: 'MKT',
        Limit: 'LMT',
        Stop: 'STP'
      }
    }
  },
  watch: {
    // whenever symbol changes, this function will run
    'tickerStore.company.id'(newLTP, oldLTP) {
      // console.log(newLTP, oldLTP, " PRICE CHANGED ...")
      this.form.price = this.tickerStore.company.last_traded_price || 0;
      this.form.profit.percentage = 10
      this.form.loss.percentage = 10
      this.mainPriceChange()
    }
  },
  mounted() {
    this.form.price = this.tickerStore.company.last_traded_price || 0;
    this.mainPriceChange()
    // this.buySellModal = new Modal(this.$refs.buySellModal)
  },
  computed: {
    totalStockQty() {
      let qty = 0;
      this.positionStore.positions.forEach(pos => {
        if (pos.symbol === this.tickerStore.symbol) {
          qty += pos.unit
        }
      })
      return qty
    },
    isBuy() {
      return this.form.side === 'Buy'
    },
    isSell() {
      return this.form.side === 'Sell'
    },
    tradeValue() {
      return (parseFloat(this.form.price) * parseInt(this.form.quantity)).toFixed(2)
    },
    commissionRate() {
      let rate = this.helper.getCommissionRate(this.tradeValue)
      return rate
    },
    commissionAmount() {
      let res = this.$decimal.mul(this.tradeValue, this.commissionRate)
      let amount = res.div(100)

      // console.log(amount)
      return amount
    },
    sebonCommission() {
      let res = this.$decimal.mul(this.tradeValue, this.helper.sebonRate)
      let amount = res.div(100)

      // console.log(amount)
      return amount
    },
    buttonText() {
      let symbol = this.tickerStore.symbol
      return `${this.form.side} ${this.form.quantity} ${symbol} ${this.typeShort[this.form.type]}` // Buy / Sell 1 ADBL MKT LMT STP
    },
    disableOrderForm(){
      return (!this.tickerStore.company.allow_buy_sale || this.orderStore.saving || !this.tickerStore.isMarketLive)
    }
  },
  
  methods: {
    quantityValidation(node) {
      const qty = parseFloat(node.value)
      // console.log(node.value, this.form.side)
      if (this.form.side === 'Buy') {
        return qty >= 10
      }
      return qty > 0 && qty <= this.totalStockQty
    },
    quantityValidationMessage({ node }) {
      const qty = parseFloat(node.value)
      // console.log(node.value, isValid)
      if (this.form.side === 'Buy' && qty < 10) {
        return "Quantity must be at least 10"
      }
      if (this.form.side === 'Sell' && (qty <= 0 || qty > this.totalStockQty)) {
        return `Quantity must be between 0 and ${this.totalStockQty}`
      }
    },
    submitHandler() {
      if (this.accountStore.is_free){
        return
      }
      let data = {
        unit: parseFloat(this.form.quantity),
        current_market_price: this.tickerStore.company.last_traded_price || 0,
        limit_start_price: parseFloat(this.form.price || 0),
        take_profit: this.form.takeProfit,
        stop_loss: this.form.stopLoss,
        company: this.tickerStore.company.id,
        // user: USER_ID,
        order_type: this.form.type,
        trade_type: this.form.side,
        take_profit_amount: 0,
        take_profit_percentage: 0,
        stop_loss_amount: 0,
        stop_loss_percentage: 0
      }

      if (this.form.takeProfit) {
        data.take_profit_amount = this.form.profit.price
        data.take_profit_percentage = this.form.profit.percentage
      }
      if (this.form.stopLoss) {
        data.stop_loss_amount = this.form.loss.price
        data.stop_loss_percentage = this.form.loss.percentage
      }
      // this.$socket.emit(SOCKET_EVENTS.CREATE_ORDER, data)
      this.orderStore.createOrUpdateOrder(data).then(() => {
        this.form = JSON.parse(JSON.stringify(defaultFormData))
      })
    },
    changeSide(side) {
      // if (side === 'Sell'){

      //   return this.form.side = 'Sell' // side
      // }
      this.form.side = side // 'Buy' // side
    },
    changeType(type) {
      // console.log(type)
      this.form.type = type
    },
    takeProfitRequired(node) {
      // console.log(node.value)
      // console.log(this.form.takeProfit)
      if (!this.form.takeProfit) {
        return true // not required
      }
      if (this.form.takeProfit && !node.value) {
        return false // required
      }
      return false
    },
    stopLossRequired(node) {
      return this.form.stopLoss && !node.value
    },
    mainPriceChange() {
      this.profitPercentageChange()
      this.lossPercentageChange()
    },
    profitPriceChange() {
      let amount = parseFloat(this.form.profit.price) - parseFloat(this.form.price)
      let per = (amount / parseFloat(this.form.price)) * 100
      this.form.profit.percentage = per.toFixed(2)
    },
    lossPriceChange() {
      let amount = parseFloat(this.form.price) - parseFloat(this.form.loss.price)
      let per = (amount / parseFloat(this.form.price)) * 100
      this.form.loss.percentage = per.toFixed(2)
    },
    profitPercentageChange() {
      let amount = (parseFloat(this.form.price) * parseFloat(this.form.profit.percentage)) / 100
      this.form.profit.price = (amount + parseFloat(this.form.price)).toFixed(2)
    },
    lossPercentageChange() {
      let amount = (parseFloat(this.form.price) * parseFloat(this.form.loss.percentage)) / 100
      this.form.loss.price = (parseFloat(this.form.price) - amount).toFixed(2)
    },

  }
}
</script>
<template>
  <div class="card mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title" id="buy-sell-form-cardLabel">
        {{ tickerStore.symbol }}, Paper Trading
      </h5>
      <div class="header-elements">
        <span class="badge badge-icon cursor-pointer text-white" @click="() => tickerStore.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>
    <div class="bg-text position-absolute" v-show="accountStore.is_free">
        <a class="btn p-0 d-flex justify-content-center align-items-center subscription-button__card border border-0 fs-6 fw-bold text-green rounded-2" href="/pricing">
            <figure class="m-0 p-1">
                <img src="/static/image/subscription-button.png" alt="" class="h-100 w-100">
            </figure>
        </a>
    </div>
    <div class="card-body" :class="{
      'blur-5': accountStore.is_free,
    }">
      <FormKit type="form" id="ticker-buy-sell-form" @submit="submitHandler" :actions="false">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8">
            <div class="btn-group btn-group-justified">
              <button type="button" :disabled="totalStockQty <= 0" class="btn btn-float font-size-lg"
                @click="changeSide('Sell')" :class="{
                  'btn-outline-danger': isBuy && totalStockQty > 0,
                  'btn-danger': isSell && totalStockQty > 0,
                  'btn-light': isBuy && totalStockQty <= 0
                }">
                Sell
              </button>
              <button type="button" class="btn btn-float font-size-lg" @click="changeSide('Buy')" :class="{
                'btn-outline-primary': isSell,
                'btn-primary bg-brand': isBuy
              }">
                Buy
              </button>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>

        <hr />
        <div class="row">
          <div class="col-md-6">
            <FormKit v-model="form.type" type="radio" label="Order Type" :options="{
              Market: 'MKT',
              Limit: 'LMT',
            }" input-class="form-check-input" fieldset-class="border-0 p-0"
              legend-class="border-0 font-weight-normal font-size-lg p-0 pb-2" options-class="rff" option-class="p-0" />
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">QTY</label>
              <FormKit type="number" validation="required|number|quantityValidation"
                :validation-rules="{ quantityValidation }"
                :validation-messages="{ quantityValidation: quantityValidationMessage }" v-model="form.quantity"
                name="QTY" />
            </div>
          </div>

        </div>
        <div class="row">

          <div class="col-md-6" v-if="form.type != 'Market'">
            <div class="form-group">
              <label for="">Price (NPR)</label>
              <FormKit type="text" validation="required|number" v-model="form.price" name="Price"
                @input="mainPriceChange" />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="">Validity</label>
              <FormKit disabled type="text" v-model="form.timeInForce" name="Validity" />
            </div>
          </div>

        </div>

        <hr class="mt-2">
        <div class="clearfix">
          <div class="form-check form-check-inline float-left">
            <label class="form-check-label">
              <FormKit label="Book Profit At" type="checkbox" v-model="form.takeProfit" input-class="form-check-input"
                name="Book Profit At" />

            </label>
          </div>
          <div class="form-check form-check-inline form-check-right float-right">
            <label class="form-check-label">

              <FormKit type="checkbox" label="Stop Loss At" v-model="form.stopLoss" input-class="form-check-input"
                name="Stop Profit At" />
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!form.takeProfit" :required="takeProfitRequired" v-model="form.profit.price"
              name="Profit Price" @change="profitPriceChange" />
          </div>
          <div class="col-sm-2">
            <label class="text-center">Price </label>
          </div>
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!form.stopLoss" :required="stopLossRequired" v-model="form.loss.price"
              name="Loss Price" @change="lossPriceChange" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!form.takeProfit" :required="takeProfitRequired"
              v-model="form.profit.percentage" name="Profit Percentage" @change="profitPercentageChange" />
          </div>
          <div class="col-sm-2">
            <label class="text-center">% </label>
          </div>
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!form.stopLoss" :required="stopLossRequired" v-model="form.loss.percentage"
              name="Loss Percentage" @change="lossPercentageChange" />
          </div>
        </div>

        <button type="submit" class="btn btn-block btn-lg mt-3" :class="{
          'btn-primary bg-brand': isBuy,
          'btn-danger': isSell
        }" :disabled="disableOrderForm">
          <h5 class="m-0">
            {{ buttonText }}
          </h5>

        </button>

        <div class="order-info-section mt-2">

          <h6 class="m-0">Order info</h6>
          <dl class="row mb-0 font-size-sm">

            <dd class="col-sm-7 mb-1">Trade Value</dd>
            <dt class="col-sm-5 text-right mb-1"> {{ tradeValue }}</dt>
            <dd class="col-sm-7 mb-1">Commission ({{ commissionRate }}%)</dd>
            <dt class="col-sm-5 text-right mb-1"> {{ commissionAmount }}</dt>
            <dd class="col-sm-7 mb-1">Sebon Charge ({{ helper.sebonRate }}%)</dd>
            <dt class="col-sm-5 text-right mb-1"> {{ sebonCommission }} </dt>
            <dd class="col-sm-7 mb-1">DP Charge</dd>
            <dt class="col-sm-5 text-right mb-1">{{ helper.dpCharge }}</dt>

          </dl>
        </div>
      </FormKit>
    </div>
    <!-- <div class="card-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="card">Close</button>
        </div> -->
  </div>
</template>

<style scoped>
.formkit-outer {
  margin-bottom: 0;
}

.card>.card-body {
  max-height: 100vh;
  overflow: scroll;
}
.bg-text {
    width: 211px;
    height: 80px;
    border-radius: 10px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    margin-top: 60px;
}
</style>
