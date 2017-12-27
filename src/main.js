import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import { Button } from 'mint-ui'
import VueScroller from 'vue-scroller'
import FastClick from 'fastclick'

import App from './App.vue'
import split from './components/split/split.vue'
import svgImage from './components/svg/svg_image.vue'
import router from './router'
import store from './store'
import './filters'

import './mock/mockServer'  // 加载这个模块即可
import './common/stylus/fonts.styl'
import loading from './common/imgs/loading.gif'
import 'common/utils/rem'

Vue.use(VueResource) // 所有组件对象都多了一个属性: $http(发送ajax请求)
Vue.use(VueLazyload, { // 内部会定义一个全局的指令: lazy
  loading
})
Vue.use(VueScroller) // 内部定义了一个全局的组件标签<scroller>

// 注册全局组件(映射成标签)
Vue.component('split', split)
Vue.component(Button.name, Button)
Vue.component('svgImage', svgImage)


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
