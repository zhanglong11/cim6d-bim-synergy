/*
 * @Description:
 * @Version:
 * @Autor:
 * @Date: 2020-02-24 17:51:22
 * @LastEditTime: 2020-03-12 14:20:12
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
//import '@/permission' // permission control

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.less'
import 'minireset.css'

import axios from '@/utils/axios'
// vxe-table
import 'xe-utils'
import 'vxe-table/lib/index.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'
import VXETable from 'vxe-table'

import './styles/videoPlayer.less' //视频播放器自定义样式
import Video from '@/components/VideoPlayer'
import fullscreen from 'vue-fullscreen'

Vue.use(fullscreen)
Vue.component('Video', Video)

import Block from '@/components/Block'
import BlockTabs from '@/components/BlockTabs'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Highcharts from 'highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
import HighchartsVue from 'highcharts-vue'
import ECharts from 'vue-echarts'
import UnitECharts from '@/components/Echarts/index.vue'
// import HighCharts from '@/components/HighCharts'
import FileList from '@/components/FileList'
import 'echarts'
import SvgIcon from '@/components/SvgIcon' // svg components
import toFixed4 from '@/utils/toFixed4'

import AttachmentDialog from '@/components/AttachmentDialog'
Vue.component(AttachmentDialog.name, AttachmentDialog)

import BaiduMap from 'vue-baidu-map' // 引入百度地图组件
Vue.use(BaiduMap, {
  ak: 'E3d49U4ohTx2bANAkfzqAGimmzn7dbex' // 使用申请的百度地图秘钥
})
// 全局过滤器
import * as customFilters from '@/utils/filters'
Object.keys(customFilters).forEach(key => {
  Vue.filter(key, customFilters[key])
})
Vue.component('svg-icon', SvgIcon)
Vue.use(VXETable, {
  size: 'small',
  align: 'center',
  resizable: true,
  showOverflow: false,
  showHeaderOverflow: false,
  border: 'none'
})
VXETable.use(VXETablePluginElement)
Vue.component('v-chart', ECharts)
Vue.component('Echarts', UnitECharts)
// Vue.components('HighCharts', HighCharts)
Highcharts3d(Highcharts)
Vue.use(HighchartsVue)
moment.locale('zh-cn')
Vue.config.productionTip = false
Vue.prototype._ = _
Vue.prototype.axios = axios
Vue.prototype.toFixed4 = toFixed4
Vue.filter('toFixed4', toFixed4)
window._ = _
window.moment = moment
// 返回label值
const getLabel = (options, value) => _.get(_.find(options, { value }), 'label', '-')
Vue.prototype.process = process
Vue.prototype.$getLabel = getLabel
/*
获取系统参数分组数据
group 分组参数
this.$getArgList(group)
*/
Vue.prototype.$getArgList = group =>
  store.state.systemConfig.config[group] &&
  store.state.systemConfig.config[group].children.filter(item => !item.deleteFlag)
/*
  通过value 获取系统参数label
  group 分组参数
  value 参数编码
  this.$getLabelFromArg(group, value)
  */
Vue.prototype.$getLabelFromArg = (group, value) =>
  getLabel(store.state.systemConfig.config[group] && store.state.systemConfig.config[group].children, value + '')
Vue.component(Block.name, Block)
Vue.component(BlockTabs.name, BlockTabs)
Vue.use(FileList) //附件列表
Vue.use(ElementUI, { size: 'small' })
Vue.use(FileList)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
