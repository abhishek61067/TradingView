<script>
import { useTickerStore } from '@/stores/tickerStore'
import { useAlertStore } from '@/stores/alertStore'
import { createInput } from '@formkit/vue'
// import { SOCKET_EVENTS, USER_ID } from '../../../stores/enums';
import { VueFinalModal } from 'vue-final-modal'


import FlickerDate from '../../ui/form/FlickerDate.vue';

export default {
  name: 'AlertWidget',
  components: {
    VueFinalModal
  },
  props: {
    defaultPrice: Number
  },
  setup() {
    const store = useTickerStore()
    const alertStore = useAlertStore()
    const dateSelector = createInput(FlickerDate, {
      props: ['configObj']
    })

    return {
      store,
      alertStore,
      dateSelector
    }
  },
  data() {
    return {
      saving: false,
      showModal: false,
      newAlert: {
        crossing: "",
        price: this.defaultPrice,
        expiry_date: null,
        expiry_time: null,
        notify_on_app: false,
        send_email: false,
        send_sms: false,
        pop_up_notification: true,
        alert_name: null,
        message: null,
      },
    }
  },
  watch: {
    defaultPrice(newValue) {
      this.newAlert.price = parseFloat(newValue).toFixed(2)
    }
  },
  mounted() {
    // this.newAlertModal = new Modal(this.$refs.addAlertModal, {
    //   backdrop: false
    // })
  },
  methods: {
    // --- ADD ---
    submitHandler() {
      this.saving = true
      const data = {
        company: this.store.company.id,
        crossing: this.newAlert.crossing,
        price: this.newAlert.price,
        expires_on: this.newAlert.expiry_date,
        // expires_on: `${this.newAlert.expiry_date} ${this.newAlert.expiry_time}`,
        notify_on_app: this.newAlert.notify_on_app,
        send_email: this.newAlert.send_email,
        send_sms: this.newAlert.send_sms,
        pop_up_notification: this.newAlert.pop_up_notification,
        alert_name: this.newAlert.alert_name,
        message: this.newAlert.message,
      }
      // console.log(data, "SAVE ALERT")
      // this.$socket.emit(SOCKET_EVENTS.SAVE_ALERT, data)
      this.alertStore.createOrUpdateAlert(data).then(() => {
        this.saving = false
        
        this.newAlert = {
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
        }
        this.store.showAddAlertModal = false
      })
    },
    disableExpiryDate: function (date) {
      // disable friday and saturday
      return (date.getDay() === 5 || date.getDay() === 6);

    },
    closeModal() {
      this.store.showAddAlertModal = false
    }

  }
}
</script>

<template>
  <VueFinalModal v-model="store.showAddAlertModal" classes="modal-container" content-class="modal-dialog"
    :hide-overlay="true" :click-to-close="false" :drag="true">

    <div class="modal-content">
      <div class="modal-header border-bottom py-2">
        <h5 class="modal-title">Create Alert on {{ store.symbol }}</h5>
        <button type="button" class="close" @click="closeModal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <FormKit type="form" id="ticker-buy-sell-form" @submit="submitHandler" :actions="false">
        <div class="modal-body pb-2">
          <div class="form-group">
            <div class="row">
              <div class="col-md-3">
                <label for="" class="font-weight-bold">Conditions:</label>
              </div>
              <div class="col-md-9">
                <FormKit type="select" validation="required" v-model="newAlert.crossing" name="Crossing"
                  placeholder="Select Crossing" :options="[
  { label: 'Crossing Up', value: 'UP' },
  { label: 'Crossing Down', value: 'DOWN' }
]" />
                <div class="mt-2"></div>
                <FormKit type="text" validation="required|number" v-model="newAlert.price" name="Price"
                  placeholder="Price" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-3">
                <label for="" class="font-weight-bold">Expiry:</label>
              </div>
              <div class="col-md-4">
                
                <FormKit :type="dateSelector" validation="required" v-model="newAlert.expiry_date" name="Expiry Date"
                  suffix-icon="date" :configObj="{
                  disable: [disableExpiryDate],
                  minDate: $dayjs().add(1, 'days').toDate(),
                }" /> 
              </div>
              <!-- <div class="col-md-3">
                
                <FormKit :type="dateSelector" validation="required" v-model="newAlert.expiry_time" name="Expiry Time"
                  :configObj="{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  minTime: '11:00',
                  maxTime: '15:00',
                }" />
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
                    <FormKit type="checkbox" v-model="newAlert.notify_on_app" name="notifyApp" label="Notify On App" />
                  </div> -->
                  <div class="col-md-6">
                    <FormKit type="checkbox" v-model="newAlert.send_email" name="sendEmail" label="Send Email" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="checkbox" v-model="newAlert.send_sms" name="sendSMS" label="Send SMS" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="checkbox" v-model="newAlert.pop_up_notification" name="popUpNoti"
                      label="Pop up Notification" />
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
                <FormKit type="text" validation="required" v-model="newAlert.alert_name" name="alert_name" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-3">
                <label for="" class="font-weight-bold">Message</label>
              </div>
              <div class="col-md-9">
                <FormKit validation="required" type="textarea" v-model="newAlert.message" name="message" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between border-top pt-3">
          <button type="button" class="btn btn-light" @click="closeModal">Close</button>
          <button type="submit" :disabled="saving" class="btn btn-success">Create</button>
        </div>
      </FormKit>
    </div>

  </VueFinalModal>


</template>
