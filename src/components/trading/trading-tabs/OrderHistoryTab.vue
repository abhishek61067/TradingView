<script>
import { useTickerStore } from '@/stores/tickerStore'
import { Modal } from 'bootstrap'

export default {
  name: "OrderHistoryTab",
  setup() {
    const store = useTickerStore()
    const headers = [
      { text: 'Symbol', value: 'symbol', sortable: true },
      { text: 'Side', value: 'trade_type', sortable: true },
      { text: 'Type', value: 'order_type', sortable: true },
      { text: 'Qty', value: 'unit', sortable: true },
      { text: 'Price', value: 'limit_start_price', sortable: true },
      { text: 'Fill Price', value: 'fillPrice', sortable: true },
      { text: 'Status', value: 'status', sortable: true },
      { text: 'Commission', value: 'commission' },
      { text: 'Time', value: 'created_on', sortable: true },
      { text: 'Order id', value: 'id' },
    ]
    return {
      store,
      headers
    }
  },
  mounted(){
    this.store.getOrderHistory()
  },
}
</script>

<template>
  <div id="order-history-table">

    <EasyDataTable :headers="headers" :items="store.history" table-class-name="text-nowrap"
       :fixed-header="true">
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
      
      <template #item-created_on="{ created_on }">
        {{ $dayjs(created_on).format("YYYY-MM-DD HH:mm:ss") }}
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
    </EasyDataTable>

</div>

</template>
