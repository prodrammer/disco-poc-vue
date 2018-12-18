import Vue from 'vue'
import SingleGame from './components/export/SingleGame.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(SingleGame),
}).$mount('#app')

export default SingleGame
