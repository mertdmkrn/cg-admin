import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import VueBodyClass from 'vue-body-class';
import { appAxios } from './utils/appAxios';

import './assets/css/cg-admin.css';
import 'vue-search-select/dist/VueSearchSelect.css'


import { ModelListSelect  } from 'vue-search-select'
import AppHeader from './components/Shared/appHeader.vue';
import AppFooter from './components/Shared/appFooter.vue';
import AppSidebar from './components/Shared/appSidebar.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component("ModelListSelect", ModelListSelect );
app.component("AppHeader", AppHeader);
app.component("AppFooter", AppFooter);
app.component("AppSidebar", AppSidebar);
app.config.globalProperties.$appAxios = appAxios;
const vueBodyClass = new VueBodyClass(router.getRoutes());
router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });

app.mount('#app');
