import Vue from 'vue'
import VGameAndFiltersList from './components/export/VGameFiltersAndList.vue'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'production') {
  new Vue({
    render: h => h(VGameAndFiltersList),
  }).$mount('#app')
}
