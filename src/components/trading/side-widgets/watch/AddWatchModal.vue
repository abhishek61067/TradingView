
<script>
import {
  mdiPlusCircleOutline,
  mdiSync,
  mdiChartBoxPlusOutline
} from '@mdi/js'

// import DefaultModal from '@/components/ui/Modal.vue'
import { SOCKET_EVENTS, USER_ID } from '@/stores/enums';
import { useTickerStore } from '../../../../stores/tickerStore';
import { useWatchListStore } from '../../../../stores/watchListStore'
import requester from '../../../../lib/requester'
import { VueFinalModal } from 'vue-final-modal'

export default {
  name: 'AddWatchModal',
  setup: function () {
    const store = useTickerStore()
    const watchStore = useWatchListStore()
    return {
      mdiPlusCircleOutline,
      mdiSync,
      mdiChartBoxPlusOutline,
      store,
      watchStore
    }
  },
  components: {
    VueFinalModal
  },
 
  mounted: function () {
    requester('companies/')
      .then(result => {
        this.loading = false
        console.log(result, 'COMPANIES ....')
        this.rows = result.data

      }).catch(err => {
        this.$notify({
          title: "ERROR: Failed to get company list.",
          text: err.message ? erro.message : JSON.stringify(err),
          type: "warning"
        });
      })
  },
  methods: {
    showModal: function () {
      // console.log(this.$refs.thisModal)
      this.$refs.thisModal.show()
    },
    addWatch: function (id, symbol) {
      // this.$socket.emit(SOCKET_EVENTS.ADDTOWATCHLIST, USER_ID, id)
      this.loading = true
      this.watchStore.addWatch(id, symbol).then(() => {
        this.loading = false
        let index = this.rows.findIndex(r => r.id === id)
        // console.log(index, data, ' DONE >>>>> .... ')
        if (this.rows[index]) {
          this.rows[index].is_watched = true
        }
      }).catch(error => {
        // console.log(error, ' ERROR ...')
        this.loading = false
        this.$notify({
          title: "ERROR: Failed to add new watch.",
          text: error.message ? error.message : JSON.stringify(error),
          type: "warning"
        });
      })

    }
  },
  data: function () {
    return {
      loading: true,
      searchValue: '',
      columns: [
        { text: 'Symbol', value: 'symbol', sortable: true },
        { text: 'Name', value: 'name', sortable: true },
        { text: '#', value: 'action' }
      ],
      rows: []
    }
  }
}
</script>

<template>

  <VueFinalModal v-model="store.showAddWatchModal" classes="modal-container" content-class="modal-dialog"
    :hide-overlay="false" :click-to-close="true" :drag="false">
    <div class="modal-content">
      <div class="modal-header border-bottom py-2">
        <h5 class="modal-title">Add Market Watch</h5>
        <div v-if="loading" class="spinner">
          <svg-icon type="mdi" :path="mdiSync"></svg-icon>
        </div>
        <button type="button" class="close" @click="() => store.showAddWatchModal = false" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body pb-2">

        <div>
          <div class="form-group mb-0">
            <input class="form-control" placeholder="Search ..." type="text" v-model="searchValue" />
          </div>
          <EasyDataTable :headers="columns" :items="rows" :rows-per-page="10" table-class-name="text-nowrap"
            :search-value="searchValue">

            <template #item-action="item">
              <span v-if="item.is_watched" class="badge badge-icon  text-muted p-0">
                <i class="icon-checkmark4"></i>
              </span>
              <span v-else class="badge badge-icon cursor-pointer text-success p-0"
                @click="addWatch(item.id, item.symbol)">
                <svg-icon type="mdi" :size="20" :path="mdiChartBoxPlusOutline"></svg-icon>
              </span>
            </template>
          </EasyDataTable>

        </div>
      </div>
    </div>
  </VueFinalModal>

</template>
