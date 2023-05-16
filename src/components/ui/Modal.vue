<script>
import { Modal } from 'bootstrap'

export default {
  name: 'DefaultModal',
  props: {
    title: {
      type: String,
      default: '<<Title goes here>>'
    },
    headerBg: {
      type: String,
      default: 'bg-light'
    }
  },
  mounted: function () {
    this.ModalObj = new Modal(this.$refs.modalEle)
  },
  methods: {
    show () {
      this.ModalObj.show()
    }
  }

}

</script>

<template>
  <div id="modal_default" class="modal fade" tabindex="-1" ref="modalEle">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header p-2">
          <h5 class="modal-title">{{title}}</h5>
          <slot name="header"></slot>
          <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer border-top pb-1 pt-1">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
