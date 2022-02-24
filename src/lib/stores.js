import localStore from './localStore.ts'

const autoplay = localStore('autoplay', false)
const darkMode = localStore('dark-mode', false)

export { autoplay, darkMode }
