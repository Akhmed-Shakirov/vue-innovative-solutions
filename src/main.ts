import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import i18n from './plugins/i18n'
import './assets/scss/main.scss'

import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// @ts-ignore
const app = createApp(App)

app.use(router).use(pinia).use(i18n)
app.mount('#app')
