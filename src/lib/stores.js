import localStore from './localStore.ts'

const autoplay = localStore('autoplay', false)
const darkMode = localStore('dark-mode', false)
const showZoomView = localStore('show-zoom-view', false)

export { autoplay, darkMode, showZoomView }
