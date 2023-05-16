<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useOrderStore } from '@/stores/orderStore'
import { Modal } from 'bootstrap'
import { SOCKET_EVENTS, USER_ID } from '@/stores/enums'

export default {
  name: "OrderTab",
  components: {},
  data() {
    return {
      // saving: false,
      editOrder: {
        take_profit: false,
        stop_loss: false,
        take_profit_amount: 0,
        take_profit_percentage: 0,
        stop_loss_amount: 0,
        stop_loss_percentage: 0,
      },
      removeOrder: {
        id: null,
        symbol: null,
        unit: null,
        limit_start_price: null
      }
    }
  },
  mounted(){
    this.editOrderModal = new Modal(this.$refs.editOrderModal)
    this.removeOrderModal = new Modal(this.$refs.removeOrderModal)
    this.orderStore.getOrders()
  },
  setup() {
    const store = useTickerStore()
    const orderStore = useOrderStore()
    const headers = [
      { text: 'Symbol', value: 'symbol', sortable: true },
      { text: 'Side', value: 'trade_type', sortable: true },
      { text: 'Type', value: 'order_type', sortable: true },
      { text: 'Qty', value: 'unit', sortable: true },
      { text: 'Price', value: 'current_market_price', sortable: true },
      { text: 'Fill Price', value: 'fillPrice', sortable: true },
      { text: 'Take Profit', value: 'take_profit_amount', sortable: true },
      { text: 'Stop Loss', value: 'stop_loss_amount', sortable: true },
      { text: 'Status', value: 'status', sortable: true },
      { text: 'Commission', value: 'commission' },
      { text: 'Placing Time', value: 'created_on', sortable: true },
      { text: 'Order id', value: 'id' },
      { text: 'Expiry', value: 'expiry_date' },
      { text: '', value: 'action' },
    ]
    return {
      store,
      orderStore,
      headers
    }
  },
  // sockets: {
  //   [SOCKET_EVENTS.SEND_UPDATE_ORDER](data){
  //     // this.saving = false
  //     if (data.error) {
  //       this.$notify({
  //         title: "Failed to update order",
  //         text: data.message,
  //         type: "warning"
  //       })
  //       return;
  //     }
  //     this.$notify({
  //       title: "Order updated",
  //       // text: ``,
  //       type: 'success'
  //     })
  //     this.editOrderModal.hide()

  //     // this.$socket.emit(SOCKET_EVENTS.GET_ORDER_LIST, USER_ID)
  //   },
  //   [SOCKET_EVENTS.SEND_REMOVE_ORDER](data){
  //     this.saving = false
  //     if (data.error) {
  //       this.$notify({
  //         title: "Failed to update order",
  //         text: data.message,
  //         type: "warning"
  //       })
  //       return;
  //     }
  //     this.$notify({
  //       title: "Order cancelled",
  //       // text: ``,
  //       type: 'success'
  //     })
  //     this.removeOrderModal.hide()

  //     // this.$socket.emit(SOCKET_EVENTS.GET_ORDER_LIST, USER_ID)
  //   }
  // },
  methods: {
    bodyItemClassName(column, index) {
      if (column === 'action') {
        return 'fixed-right-actions'
      }
      return ''
    },
    takeProfitRequired(node) {
      return !this.editOrder.take_profit;
    },
    stopLossRequired(node) {
      return this.editOrder.stop_loss && !node.value
    },
    profitPriceChange() {
      let amount = parseFloat(this.editOrder.take_profit_amount) - parseFloat(this.editOrder.current_market_price)
      let per = (amount / parseFloat(this.editOrder.limit_start_price)) * 100
      this.editOrder.take_profit_percentage = per.toFixed(2)
    },
    lossPriceChange() {
      let amount = parseFloat(this.editOrder.limit_start_price) - parseFloat(this.editOrder.stop_loss_amount)
      let per = (amount / parseFloat(this.editOrder.limit_start_price)) * 100
      this.editOrder.stop_loss_percentage = per.toFixed(2)
    },
    profitPercentageChange() {
      let amount = (parseFloat(this.editOrder.limit_start_price) * parseFloat(this.editOrder.take_profit_percentage)) / 100
      this.editOrder.take_profit_amount = (amount + parseFloat(this.editOrder.limit_start_price)).toFixed(2)
    },
    lossPercentageChange() {
      let amount = (parseFloat(this.editOrder.limit_start_price) * parseFloat(this.editOrder.stop_loss_percentage)) / 100
      this.editOrder.stop_loss_amount = (parseFloat(this.editOrder.limit_start_price) - amount).toFixed(2)
    },
     // --- EDIT ----
     showEditModal(id){
      let order = this.orderStore.orders.find(o => o.id === id)
      // console.log("ORDER ... ", order.symbol)
      if (!order){
        this.$notify({
          title: 'Something went wrong',
          type: 'danger'
        })
        return
      }
      // console.log(order, 'SHOW EDIT MODAL')
      this.editOrder = {
        id: order.id,
        unit: order.unit,
        current_market_price: order.current_market_price,
        limit_start_price: order.limit_start_price,
        take_profit: order.take_profit,
        stop_loss: order.stop_loss,
        symbol: order.symbol,
        order_type: order.order_type,
        trade_type: order.trade_type,
        take_profit_amount: order.take_profit_amount,
        take_profit_percentage: order.take_profit_percentage,
        stop_loss_amount: order.stop_loss_amount,
        stop_loss_percentage: order.stop_loss_percentage,
      }
      // this.saving = false
      // console.log(this.editOrder, 'SHOW EDIT MODAL')
      this.editOrderModal.show()
    },
    submitEditHandler(){
      let data = {
        id: this.editOrder.id,
        take_profit: !!this.editOrder.take_profit,
        stop_loss: !!this.editOrder.stop_loss,
        take_profit_amount: this.editOrder.take_profit_amount || 0,
        take_profit_percentage: this.editOrder.take_profit_percentage || 0,
        stop_loss_amount: this.editOrder.stop_loss_amount || 0,
        stop_loss_percentage: this.editOrder.stop_loss_percentage || 0,
      }
      // this.saving = true
      // this.$socket.emit(SOCKET_EVENTS.UPDATE_ORDER, data)
      this.orderStore.createOrUpdateOrder(data).then(() => {
        this.editOrderModal.hide()
      })
    },
     // --- Remove ----
     showRemoveModal(id){
      let order = this.orderStore.orders.find(o => o.id === id)
      // console.log("ORDER ... ", order.symbol)
      if (!order){
        this.$notify({
          title: 'Something went wrong',
          type: 'danger'
        })
        return
      }
      // console.log(order, 'SHOW EDIT MODAL')
      this.removeOrder = {
        id: order.id,
        unit: order.unit,
        limit_start_price: order.limit_start_price,
        
        symbol: order.company.symbol,
        order_type: order.order_type,
        trade_type: order.trade_type,
        
      }
      // console.log(this.removeOrder, 'SHOW Remove MODAL')
      this.removeOrderModal.show()
    },
    removeOrderHandler(){
      this.saving = true
      // this.$socket.emit(SOCKET_EVENTS.REMOVE_ORDER, data)
      this.orderStore.removeOrder(this.removeOrder.id).then(() => {
        this.removeOrderModal.hide()
      })
    },
  }
}
</script>

