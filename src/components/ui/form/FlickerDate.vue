<script setup>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { ref } from 'vue';


const props = defineProps({
  context: Object
})

function handleInput(selectedDates, dateStr, instance) {
  // console.log(selectedDates, dateStr, 'Date ....')
  props.context.node.input(dateStr)
}
let date = ref(null)

let configObj = {
  altInput: true,
  altInputClass: 'form-control',
  
}

if (props.context.configObj){
  // console.log(props.context.configObj)
  configObj = {
    ...configObj,
    ...props.context.configObj
  }
}

let config = ref(configObj)
</script>

<template>
  <div class="position-relative">
  <!-- form-group form-group-feedback form-group-feedback-right"> -->
    <div class="input-group">
      <flat-pickr v-model="date" :config="config" @on-change="handleInput" />
    </div>
    <!-- <div class="form-control-feedback" v-if="context.configObj.icon">
      <i :class="context.configObj.icon"></i>
    </div> -->
  </div>
</template>