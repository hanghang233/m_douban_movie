// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import load from '@/components/load/index.vue'

Vue.config.productionTip = false

Vue.prototype.$ajax = axios

Vue.prototype.loadFlag = true;

Vue.use(VueLazyLoad, {
    preLoad: 1.3, //预加载高度比例
    attempt: 3, //加载图片数量
    loading: require('./common/image/loading.gif'), //loading默认图片
})
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, load },
  template: '<App/>'
})
