<script>
import { useTickerStore } from '@/stores/tickerStore'
import { usePositionStore } from '@/stores/positionStore'
import { useOrderStore } from '@/stores/orderStore'
import { Modal } from 'bootstrap'

export default {
  name: "PositionTab",
  components: {},
  data() {
    return {
      saving: false,
      closePosition: {
        symbol: '',
        unit: 0,
        isPartial: false,
        limit_start_price: 0,
        partialQty: 0
      }
    }
  },
  mounted(){
    this.closePositionModal = new Modal(this.$refs.closePositionModal)
    this.positionStore.getPositions()
  },
  setup() {
    const store = useTickerStore()
    const positionStore = usePositionStore()
    const orderStore = useOrderStore()
    const headers = [
      { text: 'Symbol', value: 'symbol', sortable: true },
      { text: 'Qty', value: 'unit', sortable: true },
      { text: 'Avg Fill Price', value: 'avg_fill_price', sortable: true },
      { text: 'Take Profit', value: 'take_profit_amount', sortable: true },
      { text: 'Stop Loss', value: 'stop_loss_amount', sortable: true },
      { text: 'Last Price', value: 'last_price', sortable: true },
      { text: 'Commission', value: 'commission' },
      { text: 'Profit', value: 'profit', sortable: true },
      { text: '', value: 'action' },
    ]
    return {
      store,
      positionStore,
      headers,
      orderStore
    }
  },
  methods: {
    checkPartialQty(node){
      const value = parseInt(node.value)
      
      return value <= this.closePosition.unit && value > 0
    },
    checkPartialQtyMessage(context){
      const value = parseInt(context.node.value)
      if (value <= 0){
        return `Specified value must be greater than 0`
      }
      if (value > this.closePosition.unit){
        return `Specified value must be less than or equal to ${this.closePosition.unit}`
      }
    },
    bodyItemClassName(column, index) {
      if (column === 'action') {
        return 'fixed-right-actions'
      }
      return ''
    },
    showCloseModal(id){
      let position = this.positionStore.positions.find(o => o.id === id)
      // console.log("ORDER ... ", position.symbol)
      if (!position){
        this.$notify({
          title: 'Something went wrong',
          type: 'danger'
        })
        return
      }
      // console.log(position, 'SHOW EDIT MODAL')
      this.closePosition = {
        id: position.id,
        unit: position.unit,
        symbol: position.symbol,
        limit_start_price: position.limit_start_price,
        partialQty: position.unit
      }
      this.saving = false
      // console.log(this.editOrder, 'SHOW EDIT MODAL')
      this.closePositionModal.show()
    },
    closePositionHandler(){
      let data = {
        id: this.closePosition.id,
        total_unit: this.closePosition.unit,
        unit: this.closePosition.partialQty || this.closePosition.unit,
        partialQty: this.closePosition.partialQty,
        isPartial: this.closePosition.isPartial,
        order_type: 'Sell'
      }
      // console.log(data)
      this.orderStore.createOrUpdateOrder(data)
    }
    
  }
}
</script>

