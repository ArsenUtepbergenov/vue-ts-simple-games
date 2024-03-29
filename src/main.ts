import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCompositionApi from '@vue/composition-api';

import './styles/index.scss';

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#application');
