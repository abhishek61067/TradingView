<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useAlertStore } from '@/stores/alertStore'
import { Modal } from 'bootstrap';
import { SOCKET_EVENTS, USER_ID } from '../../../stores/enums';
import { mdiSync } from '@mdi/js';

export default {
  name: 'AlertWidget',
  setup() {
    const store = useTickerStore()
    const alertStore = useAlertStore()
    return {
      store,
      alertStore,
      mdiSync
    }
  },
  data() {
    return {
      // alerts: [],
      // saving: false,
      isLoading: true,
      isLogLoading: false,
      selectedForRemove: -1,
      editAlert: {
        id: null,
        company_id: null,
        user_id: null,
        crossing: "",
        price: null,
        expiry_date: null,
        expiry_time: null,
        notify_on_app: false,
        send_email: false,
        send_sms: false,
        pop_up_notification: true,
        alert_name: null,
        message: null,
        company_symbol: ''
      },
    }
  },
  mounted() {
    this.removeAlertModal = new Modal(this.$refs.removeAlertModal)
    this.editAlertModal = new Modal(this.$refs.editAlertModal)
    // this.$socket.emit(SOCKET_EVENTS.GET_ALERTS, USER_ID)
    this.alertStore.getAlerts()
  },
  // sockets: {
  //   [SOCKET_EVENTS.SEND_UPDATE_ALERT](data) {
  //     // console.log(data, "SEND SAVE ALERT")
  //     this.saving = false
  //     if (data.error) {
  //       return this.$notify({
  //         title: data.message || "Failed to save alert",
  //         type: "warning"
  //       })
  //     }
  //     this.editAlert = {
  //       id: null,
  //       company_id: null,
  //       user_id: null,
  //       crossing: "",
  //       price: null,
  //       expiry_date: null,
  //       expiry_time: null,
  //       notify_on_app: false,
  //       send_email: false,
  //       send_sms: false,
  //       pop_up_notification: true,
  //       alert_name: null,
  //       message: null,
  //       company_symbol: ''
  //     }
  //     this.editAlertModal.hide()
  //     // this.$socket.emit(SOCKET_EVENTS.GET_ALERTS, USER_ID)
  //   }
  // },
  methods: {

    // --- EDIT ----
    showEditModal(index) {
      let alert = this.alertStore.alerts[index]
      // console.log(alert, 'SHOW EDIT MODAL')
      this.editAlert = {
        id: alert.id,
        company: alert.company,
        crossing: alert.crossing,
        price: alert.price,
        expiry_date: this.$dayjs(alert.expires_on).format('YYYY-MM-DD'),
        // expiry_time: this.$dayjs(alert.expires_on).format('HH:mm'),
        notify_on_app: alert.notify_on_app,
        send_email: alert.send_email,
        send_sms: alert.send_sms,
        pop_up_notification: alert.pop_up_notification,
        alert_name: alert.alert_name,
        message: alert.message,
        user_id: alert.user_id,
        company_symbol: alert.company_symbol
      }
      // console.log(this.editAlert, 'SHOW EDIT MODAL')
      this.editAlertModal.show()
    },

    submitEditHandler() {
      this.saving = true
      const data = {
        id: this.editAlert.id,
        company: this.editAlert.company,
        crossing: this.editAlert.crossing,
        price: this.editAlert.price,
        // expiry_date: this.editAlert.expiry_date,
        // expiry_time: this.editAlert.expiry_time,
        expires_on: this.editAlert.expiry_date,
        notify_on_app: this.editAlert.notify_on_app,
        send_email: this.editAlert.send_email,
        send_sms: this.editAlert.send_sms,
        pop_up_notification: this.editAlert.pop_up_notification,
        alert_name: this.editAlert.alert_name,
        message: this.editAlert.message,
        user_id: this.editAlert.user_id,
      }
      console.log(data, "SAVE EDIT ALERT")
      // this.$socket.emit(SOCKET_EVENTS.UPDATE_ALERT, data)
      this.alertStore.createOrUpdateAlert(data)
    },

    // -- REMOVE ---
    showRemoveModal(id) {
      this.selectedForRemove = id
      this.removeAlertModal.show()
    },

    removeAlert() {
      const selected = this.selectedForRemove
      this.alertStore.removeAlert(selected).then(() => {
        this.removeAlertModal.hide()
        this.selectedForRemove = null
      })
    }
  }
}
</script>

