import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faSignInAlt, faRocket, faAngleUp, faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faGitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faBook, faSignInAlt, faRocket, faAngleUp, faAngleDown, faInfoCircle,
    faGithub, faGitter)

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)

app.mount('#app')
