<script>
import { useBalanceHistoryStore } from '@/stores/balanceHistoryStore'

export default {
  name: "AccountHistoryTab",
  setup() {
    const headers = [
      { text: 'Time', value: 'created_on' },
      { text: 'Balance Before', value: 'balance_before' },
      { text: 'Balance After', value: 'balance_after' },
      { text: 'Profit', value: 'profit' },
      { text: 'Action', value: 'action' }, // text description
    ]
    let historyStore = useBalanceHistoryStore()
    return {
      headers,
      historyStore
    }
  },
  mounted(){
    this.historyStore.getBalanceHistory()
  },
}
</script>

<template>
  <div id="account-history-table">

    <EasyDataTable :headers="headers" :items="historyStore.balanceHistory" table-class-name="text-nowrap"
      :fixed-header="true">
      
      
      <template #item-created_on="{ created_on }">
        {{ $dayjs(created_on).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #item-profit="{ profit }">
        <span :class="{
          'text-danger': profit < 0,
          'text-success': profit > 0,
          'text-default': profit === 0,
        }">
          {{ profit }}
        </span>
      </template>
    </EasyDataTable>

</div>

</template>
