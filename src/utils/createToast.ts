import Toast from '@/components/toast/Toast.vue'
import { createApp, h } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export function createToast(message: string, type: ToastType = 'info', duration = 3000) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(Toast, { message, type })
    }
  })

  const vm = app.mount(container)

  setTimeout(() => {
    app.unmount()
    container.remove()
  }, duration)

  return vm
}
