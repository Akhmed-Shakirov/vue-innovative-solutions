import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/scss/main.scss'
import i18n from './plugins/i18n'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia).use(i18n)
app.mount('#app')
