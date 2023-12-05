import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/scss/main.scss'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(router).use(pinia)
app.mount('#app')
