import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css';
import store from './store'; 
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);
app.use(vuetify);
app.use(store);
app.use(VueCodemirror, {
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: 'Code goes here...',
  extensions: [basicSetup]
})

app.mount('#app');