<template>
  <div class="card alert-card mb-0 mr-1">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Alerts
      </h5>
      <div class="header-elements">
        <span v-if="alertStore.loading" class="badge badge-icon cursor-pointer text-white">
          <svg-icon type="mdi" class="spinner" :path="mdiSync"></svg-icon>
        </span>
        <span id="v-step-addalert-4" class="badge badge-icon cursor-pointer text-white"
          @click="() => store.showAddAlertModal = true">
          <i class="icon-alarm-add"></i>
        </span>
        <span class="badge badge-icon cursor-pointer text-white" @click="() => store.toggleSideTab('', 'hide')">
          <i class="icon-cross2"></i>
        </span>
      </div>
    </div>

    <div id="v-step-alerts-3" class="list-group list-group-borderless py-2 alert-list">
      <div class="px-1 border-bottom-1 border-success">
          
        <div class="row">

          <div class="col-md-4">
            <div
              class="card mb-1 box-shadow text-center p-1 d-flex flex-row align-items-center">
              <div class="card-icon p-1">
                <img src="@/assets/img/sms.svg" alt="SMS" style="height:30px">
              </div>
              <div class="card-body p-0 d-flex flex-column">
                <span class="mb-1 text-uppercase text-end text-muted">SMS</span>
                <strong class="text-end fs-6 fw-bold text-black ">
                  {{ alertStore.stat.email || 0 }}
                </strong>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="card mb-1 box-shadow text-center p-1 d-flex flex-row align-items-center">
              <div class="card-icon">
                <img src="@/assets/img/push.svg" alt="SMS" style="height:25px">
              </div>
              <div class="card-body p-0 d-flex flex-column">
                <span class="mb-1 text-uppercase text-end text-muted">PUSH</span>
                <strong class="text-end fs-6 fw-bold text-black ">
                  {{ alertStore.stat.pop_up || 0 }}
                </strong>
              </div>
          </div>
        </div>
          <div class="col-md-4">

            <div
              class="card mb-1 box-shadow text-center p-1 d-flex flex-row align-items-center">
              <div class="card-icon">
                <img src="@/assets/img/email.svg" alt="SMS" style="height:25px">
              </div>
              <div class="card-body p-0 d-flex flex-column">
                <span class="mb-1 text-uppercase text-end text-muted">EMAIL</span>
              <strong class="text-end fs-6 fw-bold text-black ">
                {{ alertStore.stat.email || 0 }}
              </strong>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-group-item hstack gap-3 border-bottom alert-row p-2" v-for="(item, index) in alertStore.alerts"
        :key="item.id">

        <div class="flex-fill">
          <div class="font-weight-semibold">{{ item.alert_name }}</div>
          <div class="">{{ item.symbol }} {{ item.crossing }} {{ item.price }}</div>
          <span class="text-muted">
            {{ item.company_symbol }}
            <span class="text-success" v-if="item.is_active">Active</span>
            <span class="text-muted" v-if="!item.is_active">Disabled</span>
          </span>
        </div>

        <div class="align-self-center ms-3 hide">
          <div class="d-inline-flex">
            <!-- <span class="cursor-pointer text-body mx-2">
                <i class="icon-play3"></i>
                <i class="i-con-pause-"></i>
              </span> -->
            <span class="cursor-pointer text-body mr-2" @click="showEditModal(index)">
              <i class="icon-pencil6"></i>
            </span>
            <span class="cursor-pointer text-body" @click="showRemoveModal(item.id)">
              <i class="icon-cross2"></i>
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="card my-0 alert-log-card">
    <div class="card-header header-elements-inline pt-1 pb-1 bg-brand">
      <h5 class="card-title">
        Alerts Logs
      </h5>

    </div>
    <div class="card-body p-1">
      <p class="p-2 pt-5">
        No alerts triggered yet! You will see a list here when they do.
      </p>
    </div>
  </div>

  <div class="modal fade" id="remove-alert-confirm-modal" ref="removeAlertModal">
    <div class="modal-dialog modal-xs">
      <div class="modal-content">

        <div class="modal-body pb-2">
          <h4>
            Do you really want to delete your alert
            '<strong>{{ alertStore.alerts[selectedForRemove]?.alert_name }}</strong>'?
          </h4>
          <p>
            {{ alertStore.alerts[selectedForRemove]?.company_symbol }} {{ alertStore.alerts[selectedForRemove]?.crossing
            }}
            {{ alertStore.alerts[selectedForRemove]?.price }}
          </p>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" :disabled="alertStore.saving" class="btn btn-danger" @click="removeAlert">Remove</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="edit-alert-modal" ref="editAlertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-bottom py-2">
          <h5 class="modal-title">Edit Alert on {{ editAlert.company_symbol }}</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <FormKit type="form" id="ticker-buy-sell-form" @submit="submitEditHandler" :actions="false">
          <div class="modal-body pb-2">
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="" class="font-weight-bold">Conditions:</label>
                </div>
                <div class="col-md-9">
                  <FormKit type="select" validation="required" v-model="editAlert.crossing" name="Crossing"
                    placeholder="Select Crossing" :options="[
                      { label: 'Crossing Up', value: 'UP' },
                      { label: 'Crossing Down', value: 'DOWN' }
                    ]" />
                  <div class="mt-2"></div>
                  <!-- <input type="text" class="form-control mt-2" placeholder="-Enter Price-" name="price"> -->
                  <FormKit type="text" validation="required|number" v-model="editAlert.price" name="Price"
                    placeholder="Price" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="" class="font-weight-bold">Expiry:</label>
                </div>
                <div class="col-md-9">
                  <FormKit type="date" :min="$dayjs().add(1, 'days').format('YYYY-MM-DD')" validation="required"
                    v-model="editAlert.expiry_date" name="Expiry Date" />
                </div>
                <!-- <div class="col-md-3">
                    <FormKit type="time" validation="required" v-model="editAlert.expiry_time" name="Expiry Time" />
                  </div> -->
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="" class="font-weight-bold">Alert Action: </label>
                </div>
                <div class="col-md-9">
                  <div class="row">
                    <!-- <div class="col-md-6">
                        <FormKit type="checkbox" v-model="editAlert.notify_on_app" name="notifyApp"
                          label="Notify On App" />
                      </div> -->
                    <div class="col-md-6">
                      <!-- <input type="checkbox" name="alert_action" value="Send Email"> Send Email -->
                      <FormKit type="checkbox" v-model="editAlert.send_email" name="sendEmail" label="Send Email" />
                    </div>
                    <div class="col-md-6">
                      <FormKit type="checkbox" v-model="editAlert.send_sms" name="sendSMS" label="Send SMS" />
                      <!-- <input type="checkbox" name="alert_action" value="Send SMS"> Send SMS -->
                    </div>
                    <div class="col-md-6">
                      <FormKit type="checkbox" v-model="editAlert.pop_up_notification" name="popUpNoti"
                        label="Pop up Notification" />
                      <!-- <input type="checkbox" name="alert_action" value="Pop-up Notification"> Pop up Notification -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="" class="font-weight-bold">Alert Name: </label>
                </div>
                <div class="col-md-9">
                  <FormKit type="text" validation="required" v-model="editAlert.alert_name" name="alert_name" />
                  <!-- <input type="text" class="form-control" name="alert_name" placeholder="Alert Name"> -->
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-3">
                  <label for="" class="font-weight-bold">Message</label>
                </div>
                <div class="col-md-9">
                  <FormKit validation="required" type="textarea" v-model="editAlert.message" name="message" />
                  <!-- <textarea name="message" id="" class="form-control"></textarea> -->
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-between border-top pt-3">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            <button type="submit" :disabled="alertStore.saving" class="btn btn-success">Save Changes</button>
          </div>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-row .hide {
  display: none;
}

.alert-row:hover .hide {
  display: inline-block;
  cursor: pointer;
}

.alert-card{
  height: 65vh;
}
.alert-log-card {
  height: 35vh;
}

.alert-card>.alert-list,
.alert-log-card>.card-body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.list-group-item:hover {
  background-color: #f5f5f5 !important;
}
</style>