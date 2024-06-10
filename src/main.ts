import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/global.scss'

import App from './App.vue'
import router from './router'
import fpjsPlugin, { FingerprintJSPro } from '@fingerprintjs/fingerprintjs-pro-vue-v3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(fpjsPlugin, {
  loadOptions: {
    apiKey: '<PUBLIC_API_KEY>',
    endpoint: [FingerprintJSPro.defaultEndpoint],
    scriptUrlPattern: [FingerprintJSPro.defaultScriptUrlPattern]
  }
})

app.mount('#app')
