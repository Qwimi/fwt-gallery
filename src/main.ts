import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './assets/styles/global.scss'
import './assets/fonts/cormorantSC/stylesheet.css'
import './assets/fonts/inter/stylesheet.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
