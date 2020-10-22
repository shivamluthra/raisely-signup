import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  const upperCase = value.charAt(0).toUpperCase()
  const remaining = value.slice(1)
  let lowercase = remaining
  for (let i = 0; i < remaining.length; i++) {
    if (remaining[i] === remaining[i].toUpperCase()) {
        lowercase = remaining.slice(0, i) + ' ' + remaining[i].toUpperCase() + remaining.slice(i + 1)
    }
  }
  return upperCase + lowercase
})

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
