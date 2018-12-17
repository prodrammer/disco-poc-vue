import Vue from 'vue'
import VGameAndFiltersList from './components/export/VGameFiltersAndList.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(VGameAndFiltersList),
}).$mount('#app')
