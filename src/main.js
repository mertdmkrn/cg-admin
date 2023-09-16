import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import VueBodyClass from 'vue-body-class';
import { appAxios } from './utils/appAxios';
import Pagination from 'v-pagination-3';
import moment from 'moment';



import './assets/css/bootstrap.min.css';
import './assets/css/cg-admin.css';
import 'vue-search-select/dist/VueSearchSelect.css'


import { ModelListSelect, MultiListSelect  } from 'vue-search-select'
import AppHeader from './components/Shared/appHeader.vue';
import AppFooter from './components/Shared/appFooter.vue';
import AppSidebar from './components/Shared/appSidebar.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component("MultiListSelect", MultiListSelect );
app.component("ModelListSelect", ModelListSelect );
app.component("AppHeader", AppHeader);
app.component("AppFooter", AppFooter);
app.component("AppSidebar", AppSidebar);
app.component('pagination', Pagination);
app.config.globalProperties.$appAxios = appAxios;
const vueBodyClass = new VueBodyClass(router.getRoutes());
router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });

app.config.globalProperties.$filters = {
    formatDate(date) {
        if (date) {
            return moment(String(date)).format('DD/MM/YYYY')
        }     
     },
}

app.mount('#app');
