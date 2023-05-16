<script>
// import { useTickerStore } from '@/stores/tickerStore'
import { useJournalStore } from '@/stores/journalStore'
import requester from '../../../lib/requester'
import { ref, computed, watch } from "vue";

export default {
  name: "JournalTab",
  
  setup() {
    // const store = useTickerStore()
    const journalStore = useJournalStore()
    const headers = [
      { text: 'Time', value: 'created_on' },
      { text: 'Text', value: 'text' },
    ]
    // vue3 easy datatable server side 
    const loading = ref(false);
    const serverItemsLength = ref(0);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 5,
      sortBy: 'age',
      sortType: 'desc',
    });
    const items = ref([])

    const loadFromServer = async () => {
      loading.value = true;
      const {
        count,
        results,
      } = await requester('trade/journal/', {
        query: serverOptions.value
      })
      items.value = results;
      serverItemsLength.value = count;
      loading.value = false;
    };

    // initial load
    loadFromServer();

    watch(serverOptions, (value) => { loadFromServer(); }, { deep: true });

    return {
      // store,
      journalStore,
      headers,
      loading,
      serverOptions,
      serverItemsLength,
      items
    }
  },
  mounted() {
    // this.journalStore.getJournals()
  },

}
</script>

<template>
  <div id="journal-table">

    <EasyDataTable
    v-model:server-options="serverOptions"
    :server-items-length="serverItemsLength"
    :loading="loading"
    :items="items" 
    :headers="headers"  
    table-class-name="text-nowrap" :fixed-header="true">

      <template #item-created_on="{ created_on }">
        {{ $dayjs(created_on).format("YYYY-MM-DD HH:mm:ss") }}
      </template>

    </EasyDataTable>

  </div>

</template>
