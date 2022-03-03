import localStore from '$lib/localStore'

const autoplay = localStore('autoplay', true)
const darkMode = localStore('dark-mode', false)
const showZoomView = localStore('show-zoom-view', false)

export { autoplay, darkMode, showZoomView }
