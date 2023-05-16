import { createApp } from 'vue'
import App from './App.vue'
// import 'font-awesome/css/font-awesome.css';

// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'

// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// /* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// /* add icons to the library */
// library.add(faUserSecret)


// import VueSocketIO from 'vue-3-socket.io'
// import { io } from 'socket.io-client'
import { plugin, defaultConfig } from '@formkit/vue'
import { date, time } from '@formkit/icons'
import { createPinia } from 'pinia'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Decimal from 'decimal.js'
import requester from './lib/requester'

import SvgIcon from 'vue3-icon'
// import VueSimpleContextMenu from 'vue-simple-context-menu'
import Notifications from '@kyvg/vue3-notification'
import Vue3EasyDataTable from 'vue3-easy-data-table';

import Vue3Tour from 'vue3-tour'

import 'vue3-tour/dist/vue3-tour.css'

// import the styles
import 'vue3-easy-data-table/dist/style.css';
import '@formkit/themes/genesis'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/bootstrap.css'
import './assets/css/bootstrap_limitless.css'
import './assets/css/layout.css'
import './assets/css/components.css'
import './assets/css/colors.css'
import "./assets/css/icomoon/styles.css"
import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import './assets/css/custom.css'

window.$ = window.jQuery = require('jquery');
window.$ = $.extend(require('jquery-ui'));

// import "bootstrap"
import router from './router'
import helper from './lib/helper'

// const vueSocket = new VueSocketIO({
//   debug: true,
//   connection: io(process.env.VUE_APP_SOCKET_SERVER, {
//     path: process.env.VUE_APP_SOCKET_SERVER_PATH,
//     transports: ['websocket', 'polling', 'flashsocket']
//   })
// })

const app = createApp(App)
app.use(createPinia())
app.component('svg-icon', SvgIcon);
// app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Vue3Tour)
// app.use(vueSocket)
app.use(plugin, defaultConfig({
  icons: {
    date, time
  },
  config: {
    classes: {
      input: 'form-control',
      message: 'form-text text-danger',
      messages: 'list-unstyled'
    }
  }
}))

dayjs.extend(relativeTime)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.helper = helper
app.config.globalProperties.$decimal = Decimal
app.config.globalProperties.$requester = requester

app.component('EasyDataTable', Vue3EasyDataTable);
// app.component('vue-simple-context-menu', VueSimpleContextMenu);
app.use(Notifications)
app.use(router)
app.mount('#app')
