import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
import i18n from './plugins/i18n'
import './assets/scss/main.scss'

import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.config.globalProperties.msg = () => {
    return 'Hello'
}

// declare global {
//     interface Object {
//         findValue(data: string[]): any
//         differences(obj: any): any
//         clears(): any
//         getQuery(isEmpty?: boolean): any
//         notEmpty(): any
//         isNotEmpty(): any
//         copy(obj: any): any
//     }
// }

// app.mixin({
//     created() {
//         this.findValue()
//         this.differences()
//         this.clears()
//         this.getQuery()
//         this.notEmpty()
//         this.isNotEmpty()
//         this.copy()
//     }
// })

// import installGlobalPrototypes from './plugins/prototype'
// installGlobalPrototypes(app)

app.use(router).use(pinia).use(i18n)
app.mount('#app')
