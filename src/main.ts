import { createApp } from 'vue'
import App from './App.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

const app = createApp(App)

app.component('VueHcaptcha', VueHcaptcha)
app.mount('#app')