<template>
  <div id="position-list-table">

    <EasyDataTable :headers="headers" :items="positionStore.positions" table-class-name="text-nowrap"
      :body-item-class-name="bodyItemClassName" :fixed-header="true">
      <template #item-symbol="{ symbol }">
        <span class="font-weight-bold">
          {{ symbol }}
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
      <template #item-profit="{ profit }">
        <span :class="{
          'text-success': profit > 0,
          'text-danger': profit < 0,
        }">
          {{ profit }}
        </span>
      </template>
      
      <template #item-commission="{total_commission_text, total_commission}">
        <span data-bs-toggle="tooltip" data-bs-html="true" :title="total_commission_text" >
          {{ helper.addCommas(total_commission) }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 10px;display: inline-block;">
            <path class="cls-1" d="M261.31,147.27a37.79,37.79,0,1,0-37.78-37.78A37.83,37.83,0,0,0,261.31,147.27Zm0-60.57a22.79,22.79,0,1,1-22.78,22.79A22.81,22.81,0,0,1,261.31,86.7Z" data-v-70023617=""></path><path class="cls-1" d="M118.89,434a235.6,235.6,0,0,1-69.42-81.44A231.94,231.94,0,0,1,256,15,227.42,227.42,0,0,1,359.88,39.89a7.5,7.5,0,0,0,6.79-13.38A242.38,242.38,0,0,0,256,0,246.83,246.83,0,0,0,36.13,359.44,250.72,250.72,0,0,0,110,446.1a7.5,7.5,0,0,0,8.9-12.08Z" data-v-70023617=""></path><path class="cls-1" d="M446.26,404.66A247.43,247.43,0,0,0,503.06,248c.28-79.45-38.6-154.88-104-201.78a7.5,7.5,0,0,0-8.74,12.19c61.48,44.08,98,114.93,97.76,189.54a232.43,232.43,0,0,1-53.35,147.17,84.22,84.22,0,0,0-18.09,38c-2,10.88-4.13,27.27,1.21,44a15.1,15.1,0,0,1-3.61,15.34,14.65,14.65,0,0,1-14.8,3.95,206.48,206.48,0,0,1-45.48-19.53,51.64,51.64,0,0,0-39.22-5.23,233.07,233.07,0,0,1-61.15,7.49,228.31,228.31,0,0,1-104.91-26.44,7.5,7.5,0,0,0-7,13.28A243.27,243.27,0,0,0,253.41,494.1a248,248,0,0,0,65.1-8,36.78,36.78,0,0,1,27.91,3.7,221.5,221.5,0,0,0,48.83,21,30.33,30.33,0,0,0,8.47,1.22A29.45,29.45,0,0,0,425,502.88a30.25,30.25,0,0,0,7.15-30.37c-3.33-10.38-3.56-21.68-.75-36.62A69.11,69.11,0,0,1,446.26,404.66Z" data-v-70023617=""></path><path class="cls-1" d="M183.8,361.72v7.52a26,26,0,0,0,26,26h103a26,26,0,0,0,26-26v-7.52a26,26,0,0,0-26-26H299.1v-144a25.56,25.56,0,0,0-35.61-23.51,113.38,113.38,0,0,1-39.06,9l-23.64,1.17a17.87,17.87,0,0,0-17,17.86V211a17.9,17.9,0,0,0,17.88,17.88h20.74a1.11,1.11,0,0,1,1.11,1.1V335.73H209.79A26,26,0,0,0,183.8,361.72Zm47.22-11a7.5,7.5,0,0,0,7.5-7.5V230a16.11,16.11,0,0,0-16.1-16.1H201.68A2.88,2.88,0,0,1,198.8,211V196.21a2.88,2.88,0,0,1,2.74-2.88l23.64-1.17a128.32,128.32,0,0,0,44.2-10.2,10.57,10.57,0,0,1,14.72,9.71V343.22a7.49,7.49,0,0,0,7.5,7.5h21.23a11,11,0,0,1,11,11v7.52a11,11,0,0,1-11,11h-103a11,11,0,0,1-11-11v-7.52a11,11,0,0,1,11-11H231Z" data-v-70023617=""></path>
          </svg>
        </span>
      </template>

      <template #item-created_on="{ created_on }">
        {{ $dayjs(created_on).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #item-action="{id}">
        <!-- <span class="cursor-pointer text-muted text-body mr-2" @click="showEditModal(id)">
            <em class="icon-pencil6"></em>
          </span> -->
          <span class="cursor-pointer text-muted text-body" @click="showCloseModal(id)">
            <em class="icon-cross2"></em>
          </span>
      </template>
    </EasyDataTable>


  <div class="modal fade" id="close-position-confirm-modal" ref="closePositionModal">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">
        <div class="modal-header border-bottom p-2">
          <h5 class="modal-title">Close Position</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
            <div class="modal-body pb-2">
              <p class="p-0 m-0">Position</p>
              <h5>
                {{closePosition.symbol}}
                <br/>
                {{closePosition.unit}} @ {{closePosition.limit_start_price}}
              </h5>
              <div class="form-check form-check-inline">
            <label class="form-check-label">
              <FormKit label="Partial Close" type="checkbox" v-model="closePosition.isPartial" input-class="form-check-input"
                name="Partial Close" />
            </label>
          </div>
          <div class="d-block mt-2" v-if="closePosition.isPartial">
            <FormKit type="number" 
              suffix="suffix of 4" 
              validation="required|number|checkPartialQty"
              :validation-rules="{ checkPartialQty }"
              :validation-messages="{
                checkPartialQty: checkPartialQtyMessage
              }"
               v-model="closePosition.partialQty" input-class="form-control pr-5"
               wrapper-class="form-group form-group-feedback form-group-feedback-right m-0"
               name="QTY" 
              >
              <template #suffix>
                <div class="form-control-feedback">
                  of {{closePosition.unit}} units 
                </div>
                
              </template>
            </FormKit>
            <p class="mt-3">
              Partially close {{closePosition.symbol}}
              <br/>
              Leaving position {{ parseInt(closePosition.unit) - parseInt(closePosition.partialQty) }}
            </p>
          </div>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
					<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Cancel</button>
					<button type="button" :disabled="saving" class="btn btn-primary" @click="closePositionHandler">
            Close Position
          </button>
				</div>
      </div>
    </div>
  </div>

</div>

</template>

