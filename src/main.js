import Vue from 'vue'
import App from './App.vue'
import './sass/global.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFastBackward, faBackward, faForward, faFastForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFastBackward, faBackward, faForward, faFastForward)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
