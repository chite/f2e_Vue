import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import List from '../views/List.vue';
import Detail from '../views/Detail.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import HighchartsVue from 'highcharts-vue';  // Highcharts Vue 插件
import Highcharts from 'highcharts'; // Expansions，為 highChart package
import exportingInit from "highcharts/modules/exporting"; // 模組
import highchartsMoreInit from "highcharts/highcharts-more";  // 額外所需 highcharts-more 模組
import solidGaugeInit from "highcharts/modules/solid-gauge"; // 模組
import '@/assets/style.scss';

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faBars, faPlus, faPlayCircle, faPauseCircle)

Vue.use(VueRouter)

exportingInit(Highcharts); // 傳遞 extensions 來添加模組
highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);
Vue.use(HighchartsVue)  // 註冊成為全域物件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