<template>
  <div id="order-list-table">

    <EasyDataTable :headers="headers" :items="orderStore.orders" table-class-name="text-nowrap"
      :body-item-class-name="bodyItemClassName" :fixed-header="true">
      <template #item-symbol="{ company }">
        <span class="font-weight-bold" :title="company.name">
          {{ company.symbol }}
        </span>
      </template>
      <template #item-trade_type="{ trade_type }">
        <span :class="{
          'text-success': trade_type === 'Buy',
          'text-danger': trade_type === 'Sell',
        }">
          {{ trade_type }}
        </span>
      </template>
      <template #item-status="{ status }">
        <span :class="{
          'text-danger': status === 'Rejected',
          'text-warning': status === 'Cancelled',
          'text-success': status === 'Filled',
          'text-info': status === 'Pending',
        }">
          {{ status }}
        </span>
      </template>
      <template #item-created_on="{ created_on }">
        {{ $dayjs(created_on).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #item-action="{status, id}">
        <span v-if="status === 'Pending'">
          <span class="cursor-pointer text-muted text-body mr-2" @click="showEditModal(id)">
            <em class="icon-pencil6"></em>
          </span>
          <span class="cursor-pointer text-muted text-body" @click="showRemoveModal(id)">
            <em class="icon-cross2"></em>
          </span>
        </span>

      </template>
    </EasyDataTable>


  <div class="modal fade" id="edit-order-modal" ref="editOrderModal">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">
        <div class="modal-header border-bottom py-2">
          <h5 class="modal-title">Edit {{editOrder.symbol}}, {{editOrder.unit}} @ {{editOrder.limit_start_price}}</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <FormKit type="form" id="ticker-edit-order-form" @submit="submitEditHandler" :actions="false">
          <div class="modal-body pb-2">
            <div class="clearfix">
          <div class="form-check form-check-inline float-left">
            <label class="form-check-label">
              <FormKit label="Book Profit At" type="checkbox" v-model="editOrder.take_profit" input-class="form-check-input"
                name="Book Profit At" />
            </label>
          </div>
          <div class="form-check form-check-inline form-check-right float-right">
            <label class="form-check-label">

              <FormKit type="checkbox" label="Stop Loss At" v-model="editOrder.stop_loss" input-class="form-check-input"
                name="Stop Profit At" />
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!editOrder.take_profit" :required="takeProfitRequired" v-model="editOrder.take_profit_amount"
              name="Profit Price" @change="profitPriceChange" />
          </div>
          <div class="col-sm-2">
            <label class="text-center">Price </label>
          </div>
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!editOrder.stop_loss" :required="stopLossRequired" v-model="editOrder.stop_loss_amount"
              name="Loss Price" @change="lossPriceChange" />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!editOrder.take_profit" :required="takeProfitRequired"
              v-model="editOrder.take_profit_percentage" name="Profit Percentage" @change="profitPercentageChange" />
          </div>
          <div class="col-sm-2">
            <label class="text-center">% </label>
          </div>
          <div class="col-sm-5">
            <FormKit type="text" :disabled="!editOrder.stop_loss" :required="stopLossRequired" v-model="editOrder.stop_loss_percentage"
              name="Loss Percentage" @change="lossPercentageChange" />
          </div>
        </div>
          </div>
          <div class="modal-footer justify-content-between border-top pt-3">
            <button type="submit" :disabled="orderStore.saving" class="btn btn-lg btn-block btn-success">
              Modify
            </button>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
    

  <div class="modal fade" id="remove-order-confirm-modal" ref="removeOrderModal">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">
        
            <div class="modal-body pb-2">
              <h4>
                Do you really want to cancel your order?
              </h4>
              <p>
                '<strong>{{removeOrder.symbol}}, {{removeOrder.unit}} @ {{removeOrder.limit_start_price}}</strong>'
              </p>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
					<button type="button" :disabled="orderStore.saving" class="btn btn-danger" @click="removeOrderHandler">Cancel Order</button>
				</div>
      </div>
    </div>
  </div>


</div>

</template>


<style>
.fixed-right-actions {
  z-index: 1!important;
  right: 0px!important;
  position: sticky!important;;
}
</style>