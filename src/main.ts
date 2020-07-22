import Vue from "vue";
import App from "@/App.vue";
import "./registerServiceWorker";
import router from "@/render/router";
import store from "@/render/store";
import { WeChat } from "@/render/mixins";
import globalTool from '@/render/plugins/main';
import vuetify from '@/render/plugins/vuetify';
import { openDevTools } from '~/utils/ipc';
import 'vuetify/dist/vuetify.min.css';
import '@/render/assets/sass/init.sass';
Vue.config.productionTip = false;

Vue.use(globalTool);

openDevTools();

new Vue({
  router,
  store,
  vuetify,
  mixins: [WeChat],
  render: h => h(App)
}).$mount('#app')
