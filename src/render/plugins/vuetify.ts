// import Vue from 'vue';
// import Vuetify from 'vuetify/lib';
//
// Vue.use(Vuetify);
//
// export default new Vuetify({
// });

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '~a/icon/index.css'

Vue.use(Vuetify);

const opts = {
  icons: {
    values: {
      close: 'we-close',
      min: 'we-min',
      max: 'we-max',
      sendMsg: 'we-sendMsg',
      tool: 'we-tool',
      about: 'we-about',
      update: 'we-update'
    },
  },
  theme: {
    themes: {
      light: {
        primary: '#03a9f4',
        secondary: '#009688',
        accent: '#9c27b0',
        error: '#f44336',
        warning: '#ff5722',
        info: '#607d8b',
        success: '#4caf50'
      }
    }
  },
};

export default new Vuetify(opts)
