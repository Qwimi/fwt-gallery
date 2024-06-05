import '@/assets/styles/global.scss'
import { setup, type Preview } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { App } from 'vue'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

const pinia = createPinia()

setup((app: App) => app.use(pinia))

export default preview
